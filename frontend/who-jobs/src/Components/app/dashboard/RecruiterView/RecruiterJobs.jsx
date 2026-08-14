import { Link } from 'react-router-dom'
import RecruiterJobItem from './RecruiterJobItem'

export default function RecruiterJobs({ jobs }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow sm:p-6">

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="font-display text-2xl font-semibold text-[#1f2a33]">
            Mis búsquedas de personal
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Administrá los puestos que estás buscando cubrir
            y revisá los candidatos recibidos.
          </p>
        </div>

        {jobs.length > 0 && (
          <Link
            to="/jobs"
            className="text-sm font-medium text-[#355872] hover:underline"
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
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#355872]/10 text-2xl">
        📋
      </div>

      <h3 className="mt-4 font-semibold text-[#1f2a33]">
        Todavía no tenés búsquedas publicadas
      </h3>

      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
        Publicá una búsqueda de personal para comenzar
        a recibir candidatos interesados en el puesto.
      </p>

      <Link
        to="/jobs/create"
        className="mt-5 inline-flex items-center rounded-lg bg-[#355872] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2b475c] focus-ring"
      >
        + Publicar una búsqueda
      </Link>

    </div>
  )
}