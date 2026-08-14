import { useEffect, useState } from 'react'
import StatCard from '../StatCard'
import AdminPublications from './AdminPublications'
import AdminUserLookup from './AdminUserLookup'
import AdminCreatePublication from './AdminCreatePublication'
import api from '../../../../Services/api'

export default function AdminView() {
  const [publicationCount, setPublicationCount] = useState(0)
  const [postulationCount, setPostulationCount] = useState(0)

  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoadingStats(true)

      const [publicationsResponse, postulationsResponse] =
        await Promise.all([
          api.get('/Publication'),
          api.get('/Postulation/count'),
        ])

      const publications = publicationsResponse.data

      // Si tu endpoint devuelve directamente una lista
      if (Array.isArray(publications)) {
        setPublicationCount(publications.length)
      } else {
        // Si devuelve un objeto paginado
        setPublicationCount(
          publications.totalCount ??
          publications.total ??
          publications.count ??
          0
        )
      }

      setPostulationCount(postulationsResponse.data)
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#355872] to-[#2b475c] p-6 text-white shadow-lg">
        <h1 className="font-display text-3xl font-semibold">
          Panel administrativo
        </h1>

        <p className="mt-2 text-sm text-white/80">
          Supervisá usuarios, búsquedas laborales y la actividad de la
          plataforma.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Publicaciones"
          value={loadingStats ? '...' : publicationCount}
          subtitle="Ofertas laborales"
        />

        <StatCard
          title="Postulaciones"
          value={loadingStats ? '...' : postulationCount}
          subtitle="Postulaciones registradas"
        />

        <StatCard
          title="Administración"
          value="Activa"
          subtitle="Panel operativo"
        />
      </div>

      {/* Gestión */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <AdminPublications />

        <AdminUserLookup />

      </div>

      {/* Crear publicación */}
      <AdminCreatePublication
        onCreated={loadStats}
      />

    </div>
  )
}