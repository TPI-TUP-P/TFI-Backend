export default function RecruiterActivity({ jobs }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow sm:p-6">

      <div>
        <h2 className="font-display text-xl font-semibold text-[#1f2a33]">
          Actividad reciente
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Un vistazo rápido a tus últimas búsquedas de personal.
        </p>
      </div>

      <div className="mt-4">

        {jobs.length > 0 ? (
          <div className="divide-y divide-gray-100">

            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between gap-4 py-3"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#355872]/10">
                    📄
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-medium text-slate-800">
                      Búsqueda publicada: "{job.job_position}"
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {job.applicants ?? 0}{' '}
                      {job.applicants === 1
                        ? 'candidato recibido'
                        : 'candidatos recibidos'}
                    </p>

                  </div>

                </div>

                <span className="shrink-0 text-xs text-slate-400">
                  {job.created_Date
                    ? new Date(job.created_Date).toLocaleDateString('es-AR')
                    : ''}
                </span>

              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              Cuando publiques una búsqueda de personal,
              vas a ver tu actividad acá.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}