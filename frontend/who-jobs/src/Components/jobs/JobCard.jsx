import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import ApplyModal from "./ApplyModal";

const MANAGER_ROLES = [1, 2, 3]; // Recruiter, Admin, SuperAdmin
const APPLY_ROLES = [0, 2, 3]; // Candidate, Admin, SuperAdmin (igual que el backend)

function JobCard({ job, onDelete, appliedJobIds, onApplied }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const canManage =
    user && MANAGER_ROLES.includes(user.role) && job.creator === user.id;

  const canApply = user && APPLY_ROLES.includes(user.role);
  const alreadyApplied = appliedJobIds?.has(job.id);

  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${job.job_position}"?`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await onDelete(job.id);
    } finally {
      setDeleting(false);
    }
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleApplySuccess = () => {
    onApplied?.(job.id);
  };

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

            <div className="mt-2 flex items-center gap-4">
              <span className="font-mono text-sm font-semibold text-brand-title">
                ${job.salary}
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
                <span className="rounded-lg bg-brand-bg px-4 py-2 text-sm font-semibold text-brand-muted">
                  ✓ Ya postulado
                </span>
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
                onClick={handleDelete}
                disabled={deleting}
                aria-label="Eliminar publicación"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-muted transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "…" : "✕"}
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
    </>
  );
}

export default JobCard;