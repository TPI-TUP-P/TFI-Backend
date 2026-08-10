
import { useEffect, useState } from 'react'

import CandidateView from '../Components/app/dashboard/CandidateView'
import RecruiterView from '../Components/app/dashboard/RecruiterView'
import AdminView from '../Components/app/dashboard/AdminView'

import { useAuthStore } from '../Components/stores/useAuthStore'

const API_URL = 'https://localhost:7256/api/User'

const HomePage = () => {
  const { token, user, setAuth } = useAuthStore()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        setError('No hay una sesión activa.')
        setLoading(false)
        return
      }

      if (!user?.id) {
        setError('No se encontró el ID del usuario.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `${API_URL}/${user.id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: No se pudo obtener el usuario.`
          )
        }

        const data = await response.json()

        // Guardamos el usuario completo
        setAuth(token, data)

      } catch (err) {
        console.error(err)
        setError('No se pudo cargar el usuario.')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [token, user?.id, setAuth])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-slate-500">
          Cargando usuario...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    )
  }

  const dashboards = {
    0: <CandidateView />,
    1: <RecruiterView />,
    2: <AdminView />,
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {dashboards[user?.role] ?? (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-500">
            Rol no válido.
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage

