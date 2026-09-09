import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobService } from "../../Services/job.service";
import { postulationService } from "../../Services/postulation.service";
import { userService } from "../../Services/user.service";
import { useAuthStore } from "../../Components/stores/useAuthStore";
import { calificationService } from "../../Services/calification.service";
import PostulationCard from "../../Components/postulations/PostulationCard";
import ApplyModal from "../../Components/jobs/ApplyModal";
import ConfirmDialog from "../../Components/common/ConfirmDialog";
import Toast from "../../Components/common/Toast";
import Pagination from "../../Components/jobs/Pagination";
import StarRating from "../../Components/common/StarRating";
import RatingDisplay from "../../Components/common/RatingDisplay";

const APPLY_ROLES = [0, 2, 3]; // Candidate, Admin, SuperAdmin
const ADMIN_ROLES = [2, 3]; // Admin, SuperAdmin
const POSTULATIONS_PAGE_SIZE = 5;
const CAN_RATE_ROLES = [0, 2, 3];

const roleLabels = {
  0: "Candidato",
  1: "Reclutador",
  2: "Administrador",
  3: "Super Administrador",
};

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [job, setJob] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ job_position: "", description: "", salary: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const [postulations, setPostulations] = useState([]);
  const [postulationsPage, setPostulationsPage] = useState(1);
  const [postulationsTotalPages, setPostulationsTotalPages] = useState(1);
  const [postulationsLoading, setPostulationsLoading] = useState(false);

  const [myPostulationState, setMyPostulationState] = useState(null);
  const [myPostulationId, setMyPostulationId] = useState(null);
  const [showUnapplyConfirm, setShowUnapplyConfirm] = useState(false);
  const [unapplying, setUnapplying] = useState(false);

  const [myCalification, setMyCalification] = useState(null); // null = sin calificar, {id, score} = ya calificó
  const [ratingValue, setRatingValue] = useState(0);
  const [savingRating, setSavingRating] = useState(false);

  const [creatorAverage, setCreatorAverage] = useState(null);

  const isCreator = job && user && job.creator === user.id;
  const isOwner = job && user && ((user.role === 1 && isCreator) || ADMIN_ROLES.includes(user.role));
  const canEdit =
    job &&
    user &&
    ((user.role === 1 && isCreator) ||
      (user.role === 2 && isCreator) ||
      user.role === 3);

  const canApply = job && user && APPLY_ROLES.includes(user.role) && !isCreator;

  const fetchPostulations = useCallback(
    async (page) => {
      setPostulationsLoading(true);
      try {
        const response = await postulationService.getByJobOffer(
          id,
          page,
          POSTULATIONS_PAGE_SIZE
        );

        const enriched = await Promise.all(
          response.items.map(async (p) => {
            try {
              const applicant = await userService.getById(p.userId);
              return {
                ...p,
                applicantName: applicant.name,
                applicantLastName: applicant.lastName,
              };
            } catch {
              return { ...p, applicantName: null, applicantLastName: null };
            }
          })
        );

        setPostulations(enriched);
        setPostulationsTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error("Error fetching postulations:", err);
      } finally {
        setPostulationsLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const jobData = await jobService.getById(id);
        setJob(jobData);
        setForm({
          job_position: jobData.job_position ?? "",
          description: jobData.description ?? "",
          salary: jobData.salary ?? "",
        });

        userService
          .getById(jobData.creator)
          .then(setCreator)
          .catch(() => setCreator(null));

        calificationService
          .getAverage(jobData.creator)
          .then(setCreatorAverage)
          .catch(() => setCreatorAverage(null));

        if (user && CAN_RATE_ROLES.includes(user.role) && jobData.creator !== user.id) {
          try {
            const existing = await calificationService.getMine(jobData.creator);
            if (existing) {
              setMyCalification(existing);
              setRatingValue(existing.score);
            }
          } catch {
            // no calificó todavía, queda en null
          }
        }

        const canManageThisJob =
          user &&
          ((user.role === 1 && jobData.creator === user.id) ||
            ADMIN_ROLES.includes(user.role));

        if (canManageThisJob) {
          await fetchPostulations(1);
        } else if (user && APPLY_ROLES.includes(user.role)) {
          const myPostulations = await postulationService.getByUser(user.id);
          const mine = myPostulations.find((p) => p.jobOfferId === id);
          setAlreadyApplied(Boolean(mine));
          setMyPostulationId(mine?.id ?? null);
          setMyPostulationState(mine?.state ?? null);
        }
      } catch (err) {
        setError("No se pudo cargar la publicación.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, user, fetchPostulations]);

  const handlePostulationsPageChange = (page) => {
    setPostulationsPage(page);
    fetchPostulations(page);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRate = async (score) => {
    setRatingValue(score);
    setSavingRating(true);
    try {
      if (myCalification) {
        await calificationService.update(myCalification.id, user.id, job.creator, score);
        setMyCalification((prev) => ({ ...prev, score }));
      } else {
        const created = await calificationService.create(job.creator, score);
        setMyCalification({ id: created.id, score });
      }
      setToast({ type: "success", message: "Calificación guardada." });
    } catch (err) {
      setToast({ type: "error", message: "No se pudo guardar la calificación." });
      setRatingValue(myCalification?.score ?? 0);
    } finally {
      setSavingRating(false);
    }
  };

  const validateForm = () => {
    const position = form.job_position.trim();
    const description = form.description.trim();
    const salary = parseFloat(form.salary);

    if (position.length < 5 || position.length >= 100) {
      return "El puesto debe tener entre 5 y 99 caracteres.";
    }

    if (description.length < 5 || description.length >= 1000) {
      return "La descripción debe tener entre 5 y 999 caracteres.";
    }

    if (isNaN(salary) || salary <= 0 || salary >= 1000000000) {
      return "El salario debe ser mayor a 0 y menor a 1.000.000.000.";
    }

    return null;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSaveError(validationError);
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      const payload = {
        id: job.id,
        job_position: form.job_position.trim(),
        description: form.description.trim(),
        salary: parseFloat(form.salary),
      };

      await jobService.update(payload);

      setJob((prev) => ({ ...prev, ...payload }));
      setIsEditing(false);
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.title ||
        "No se pudo guardar los cambios.";
      setSaveError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmUnapply = async () => {
    setUnapplying(true);
    try {
      await postulationService.remove(myPostulationId);
      setAlreadyApplied(false);
      setMyPostulationId(null);
      setShowUnapplyConfirm(false);
      setToast({ type: "success", message: "Te despostulaste correctamente." });
    } catch {
      setToast({ type: "error", message: "No se pudo cancelar la postulación." });
    } finally {
      setUnapplying(false);
    }
  };

  const handleUpdateState = async (postulationId, newState) => {
    try {
      await postulationService.updateState(postulationId, newState);
      setPostulations((prev) =>
        prev.map((p) => (p.id === postulationId ? { ...p, state: newState } : p))
      );
    } catch (err) {
      alert("No se pudo actualizar la postulación.");
    }
  };

  const handleConfirmDeleteJob = async () => {
    setDeleting(true);
    try {
      await jobService.remove(job.id);
      setToast({ type: "success", message: "Publicación eliminada correctamente." });
      setTimeout(() => navigate("/jobs"), 1200);
    } catch {
      setToast({ type: "error", message: "No se pudo eliminar la publicación." });
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-bg">
        <p className="text-sm text-brand-muted">Cargando publicación...</p>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6">
        <p className="text-sm text-red-600">{error || "Publicación no encontrada."}</p>
      </main>
    );
  }

  const pendingCount = postulations.filter((p) => p.state === 0).length;
  const acceptedCount = postulations.filter((p) => p.state === 1).length;
  const rejectedCount = postulations.filter((p) => p.state === 2).length;

  const creatorInitials = creator
    ? `${(creator.name || "").charAt(0)}${(creator.lastName || "").charAt(0)}`.toUpperCase()
    : "?";

  return (
    <main className="min-h-screen bg-brand-bg py-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6">

        <button
          onClick={() => navigate(-1)}
          className="flex w-fit items-center gap-1 text-sm font-medium text-brand-muted transition hover:text-brand-title"
        >
          ← Volver
        </button>

        <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card shadow-sm">

          {isEditing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-5 p-8">
              <h2 className="text-lg font-bold text-brand-title">
                Editar publicación
              </h2>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Puesto
                </label>
                <input
                  type="text"
                  name="job_position"
                  value={form.job_position}
                  onChange={handleFormChange}
                  className="w-full rounded-lg border border-brand-border bg-brand-bg px-3.5 py-2.5 text-sm text-brand-title outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />
                <p className="mt-1 text-[11px] text-brand-muted">
                  {form.job_position.length}/99 caracteres
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={6}
                  className="w-full resize-none rounded-lg border border-brand-border bg-brand-bg px-3.5 py-2.5 text-sm text-brand-title outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                />
                <p className="mt-1 text-[11px] text-brand-muted">
                  {form.description.length}/999 caracteres
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                  Salario estimado
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-brand-muted">
                    $
                  </span>
                  <input
                    type="number"
                    name="salary"
                    value={form.salary}
                    onChange={handleFormChange}
                    step="0.01"
                    min="0"
                    className="w-full rounded-lg border border-brand-border bg-brand-bg py-2.5 pl-7 pr-3.5 text-sm text-brand-title outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>
              </div>

              {saveError && (
                <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                  {saveError}
                </p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-title disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg border border-brand-border px-5 py-2.5 text-sm font-medium text-brand-title transition hover:bg-brand-bg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="border-b border-brand-border bg-brand-bg/60 px-8 py-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <span className="mb-2 inline-block rounded-full bg-brand-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-accent">
                      Oferta de trabajo
                    </span>
                    <h1 className="break-words text-3xl font-bold leading-tight text-brand-title">
                      {job.job_position}
                    </h1>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {canEdit && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="rounded-lg border border-brand-border bg-brand-card px-4 py-2 text-sm font-semibold text-brand-title transition hover:border-brand-accent hover:text-brand-accent"
                      >
                        Editar
                      </button>
                    )}

                    {isOwner && (
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="rounded-lg border border-brand-border bg-brand-card px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    )}

                    {canApply && (
                      alreadyApplied ? (
                        myPostulationState === 1 ? (
                          <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                            ✓ Aceptada
                          </span>
                        ) : myPostulationState === 2 ? (
                          <span className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                            ✕ Rechazada
                          </span>
                        ) : (
                          <>
                            <span className="rounded-lg bg-brand-bg px-4 py-2 text-sm font-semibold text-brand-muted">
                              ✓ Ya te postulaste
                            </span>
                            <button
                              onClick={() => setShowUnapplyConfirm(true)}
                              className="rounded-lg border border-brand-border px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                            >
                              Despostularme
                            </button>
                          </>
                        )
                      ) : (
                        <button
                          onClick={() => setShowApplyModal(true)}
                          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title"
                        >
                          Postularme
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-7 px-8 py-7">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    Descripción del puesto
                  </h3>
                  <p className="whitespace-pre-line break-words text-sm leading-relaxed text-brand-title">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    Detalles
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-brand-bg px-4 py-3">
                      <p className="text-[11px] text-brand-muted">Salario</p>
                      <p className="mt-0.5 font-mono text-base font-bold text-brand-title">
                        ${Number(job.salary).toLocaleString("es-AR")}
                      </p>
                    </div>

                    <div className="rounded-lg bg-brand-bg px-4 py-3">
                      <p className="text-[11px] text-brand-muted">Postulantes</p>
                      <p className="mt-0.5 text-base font-bold text-brand-title">
                        {job.applicants}
                      </p>
                    </div>

                    <div className="rounded-lg bg-brand-bg px-4 py-3">
                      <p className="text-[11px] text-brand-muted">Publicado</p>
                      <p className="mt-0.5 text-base font-bold text-brand-title">
                        {new Date(job.created_Date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Info del creador */}
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    Publicado por
                  </h3>

                  {creator ? (
                    <div className="rounded-lg bg-brand-bg px-4 py-3.5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white">
                            {creatorInitials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-brand-title">
                              {creator.name} {creator.lastName}
                            </p>
                            <p className="truncate text-xs text-brand-muted">
                              {creator.email}
                              {roleLabels[creator.role] ? ` · ${roleLabels[creator.role]}` : ""}
                            </p>
                          </div>
                        </div>

                        {user && CAN_RATE_ROLES.includes(user.role) && job.creator !== user.id && (
                          <div className="shrink-0 text-right">
                            <p className="mb-1 text-[11px] font-medium text-brand-muted">
                              Calificá a la empresa
                            </p>
                            <div className="flex items-center justify-end gap-2">
                              <StarRating value={ratingValue} onChange={handleRate} size="text-lg" />
                              {savingRating && (
                                <span className="text-[11px] text-brand-muted">...</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3.5 border-t border-brand-border pt-3.5">
                        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                          Calificación general
                        </p>
                        <RatingDisplay
                          average={creatorAverage?.average}
                          count={creatorAverage?.count}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-brand-muted">
                      No se pudo cargar la información del creador.
                    </p>
                  )}
                </div>
              </div>

            </>
          )}
        </div>

        {isOwner && (
          <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border bg-brand-bg/60 px-8 py-6">
              <h2 className="text-base font-bold text-brand-title">
                Postulaciones
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {pendingCount > 0 && (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    {pendingCount} pendientes
                  </span>
                )}
                {acceptedCount > 0 && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {acceptedCount} aceptadas
                  </span>
                )}
                {rejectedCount > 0 && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    {rejectedCount} rechazadas
                  </span>
                )}
              </div>
            </div>

            <div className="p-8">
              {postulationsLoading ? (
                <p className="py-8 text-center text-sm text-brand-muted">
                  Cargando postulaciones...
                </p>
              ) : postulations.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <p className="text-sm font-medium text-brand-title">
                    Todavía no hay postulaciones
                  </p>
                  <p className="text-xs text-brand-muted">
                    Cuando alguien se postule a esta oferta, va a aparecer acá.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-3">
                    {postulations.map((p) => (
                      <PostulationCard
                        key={p.id}
                        postulation={p}
                        onUpdateState={handleUpdateState}
                      />
                    ))}
                  </div>

                  <Pagination
                    currentPage={postulationsPage}
                    totalPages={postulationsTotalPages}
                    onPageChange={handlePostulationsPageChange}
                  />
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {showApplyModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowApplyModal(false)}
          onSuccess={() => setAlreadyApplied(true)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Eliminar publicación"
          message={`¿Seguro que querés eliminar "${job.job_position}"? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          danger
          loading={deleting}
          onConfirm={handleConfirmDeleteJob}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showUnapplyConfirm && (
        <ConfirmDialog
          title="Cancelar postulación"
          message="¿Seguro que querés despostularte de esta oferta?"
          confirmLabel="Despostularme"
          cancelLabel="Volver"
          danger
          loading={unapplying}
          onConfirm={handleConfirmUnapply}
          onCancel={() => setShowUnapplyConfirm(false)}
        />
      )}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
};

export default JobDetailPage;