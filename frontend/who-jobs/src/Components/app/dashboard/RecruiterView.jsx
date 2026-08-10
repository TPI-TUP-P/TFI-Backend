import { useEffect, useState } from 'react'
import StatCard from './StatCard'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../../Components/stores/useAuthStore'

const API_URL = 'https://localhost:7256/api'
const PUBLICATION_URL = `${API_URL}/Publication`
const USER_URL = `${API_URL}/User`

export default function RecruiterView() {
  const { token, user } = useAuthStore()

  const [profile, setProfile] = useState({
    name: '',
    lastName: '',
  })

  const [jobs, setJobs] = useState([])
  const [totalPublications, setTotalPublications] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // =========================
  // Obtener usuario + publicaciones
  // =========================

  useEffect(() => {
    const loadDashboard = async () => {
      if (!token || !user?.id) {
        setError('No hay una sesión activa.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        // =========================
        // Usuario
        // =========================

        const userResponse = await fetch(
          `${USER_URL}/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!userResponse.ok) {
          console.error(
            'Error usuario:',
            userResponse.status,
            await userResponse.text()
          )

          throw new Error(
            'No se pudo obtener la información del usuario.'
          )
        }

        const userData = await userResponse.json()

        setProfile({
          name: userData.name ?? '',
          lastName: userData.lastName ?? '',
        })

        // =========================
        // Publicaciones
        // =========================

        const publicationsResponse = await fetch(
          `${PUBLICATION_URL}/my?page=1&pageSize=25`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!publicationsResponse.ok) {
          console.error(
            'Error publicaciones:',
            publicationsResponse.status,
            await publicationsResponse.text()
          )

          throw new Error(
            'No se pudieron obtener tus búsquedas.'
          )
        }

        const publicationsData = await publicationsResponse.json()

        // =========================
        // Cantidad de publicaciones
        // =========================

        const countResponse = await fetch(
          `${PUBLICATION_URL}/my/count`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!countResponse.ok) {
          console.error(
            'Error cantidad:',
            countResponse.status,
            await countResponse.text()
          )

          throw new Error(
            'No se pudo obtener la cantidad de búsquedas.'
          )
        }

        const countData = await countResponse.json()

        setJobs(publicationsData)
        setTotalPublications(countData)

      } catch (err) {
        console.error(err)

        setError(
          err.message ||
          'No se pudo cargar el panel de reclutamiento.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [token, user?.id])

  // =========================
  // Estadísticas
  // =========================

  const totalApplicants = jobs.reduce(
    (total, job) => total + (job.applicants ?? 0),
    0
  )

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#355872]" />

          <p className="mt-3 text-sm text-slate-500">
            Preparando tu panel...
          </p>
        </div>
      </div>
    )
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-700">
          {error}
        </p>
      </div>
    )
  }

  // =========================
  // Render
  // =========================

  return (
    <div className="space-y-6">

      {/* =========================
          Bienvenida
      ========================= */}

      <div className="relative overflow-hidden rounded-2xl bg-[#355872] p-6 text-white shadow">

        <div className="relative z-10">

          <p className="text-sm text-white/70">
            Panel de reclutamiento
          </p>

          <h1 className="mt-1 font-display text-3xl font-semibold">
            ¡Hola, {profile.name || 'reclutador'}!
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
            Desde acá podés gestionar tus búsquedas de personal,
            revisar los candidatos que recibiste y mantener
            organizados tus procesos de selección.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">

            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              {totalPublications}{' '}
              {totalPublications === 1
                ? 'búsqueda publicada'
                : 'búsquedas publicadas'}
            </span>

            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-50 backdrop-blur">
              Cuenta activa
            </span>

          </div>

        </div>

        {/* Decoración */}

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-white/5" />

      </div>

      {/* =========================
          Estadísticas
      ========================= */}

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
          value={jobs.length}
          subtitle="Cargadas en este panel"
        />

      </div>

      {/* =========================
          Mis búsquedas
      ========================= */}

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

        {/* Sin publicaciones */}

        {jobs.length === 0 ? (

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

        ) : (

          <div className="space-y-3">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-sm"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  {/* Información */}

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
                        ? new Date(
                            job.created_Date
                          ).toLocaleDateString('es-AR')
                        : 'Sin fecha'}
                    </p>

                  </div>

                  {/* Datos */}

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

            ))}

          </div>

        )}

      </div>

      {/* =========================
          Actividad reciente
      ========================= */}

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
                      ? new Date(
                          job.created_Date
                        ).toLocaleDateString('es-AR')
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

    </div>
  )
}