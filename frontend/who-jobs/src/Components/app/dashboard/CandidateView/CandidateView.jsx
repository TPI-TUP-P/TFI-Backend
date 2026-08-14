import { useEffect, useState } from 'react'

import api from '../../../../Services/api'
import { updateUserSchema } from '../../../../Components/schemas/userschema'

import CandidateStats from './CandidateStats'
import CandidateCV from './CandidateCV'
import AccountInfo from './AccountInfo'
import EditUserModal from './EditUserModal'
import { useAuthStore } from '../../../stores/useAuthStore'

export default function CandidateView() {
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

  // =========================
  // Cargar postulaciones
  // =========================

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

  // =========================
  // Modal
  // =========================

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

  // =========================
  // Actualizar usuario
  // =========================

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

  // =========================
  // Usuario
  // =========================

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-slate-500">
          Cargando información del usuario...
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">

        {/* Header */}
        <div className="rounded-2xl bg-[#355872] p-6 text-white shadow">
          <p className="text-sm text-white/70">
            Panel principal
          </p>

          <h1 className="font-display text-3xl font-semibold mt-1">
            ¡Hola, {user.name || 'usuario'}!
          </h1>

          <p className="text-sm text-white/80 mt-2 max-w-2xl">
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

      </div>

      {/* Modal */}
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
    </>
  )
}