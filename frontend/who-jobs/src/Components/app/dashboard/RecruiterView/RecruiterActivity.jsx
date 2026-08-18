export default function RecruiterActivity({ jobs }) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card p-4 shadow-sm sm:p-6">

      <div>
        <h2 className="font-display text-xl font-semibold text-brand-title">
          Actividad reciente
        </h2>

        <p className="mt-1 text-sm text-brand-muted">
          Un vistazo rápido a tus últimas búsquedas de personal.
        </p>
      </div>

      <div className="mt-4">

        {jobs.length > 0 ? (
          <div className="divide-y divide-brand-border">

            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between gap-4 py-3"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center
                                  justify-center rounded-lg bg-brand-accent/10">
                    📄
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-medium text-brand-title">
                      Búsqueda publicada: "{job.job_position}"
                    </p>

                    <p className="mt-1 text-xs text-brand-muted">
                      {job.applicants ?? 0}{' '}
                      {job.applicants === 1
                        ? 'candidato recibido'
                        : 'candidatos recibidos'}
                    </p>

                  </div>

                </div>

                <span className="shrink-0 text-xs text-brand-muted">
                  {job.created_Date
                    ? new Date(job.created_Date).toLocaleDateString('es-AR')
                    : ''}
                </span>

              </div>
            ))}

          </div>
        ) : (
          <div className="rounded-lg bg-brand-bg p-5 text-center">
            <p className="text-sm text-brand-muted">
              Cuando publiques una búsqueda de personal,
              vas a ver tu actividad acá.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}