import { Link } from 'react-router-dom'
import RecruiterJobItem from './RecruiterJobItem'

export default function RecruiterJobs({ jobs }) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card p-4 shadow-sm sm:p-6">

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-title">
            Mis búsquedas de personal
          </h2>

          <p className="mt-1 text-sm text-brand-muted">
            Administrá los puestos que estás buscando cubrir
            y revisá los candidatos recibidos.
          </p>
        </div>

        {jobs.length > 0 && (
          <Link
            to="/jobs"
            className="text-sm font-medium text-brand-accent hover:underline"
          >
            Ver todas →
          </Link>
        )}

      </div>

      {jobs.length === 0 ? (
        <EmptyJobs />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <RecruiterJobItem
              key={job.id}
              job={job}
            />
          ))}
        </div>
      )}

    </div>
  )
}

function EmptyJobs() {
  return (
    <div className="rounded-xl border border-dashed border-brand-border
                    bg-brand-bg px-6 py-10 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center
                      rounded-full bg-brand-accent/10 text-2xl">
        📋
      </div>

      <h3 className="mt-4 font-semibold text-brand-title">
        Todavía no tenés búsquedas publicadas
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-brand-muted">
        Publicá una búsqueda de personal para comenzar
        a recibir candidatos interesados en el puesto.
      </p>

      <Link
        to="/jobs/create"
        className="mt-5 inline-flex items-center rounded-lg
                   bg-brand-accent px-5 py-2.5 text-sm font-medium text-white
                   transition-colors duration-200 hover:opacity-90
                   focus-ring"
      >
        + Publicar una búsqueda
      </Link>

    </div>
  )
}