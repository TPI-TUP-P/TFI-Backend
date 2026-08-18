import { Link } from 'react-router-dom'

export default function RecruiterJobItem({ job }) {
  const formattedSalary = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(job.salary ?? 0)

  return (
    <div className="rounded-xl border border-brand-border bg-brand-bg p-4 transition-shadow hover:shadow-sm">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <h3 className="font-semibold text-brand-title">
              {job.job_position || 'Sin título'}
            </h3>

            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              Publicada
            </span>

          </div>

          <p className="mt-1 line-clamp-2 text-sm text-brand-muted">
            {job.description || 'Sin descripción'}
          </p>

          <p className="mt-2 text-xs text-brand-muted">
            Publicada el{' '}
            {job.created_Date
              ? new Date(job.created_Date).toLocaleDateString('es-AR')
              : 'Sin fecha'}
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-4">

          <div className="text-sm">
            <span className="text-brand-muted">
              Candidatos
            </span>

            <p className="font-semibold text-brand-title">
              {job.applicants ?? 0}
            </p>
          </div>

          <div className="text-sm">
            <span className="text-brand-muted">
              Salario
            </span>

            <p className="font-semibold text-brand-title">
              {formattedSalary}
            </p>
          </div>

          <Link
            to={`/jobs/${job.id}`}
            className="rounded-lg bg-brand-accent px-4 py-2
                       text-sm font-medium text-white
                       transition-opacity duration-200
                       hover:opacity-90 focus-ring"
          >
            Gestionar
          </Link>

        </div>

      </div>

    </div>
  )
}