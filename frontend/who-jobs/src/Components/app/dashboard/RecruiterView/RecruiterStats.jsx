import StatCard from "../StatCard"

export default function RecruiterStats({
  totalPublications,
  totalApplicants,
  visibleJobs,
  postulationStats,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

      <StatCard
        title="Búsquedas publicadas"
        value={totalPublications}
        subtitle={
          totalPublications === 1
            ? 'Búsqueda de personal'
            : 'Búsquedas de personal'
        }
      />

      <StatCard
        title="Candidatos recibidos"
        value={totalApplicants}
        subtitle="En todas tus búsquedas"
      />

      <StatCard
        title="Búsquedas visibles"
        value={visibleJobs}
        subtitle="Cargadas en este panel"
      />

      <StatCard
        title="Postulaciones pendientes"
        value={postulationStats.pending}
        subtitle="Esperando revisión"
      />

      <StatCard
        title="Postulaciones aceptadas"
        value={postulationStats.accepted}
        subtitle="Candidatos aceptados"
      />

      <StatCard
        title="Postulaciones rechazadas"
        value={postulationStats.rejected}
        subtitle="Candidatos rechazados"
      />

    </div>
  )
}