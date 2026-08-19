import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../../Services/api'

import RecruiterWelcome from './RecruiterWelcome'
import RecruiterStats from './RecruiterStats'
import RecruiterJobs from './RecruiterJobs'
import RecruiterActivity from './RecruiterActivity'
import { useRecruiterDashboard } from '../../../../Hooks/useRecruiterDashboard'

export default function RecruiterView() {
  const {
    profile,
    jobs,
    totalPublications,
    totalApplicants,
    postulationStats,
    loading,
    error,
  } = useRecruiterDashboard()

  const navigate = useNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true)
      setDeleteError('')

      await api.delete('/User/me')

      // Limpiar sesión
      localStorage.removeItem('token')

      // Redirigir
      navigate('/login', { replace: true })
    } catch (error) {
      console.error(error)

      setDeleteError(
        error?.response?.data?.message ||
        'No se pudo eliminar la cuenta. Intentá nuevamente.'
      )
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full
                       border-4 border-brand-border
                       border-t-brand-accent"
          />

          <p className="mt-3 text-sm text-brand-muted">
            Preparando tu panel...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-700">
          {error}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">

        <RecruiterWelcome
          name={profile.name}
          totalPublications={totalPublications}
        />

        <RecruiterStats
          totalPublications={totalPublications}
          totalApplicants={totalApplicants}
          visibleJobs={jobs.length}
          postulationStats={postulationStats}
        />

        <RecruiterJobs jobs={jobs} />

        <RecruiterActivity jobs={jobs} />

        {/* Cuenta */}
        <section className="rounded-xl border border-brand-border bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-brand-text">
                Cuenta
              </h2>

              <p className="mt-1 text-sm text-brand-muted">
                Esta acción eliminará tu cuenta y tus datos asociados.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDeleteError('')
                setShowDeleteModal(true)
              }}
              className="rounded-lg border border-red-200 px-4 py-2
                         text-sm font-medium text-red-600
                         transition hover:bg-red-50"
            >
              Eliminar mi cuenta
            </button>
          </div>
        </section>

      </div>

      {/* Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/50 px-4"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <h2 className="text-lg font-semibold text-brand-text">
              ¿Eliminar tu cuenta?
            </h2>

            <p className="mt-3 text-sm leading-6 text-brand-muted">
              Esta acción es permanente. Se eliminará tu cuenta y no podrás
              recuperar tus datos posteriormente.
            </p>

            {deleteError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-700">
                  {deleteError}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border border-brand-border px-4 py-2
                           text-sm font-medium text-brand-text
                           transition hover:bg-brand-border/30
                           disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteAccount}
                className="rounded-lg bg-red-600 px-4 py-2
                           text-sm font-medium text-white
                           transition hover:bg-red-700
                           disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? 'Eliminando...' : 'Sí, eliminar cuenta'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}