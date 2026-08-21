import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { userService } from "../../Services/user.service";
import { postulationService } from "../../Services/postulation.service";
import ApplyModal from "./ApplyModal";
import ConfirmDialog from "../common/ConfirmDialog";
import Toast from "../common/Toast";

const APPLY_ROLES = [0, 2, 3]; // Candidate, Admin, SuperAdmin
const ADMIN_ROLES = [2, 3]; // Admin, SuperAdmin

function JobCard({ job, onDelete, appliedJobsMap, onApplied, onUnapplied }) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUnapplyConfirm, setShowUnapplyConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [unapplying, setUnapplying] = useState(false);
  const [toast, setToast] = useState(null);
  const [creator, setCreator] = useState(null);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    let active = true;
    userService
      .getById(job.creator)
      .then((data) => {
        if (active) setCreator(data);
      })
      .catch(() => {
        if (active) setCreator(null);
      });
    return () => {
      active = false;
    };
  }, [job.creator]);

  const isCreator = user && job.creator === user.id;
  const canManage =
    user && ((user.role === 1 && isCreator) || ADMIN_ROLES.includes(user.role));

  const canApply = user && APPLY_ROLES.includes(user.role) && !isCreator;
  const postulationId = appliedJobsMap?.get(job.id);
  const alreadyApplied = Boolean(postulationId);

  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(job.id);
      setShowDeleteConfirm(false);
      setToast({ type: "success", message: "Publicación eliminada correctamente." });
    } catch {
      setToast({ type: "error", message: "No se pudo eliminar la publicación." });
    } finally {
      setDeleting(false);
    }
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleApplySuccess = (newPostulationId) => {
    onApplied?.(job.id, newPostulationId);
  };

  const handleUnapplyClick = (e) => {
    e.stopPropagation();
    setShowUnapplyConfirm(true);
  };

  const handleConfirmUnapply = async () => {
    setUnapplying(true);
    try {
      await postulationService.remove(postulationId);
      onUnapplied?.(job.id);
      setShowUnapplyConfirm(false);
      setToast({ type: "success", message: "Te despostulaste correctamente." });
    } catch {
      setToast({ type: "error", message: "No se pudo cancelar la postulación." });
    } finally {
      setUnapplying(false);
    }
  };

  const creatorName = creator
    ? [creator.name, creator.lastName].filter(Boolean).join(" ")
    : null;

  return (
    <>
      <article
        onClick={handleCardClick}
        className="w-full cursor-pointer rounded-xl border border-brand-border bg-brand-card px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-3">
              <h2 className="min-w-0 truncate text-lg font-bold text-brand-title">
                {job.job_position}
              </h2>

              <span className="shrink-0 rounded-full bg-brand-bg px-2.5 py-1 text-[11px] font-medium text-brand-muted">
                {job.applicants} postulantes
              </span>
            </div>

            <p className="mt-1 line-clamp-1 break-words text-xs text-brand-muted">
              {job.description}
            </p>

            {creatorName && (
              <p className="mt-1 text-[11px] text-brand-muted">
                Creada por <span className="font-medium text-brand-title">{creatorName}</span>
              </p>
            )}

            <div className="mt-2 flex items-center gap-4">
              <span className="font-mono text-sm font-semibold text-brand-title">
                ${Number(job.salary).toLocaleString("es-AR")}
              </span>
              <span className="text-[11px] text-brand-muted">
                Salario estimado
              </span>
              <span className="text-[11px] text-brand-muted">
                {new Date(job.created_Date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {canApply && (
              alreadyApplied ? (
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-brand-bg px-3 py-2 text-sm font-semibold text-brand-muted">
                    ✓ Postulado
                  </span>
                  <button
                    onClick={handleUnapplyClick}
                    className="rounded-lg border border-brand-border px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                  >
                    Despostularme
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="shrink-0 rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title"
                >
                  Postularme
                </button>
              )
            )}

            {canManage && (
              <button
                onClick={handleDeleteClick}
                aria-label="Eliminar publicación"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-muted transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </article>

      {showModal && (
        <ApplyModal
          job={job}
          onClose={() => setShowModal(false)}
          onSuccess={handleApplySuccess}
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
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showUnapplyConfirm && (
        <ConfirmDialog
          title="Cancelar postulación"
          message={`¿Seguro que querés despostularte de "${job.job_position}"?`}
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
    </>
  );
}

export default JobCard;