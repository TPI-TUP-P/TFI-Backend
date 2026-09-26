import { useEffect, useState } from 'react'
import StatCard from '../StatCard'
import AdminPublications from './AdminPublications'
import AdminUserLookup from './AdminUserLookup'
import AdminUserSearch from './AdminMailLookup'
import api from '../../../../Services/api'

export default function AdminView() {
  const [publicationCount, setPublicationCount] = useState({
    total: 0,
    active: 0,
  })

  const [postulationCount, setPostulationCount] = useState(0)

  const [userCount, setUserCount] = useState({
    total: 0,
    candidates: 0,
    recruiters: 0,
  })

  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoadingStats(true)

      const [
        publicationsResponse,
        postulationsResponse,
        usersResponse,
        candidatesResponse,
        recruitersResponse,
      ] = await Promise.all([
        api.get('/Publication/count'),

        api.get('/Postulation/count'),

        api.get('/User'),

        api.get('/User', {
          params: {
            userRole: 'Candidate',
          },
        }),

        api.get('/User', {
          params: {
            userRole: 'Recruiter',
          },
        }),
      ])

      setPublicationCount({
        total: publicationsResponse?.total ?? 0,
        active: publicationsResponse?.active ?? 0,
      })

      setPostulationCount(postulationsResponse ?? 0)

      setUserCount({
        total: usersResponse?.totalCount ?? 0,
        candidates: candidatesResponse?.totalCount ?? 0,
        recruiters: recruitersResponse?.totalCount ?? 0,
      })
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setLoadingStats(false)
    }
  }

  const deletedPublications =
    publicationCount.total - publicationCount.active

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-brand-accent p-6 text-white shadow-lg">
        <h1 className="font-display text-3xl font-semibold">
          Panel administrativo
        </h1>

        <p className="mt-2 text-sm text-white/80">
          Supervisá usuarios, búsquedas laborales y la actividad de la
          plataforma.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">

        <StatCard
          title="Usuarios"
          value={loadingStats ? '...' : userCount.total}
          subtitle="Usuarios registrados"
        />

        <StatCard
          title="Candidatos"
          value={loadingStats ? '...' : userCount.candidates}
          subtitle="Usuarios candidatos"
        />

        <StatCard
          title="Recruiters"
          value={loadingStats ? '...' : userCount.recruiters}
          subtitle="Usuarios recruiters"
        />

        <StatCard
          title="Publicaciones"
          value={loadingStats ? '...' : publicationCount.total}
          subtitle="Ofertas registradas"
        />

        <StatCard
          title="Publicaciones activas"
          value={loadingStats ? '...' : publicationCount.active}
          subtitle="Ofertas disponibles"
        />

        <StatCard
          title="Postulaciones"
          value={loadingStats ? '...' : postulationCount}
          subtitle="Postulaciones registradas"
        />

      </div>

      {/* Gestión */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AdminPublications />
        <AdminUserLookup />
      </div>

      {/* Crear publicación */}
      <AdminUserSearch
        onCreated={loadStats}
      />

    </div>
  )
}