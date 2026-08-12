function JobCard({ job }) {
  return (
    <article className="w-full rounded-xl border border-brand-border bg-brand-card px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-center justify-between gap-4">

        {/* Información principal */}
        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-3">
            <h2 className="truncate text-lg font-bold text-brand-title">
              {job.job_position}
            </h2>

            <span className="shrink-0 rounded-full bg-brand-bg px-2.5 py-1 text-[11px] font-medium text-brand-muted">
              {job.applicants} postulantes
            </span>
          </div>

          <p className="mt-1 line-clamp-1 text-xs text-brand-muted">
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

        {/* Botón */}
        <button
          className="shrink-0 rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title"
        >
          Postularme
        </button>

      </div>

    </article>
  );
}

export default JobCard;