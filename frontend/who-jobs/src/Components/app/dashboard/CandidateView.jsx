import { useState,useEffect } from 'react'
import StatCard from './StatCard'
import { useAuthStore } from '../../../Components/stores/useAuthStore'

const API_URL = 'https://localhost:7256/api'
const USER_URL = `${API_URL}/User`
const POSTULATION_URL = `${API_URL}/Postulation`

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

  const [openModal, setOpenModal] = useState(false)
  const [editingField, setEditingField] = useState('')
  const [editingLabel, setEditingLabel] = useState('')
  const [editingValue, setEditingValue] = useState('')

  // =========================
  // Abrir modal
  // =========================

  useEffect(() => {
  const loadPostulations = async () => {
    if (!token || !user?.id) {
      setLoadingPostulations(false)
      return
    }

    try {
      setLoadingPostulations(true)

      // Cantidad de postulaciones
      const countResponse = await fetch(
        `${POSTULATION_URL}/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (countResponse.ok) {
        const count = await countResponse.json()
        setPostulationCount(count)
      }

      // Listado de postulaciones
      const listResponse = await fetch(
        `${POSTULATION_URL}/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (listResponse.ok) {
        const data = await listResponse.json()
        setPostulations(data)
      }

    } catch (err) {
      console.error('Error cargando postulaciones:', err)
    } finally {
      setLoadingPostulations(false)
    }
  }

  loadPostulations()
}, [token, user?.id])

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
    if (!token) {
      setError('No hay una sesión activa.')
      return
    }

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
            ? editingValue
            : user.phone || null,
      }

      const response = await fetch(USER_URL, {
    method: 'PATCH',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateRequest),
})

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: No se pudieron actualizar los datos.`
        )
      }

      /*
       * Actualizamos Zustand directamente.
       *
       * El endpoint puede devolver un resultado o no.
       * Como ya sabemos qué campo modificamos,
       * podemos actualizarlo localmente.
       */

      setAuth(token, {
        ...user,
        name:
          editingField === 'name'
            ? editingValue
            : user.name,

        lastName:
          editingField === 'lastName'
            ? editingValue
            : user.lastName,

        phone:
          editingField === 'phone'
            ? editingValue
            : user.phone,
      })

      setOpenModal(false)

    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron guardar los cambios.'
      )
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

  return (
    <>
      <div className="space-y-6">

        {/* =========================
            Bienvenida
        ========================= */}

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

          <div className="flex flex-wrap gap-2 mt-4">

            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              Perfil
            </span>

            <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-50 backdrop-blur">
              Cuenta activa
            </span>

            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              {roleNames[user.role] ?? 'Usuario'}
            </span>

          </div>

        </div>

        {/* =========================
            Estadísticas
        ========================= */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Postulaciones"
          value={loadingPostulations ? '...' : postulationCount}
          subtitle="En total"
        />

        <StatCard
          title="En revisión"
          value={loadingPostulations
            ? '...'
            : postulations.filter(p => p.state === 'Pending').length}
          subtitle="Esperando respuesta"
        />

        <StatCard
          title="Aceptadas"
          value={loadingPostulations
            ? '...'
            : postulations.filter(p => p.state === 'Accepted').length}
          subtitle="Procesos avanzados"
        />

        <StatCard
          title="CV actualizado"
          value="Sí"
          subtitle="Última subida"
        />

      </div>

        {/* =========================
            Acciones rápidas
        ========================= */}

        <div className="bg-white rounded-2xl shadow p-4 sm:p-6 border border-gray-200 space-y-4">

          <div>
            <h2 className="font-display text-2xl font-semibold text-[#1f2a33]">
              Acciones rápidas
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Gestioná las tareas más importantes de tu cuenta.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* CV */}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-3">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-lg bg-[#355872]/10 text-[#355872] flex items-center justify-center">
                  📄
                </div>

                <div>
                  <h3 className="font-medium text-[#1f2a33]">
                    Currículum
                  </h3>

                  <p className="text-sm text-slate-500">
                    Cargá o actualizá tu currículum.
                  </p>
                </div>

              </div>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#355872] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#2b475c] focus-ring"
              />

            </div>

            {/* Seguridad */}

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-3">

              <div className="flex items-center gap-3">

                <div className="h-10 w-10 rounded-lg bg-[#355872]/10 text-[#355872] flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <h3 className="font-medium text-[#1f2a33]">
                    Seguridad de la cuenta
                  </h3>

                  <p className="text-sm text-slate-500">
                    Mantené tu cuenta protegida y tus datos actualizados.
                  </p>
                </div>

              </div>

              <button
                className="mt-auto w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100 transition-colors duration-200 focus-ring sm:w-auto"
              >
                Gestionar cuenta
              </button>

            </div>

          </div>

        </div>

        {/* =========================
            Información de cuenta
        ========================= */}

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

            {fields.map((item) => (

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
                      openEditModal(
                        item.field,
                        item.label,
                        item.value
                      )
                    }
                    className="shrink-0 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white transition-colors duration-200 focus-ring"
                  >
                    Editar
                  </button>
                )}

              </div>

            ))}

          </div>

        </div>

        {/* =========================
            Actividad reciente
        ========================= */}

        <div className="space-y-3">
  {postulations.length > 0 ? (
    postulations.slice(0, 3).map((postulation) => (
      <div
        key={postulation.id}
        className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
      >
        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />

        <div>
          <p className="text-sm font-medium text-[#1f2a33]">
            Postulación enviada
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Estado: {postulation.state || 'Pendiente'}
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
      <p className="text-sm text-slate-500">
        Todavía no realizaste ninguna postulación.
      </p>
    </div>
  )}
</div>

      </div>

      {/* =========================
          Modal
      ========================= */}

      {openModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h3 className="font-display text-2xl font-semibold text-[#1f2a33] mb-4">
              Actualizar {editingLabel}
            </h3>

            <input
              type="text"
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              disabled={saving}
              className="w-full rounded-lg border border-gray-300 p-3 focus-ring disabled:bg-gray-100"
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
                className="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 text-slate-700 hover:bg-gray-100 transition-colors duration-200 focus-ring disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto rounded-lg bg-[#355872] px-5 py-2 text-white font-medium hover:bg-[#2b475c] transition-colors duration-200 focus-ring disabled:opacity-50"
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

