import { Link } from 'react-router-dom'

export default function RecruiterJobItem({ job }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-sm">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <div className="flex flex-wrap items-center gap-2">

            <h3 className="font-semibold text-[#1f2a33]">
              {job.job_position || 'Sin título'}
            </h3>

            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
              Publicada
            </span>

          </div>

          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {job.description || 'Sin descripción'}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Publicada el{' '}
            {job.created_Date
              ? new Date(job.created_Date).toLocaleDateString('es-AR')
              : 'Sin fecha'}
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-4">

          <div className="text-sm">
            <span className="font-semibold text-[#1f2a33]">
              {job.applicants ?? 0}
            </span>{' '}

            <span className="text-slate-500">
              {job.applicants === 1
                ? 'candidato'
                : 'candidatos'}
            </span>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-[#1f2a33]">
              ${job.salary ?? 0}
            </span>
          </div>

          <Link
            to={`/jobs/${job.id}`}
            className="rounded-lg bg-[#355872] px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2b475c] focus-ring"
          >
            Gestionar
          </Link>

        </div>

      </div>

    </div>
  )
}