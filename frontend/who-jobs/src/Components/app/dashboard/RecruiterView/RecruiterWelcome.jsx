export default function RecruiterWelcome({
  name,
  totalPublications,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-accent p-6 text-white shadow">

      <div className="relative z-10">

        <p className="text-sm text-white/70">
          Panel de reclutamiento
        </p>

        <h1 className="mt-1 font-display text-3xl font-semibold">
          ¡Hola, {name || 'reclutador'}!
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
          Desde acá podés gestionar tus búsquedas de personal,
          revisar los candidatos que recibiste y mantener
          organizados tus procesos de selección.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="rounded-full border border-white/20
                           bg-white/10 px-3 py-1 text-xs font-medium
                           backdrop-blur">
            {totalPublications}{' '}
            {totalPublications === 1
              ? 'búsqueda publicada'
              : 'búsquedas publicadas'}
          </span>

          <span className="rounded-full border border-emerald-300/30
                           bg-emerald-400/15 px-3 py-1 text-xs font-medium
                           text-emerald-50 backdrop-blur">
            Cuenta activa
          </span>

        </div>

      </div>

      <div className="absolute -right-10 -top-10 h-40 w-40
                      rounded-full bg-white/5" />

      <div className="absolute -bottom-20 right-20 h-48 w-48
                      rounded-full bg-white/5" />

    </div>
  )
}