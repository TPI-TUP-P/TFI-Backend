import { useEffect, useState } from 'react'
import { useAuthStore } from '../Components/stores/useAuthStore'

const API_URL = 'https://localhost:7256/api'
const PUBLICATION_URL = `${API_URL}/Publication`
const USER_URL = `${API_URL}/User`
const POSTULATION_URL = `${API_URL}/Postulation`

export function useRecruiterDashboard() {
  const { token, user } = useAuthStore()

  const [profile, setProfile] = useState({
    name: '',
    lastName: '',
  })

  const [jobs, setJobs] = useState([])

  const [publicationStats, setPublicationStats] = useState({
    total: 0,
    visible: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [postulationStats, setPostulationStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
  })

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

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }

        // =========================
        // Usuario
        // =========================

        const userResponse = await fetch(
          `${USER_URL}/${user.id}`,
          {
            method: 'GET',
            headers,
          }
        )

        if (!userResponse.ok) {
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
            headers,
          }
        )

        if (!publicationsResponse.ok) {
          throw new Error(
            'No se pudieron obtener tus búsquedas.'
          )
        }

        const publicationsData =
          await publicationsResponse.json()

        // =========================
        // Estadísticas publicaciones
        // =========================

        const publicationCountResponse = await fetch(
          `${PUBLICATION_URL}/count/my`,
          {
            method: 'GET',
            headers,
          }
        )

        if (!publicationCountResponse.ok) {
          throw new Error(
            'No se pudieron obtener las estadísticas de búsquedas.'
          )
        }

        const publicationCountData =
          await publicationCountResponse.json()

        // =========================
        // Estadísticas postulaciones
        // =========================

        const postulationResponse = await fetch(
          `${POSTULATION_URL}/interviewer/count-by-state`,
          {
            method: 'GET',
            headers,
          }
        )

        if (!postulationResponse.ok) {
          throw new Error(
            'No se pudieron obtener las estadísticas de candidatos.'
          )
        }

        const postulationData =
          await postulationResponse.json()

        // =========================
        // Guardar datos
        // =========================

        setJobs(publicationsData)

        setPublicationStats({
          total: publicationCountData.total ?? 0,
          visible: publicationCountData.visible ?? 0,
        })

        setPostulationStats({
          pending: postulationData.pending ?? 0,
          accepted: postulationData.accepted ?? 0,
          rejected: postulationData.rejected ?? 0,
        })

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

  const totalApplicants = jobs.reduce(
    (total, job) => total + (job.applicants ?? 0),
    0
  )

  return {
    profile,
    jobs,
    publicationStats,
    totalApplicants,
    postulationStats,
    loading,
    error,
  }
}