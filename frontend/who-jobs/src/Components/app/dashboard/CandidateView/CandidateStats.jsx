import StatCard from '../StatCard'

export default function CandidateStats({
  postulationCount,
  postulations,
  loading,
}) {
  const pendingCount = postulations.filter(
    p => p.state === 'Pending'
  ).length

  const acceptedCount = postulations.filter(
    p => p.state === 'Accepted'
  ).length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Postulaciones"
        value={loading ? '...' : postulationCount}
        subtitle="En total"
      />

      <StatCard
        title="En revisión"
        value={loading ? '...' : pendingCount}
        subtitle="Esperando respuesta"
      />

      <StatCard
        title="Aceptadas"
        value={loading ? '...' : acceptedCount}
        subtitle="Procesos avanzados"
      />

      <StatCard
        title="CV actualizado"
        value="Sí"
        subtitle="Última subida"
      />

    </div>
  )
}