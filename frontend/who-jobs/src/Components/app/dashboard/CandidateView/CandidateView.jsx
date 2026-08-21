import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../Services/api'
import { updateUserSchema } from '../../../../Components/schemas/userschema'
import CandidateStats from './CandidateStats'
import CandidateCV from './CandidateCV'
import AccountInfo from './AccountInfo'
import EditUserModal from './EditUserModal'
import { useAuthStore } from '../../../stores/useAuthStore'

export default function CandidateView() {
  const navigate = useNavigate()

  const { token, user, setAuth } = useAuthStore()

  const [postulations, setPostulations] = useState([])
  const [postulationCount, setPostulationCount] = useState(0)
  const [loadingPostulations, setLoadingPostulations] = useState(true)

  const [cvFile, setCvFile] = useState(null)
  const [uploadingCv, setUploadingCv] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [editingField, setEditingField] = useState('')
  const [editingLabel, setEditingLabel] = useState('')
  const [editingValue, setEditingValue] = useState('')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Eliminar cuenta
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const loadPostulations = async () => {
      if (!user?.id) {
        setLoadingPostulations(false)
        return
      }

      try {
        setLoadingPostulations(true)

        const count = await api.get('/Postulation/count')
        setPostulationCount(count)

        const data = await api.get(`/Postulation/user/${user.id}`)
        setPostulations(data)
      } catch (err) {
        console.error('Error cargando postulaciones:', err)
        setError(err.message)
      } finally {
        setLoadingPostulations(false)
      }
    }

    loadPostulations()
  }, [user?.id])

  const openEditModal = (field, label, value) => {
    setEditingField(field)
    setEditingLabel(label)
    setEditingValue(value ?? '')
    setError('')
    setOpenModal(true)
  }

  const closeEditModal = () => {
    if (saving) return

    setOpenModal(false)
    setError('')
  }

  const handleSave = async () => {
    if (!user) {
      setError('No se encontró la información del usuario.')
      return
    }

    try {
      setSaving(true)
      setError('')

      const updateRequest = {
        Name:
          editingField === 'name'
            ? editingValue
            : user.name,

        LastName:
          editingField === 'lastName'
            ? editingValue
            : user.lastName,

        Phone:
          editingField === 'phone'
            ? editingValue || null
            : user.phone || null,
      }

      const validatedData = updateUserSchema.parse(updateRequest)

      await api.patch('/User', validatedData)

      setAuth(token, {
        ...user,
        name: validatedData.Name,
        lastName: validatedData.LastName,
        phone: validatedData.Phone,
      })

      setOpenModal(false)
    } catch (err) {
      console.error(err)

      if (err.name === 'ZodError') {
        setError(err.issues[0].message)
      } else {
        setError(
          err.message || 'No se pudieron guardar los cambios.'
        )
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true)
      setDeleteError('')

      await api.delete('/User/me')

      localStorage.removeItem('token')

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

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-brand-muted">
          Cargando información del usuario...
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">

        {/* Header */}
        <div className="rounded-2xl bg-brand-accent p-6 text-white shadow-sm">
          <p className="text-sm text-white/70">
            Panel principal
          </p>

          <h1 className="font-display mt-1 text-3xl font-semibold">
            ¡Hola, {user.name || 'usuario'}!
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Desde acá podés mantener tus datos actualizados,
            administrar tu currículum y revisar el estado de tus
            postulaciones.
          </p>
        </div>

        {/* Estadísticas */}
        <CandidateStats
          postulationCount={postulationCount}
          postulations={postulations}
          loading={loadingPostulations}
        />

        {/* CV */}
        <CandidateCV
          cvFile={cvFile}
          setCvFile={setCvFile}
          uploadingCv={uploadingCv}
          setUploadingCv={setUploadingCv}
          error={error}
          setError={setError}
        />

        {/* Información de cuenta */}
        <AccountInfo
          user={user}
          onEdit={openEditModal}
        />

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

      {/* Modal de edición */}
      <EditUserModal
        open={openModal}
        label={editingLabel}
        value={editingValue}
        setValue={setEditingValue}
        saving={saving}
        error={error}
        onSave={handleSave}
        onClose={closeEditModal}
      />

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