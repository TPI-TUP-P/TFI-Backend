import { useState, useEffect } from 'react'
import StatCard from './StatCard'
import { useAuthStore } from '../../../Components/stores/useAuthStore'
import api from '../../../services/api'
import { updateUserSchema } from '../../../Components/schemas/userschema'


const roleNames = {
  0: 'Candidato',
  1: 'Reclutador',
  2: 'Administrador',
  3: 'Super Administrador',
}

export default function CandidateView() {
  const { token, user, setAuth } = useAuthStore()

  const [saving, setSaving] = useState(false)
  const [postulations, setPostulations] = useState([])
  const [postulationCount, setPostulationCount] = useState(0)
  const [loadingPostulations, setLoadingPostulations] = useState(true)
  const [error, setError] = useState('')
  const [cvFile, setCvFile] = useState(null)
  const [uploadingCv, setUploadingCv] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [editingField, setEditingField] = useState('')
  const [editingLabel, setEditingLabel] = useState('')
  const [editingValue, setEditingValue] = useState('')

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

        // Cantidad de postulaciones
        const count = await api.get('/Postulation/count')
        setPostulationCount(count)

        // Listado de postulaciones
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
  // Abrir modal
  // =========================

  const openEditModal = (field, label, value) => {
    setEditingField(field)
    setEditingLabel(label)
    setEditingValue(value ?? '')
    setError('')
    setOpenModal(true)
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


    // VALIDACIÓN
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
      setError(err.message || 'No se pudieron guardar los cambios.')
    }
  } finally {
    setSaving(false)
  }
}


  // =========================
  // Si todavía no hay usuario
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

  // =========================
  // Campos
  // =========================

  const fields = [
    {
      field: 'name',
      label: 'Nombre',
      value: user.name,
      editable: true,
    },
    {
      field: 'lastName',
      label: 'Apellido',
      value: user.lastName,
      editable: true,
    },
    {
      field: 'email',
      label: 'Correo electrónico',
      value: user.email,
      editable: false,
    },
    {
      field: 'phone',
      label: 'Teléfono',
      value: user.phone,
      editable: true,
    },
    {
      field: 'role',
      label: 'Rol',
      value: roleNames[user.role] ?? 'Desconocido',
      editable: false,
    },
    {
      field: 'createdDate',
      label: 'Cuenta creada',
      value: user.createdDate
        ? new Date(user.createdDate).toLocaleDateString('es-AR')
        : '',
      editable: false,
    },
  ]
  const handleUploadCv = async () => {
  if (!cvFile) {
    setError('Seleccioná un archivo PDF.')
    return
  }

  try {
    setUploadingCv(true)
    setError('')

    const formData = new FormData()

    // IMPORTANTE:
    // "cv" debe coincidir con el nombre de la propiedad
    // de UploadCVRequest en tu backend.
    formData.append('cv', cvFile)

    const result = await api.post('/User/cv', formData)

    console.log('CV subido:', result)

    setCvFile(null)

  } catch (err) {
    console.error('Error subiendo CV:', err)
    setError(err.message || 'No se pudo subir el CV.')
  } finally {
    setUploadingCv(false)
  }
}

  return (
    <>
      <div className="space-y-6">
        <div className="rounded-2xl bg-[#355872] p-6 text-white shadow">
          <p className="text-sm text-white/70">Panel principal</p>

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Postulaciones"
            value={loadingPostulations ? '...' : postulationCount}
            subtitle="En total"
          />

          <StatCard
            title="En revisión"
            value={
              loadingPostulations
                ? '...'
                : postulations.filter(p => p.state === 'Pending').length
            }
            subtitle="Esperando respuesta"
          />

          <StatCard
            title="Aceptadas"
            value={
              loadingPostulations
                ? '...'
                : postulations.filter(p => p.state === 'Accepted').length
            }
            subtitle="Procesos avanzados"
          />

          <StatCard
            title="CV actualizado"
            value="Sí"
            subtitle="Última subida"
          />
        </div>

        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 border border-gray-200">
  <div>
    <h2 className="font-display text-2xl font-semibold text-[#1f2a33]">
      Currículum
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      Subí tu currículum para utilizarlo en tus postulaciones.
    </p>
  </div>

  <div className="mt-5 flex flex-col gap-4">
    <input
      type="file"
      accept=".pdf"
      onChange={(e) => setCvFile(e.target.files[0] || null)}
      disabled={uploadingCv}
      className="block w-full text-sm text-slate-600
                 file:mr-4 file:rounded-lg file:border-0
                 file:bg-[#355872] file:px-4 file:py-2
                 file:text-white hover:file:bg-[#2b475c]"
    />

    {cvFile && (
      <p className="text-sm text-slate-600">
        Archivo seleccionado: <strong>{cvFile.name}</strong>
      </p>
    )}

    <button
      onClick={handleUploadCv}
      disabled={!cvFile || uploadingCv}
      className="w-full sm:w-auto self-start rounded-lg
                 bg-[#355872] px-5 py-2 text-white font-medium
                 hover:bg-[#2b475c]
                 transition-colors duration-200
                 disabled:opacity-50"
    >
      {uploadingCv ? 'Subiendo...' : 'Subir CV'}
    </button>

    {error && (
      <p className="text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
</div>

        {/* Información de cuenta */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 border border-gray-200 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1f2a33]">
              Información de la cuenta
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Datos utilizados para tus postulaciones dentro de la plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(item => (
              <div
                key={item.field}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-start justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-2 text-base font-medium text-[#1f2a33] break-words">
                    {item.value || 'Sin información'}
                  </p>
                </div>

                {item.editable && (
                  <button
                    onClick={() =>
                      openEditModal(item.field, item.label, item.value)
                    }
                    className="shrink-0 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white transition-colors duration-200"
                  >
                    Editar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-display text-2xl font-semibold text-[#1f2a33] mb-4">
              Actualizar {editingLabel}
            </h3>

            <input
              type="text"
              value={editingValue}
              onChange={e => setEditingValue(e.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 p-3 disabled:bg-gray-100"
            />

            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => {
                  setOpenModal(false)
                  setError('')
                }}
                disabled={saving}
                className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto rounded-lg bg-[#355872] px-5 py-2 text-white font-medium hover:bg-[#2b475c] transition-colors duration-200 disabled:opacity-50"
              >
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}