import { useState } from 'react'
import api from '../../../../Services/api'

export default function AdminUserLookup() {
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [modal, setModal] = useState({
    open: false,
    type: 'info',
    title: '',
    message: '',
  })

  const showModal = (title, message, type = 'info') => {
    setModal({
      open: true,
      type,
      title,
      message,
    })
  }

  const closeModal = () => {
    setModal({
      open: false,
      type: 'info',
      title: '',
      message: '',
    })
  }

  const searchUser = async () => {
    if (!userId.trim()) {
      showModal(
        'ID requerido',
        'Ingresá el ID del usuario que querés consultar.'
      )
      return
    }

    try {
      setLoading(true)
      setUser(null)

      const response = await api.get(`/User/${userId}`)

      setUser(response)
    } catch (error) {
      console.error('Error buscando usuario:', error)

      showModal(
        'Usuario no encontrado',
        'No encontramos ningún usuario asociado al ID ingresado. Verificá que sea correcto e intentá nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = () => {
    if (!user) return

    showModal(
      'Eliminar usuario',
      `¿Estás seguro de que querés eliminar a ${user.name ?? 'este usuario'}? Esta acción no se puede deshacer.`,
      'confirm'
    )
  }

  const deleteUser = async () => {
    if (!user) return

    try {
      setDeleting(true)

      await api.delete(`/User/${user.id}`)

      setUser(null)
      setUserId('')

      showModal(
        'Usuario eliminado',
        'El usuario fue eliminado correctamente.'
      )
    } catch (error) {
      console.error('Error eliminando usuario:', error)

      showModal(
        'Error',
        'No se pudo eliminar el usuario. Intentá nuevamente.'
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#1f2a33]">
            Gestionar usuario
          </h2>

          <p className="text-sm text-slate-500">
            Consultá un usuario utilizando su identificador.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="ID del usuario"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchUser()
              }
            }}
            className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#355872]/30"
          />

          <button
            onClick={searchUser}
            disabled={loading}
            className="rounded-lg bg-[#355872] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2b475c] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {user && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="font-medium text-[#1f2a33]">
              {user.name ?? 'Usuario'}
            </p>

            <div className="mt-2 space-y-1 text-sm text-slate-500">
              {user.email && <p>{user.email}</p>}

              {user.role && (
                <p>
                  Rol: {user.role}
                </p>
              )}

              <p className="break-all">
                ID: {user.id}
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={openDeleteModal}
                disabled={deleting}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100 disabled:opacity-50"
              >
                Eliminar usuario
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!deleting) {
              closeModal()
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  modal.type === 'confirm'
                    ? 'bg-red-100'
                    : 'bg-slate-100'
                }`}
              >
                <span
                  className={`text-lg font-bold ${
                    modal.type === 'confirm'
                      ? 'text-red-600'
                      : 'text-[#355872]'
                  }`}
                >
                  {modal.type === 'confirm' ? '!' : 'i'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1f2a33]">
                  {modal.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {modal.message}
                </p>
              </div>
            </div>

            {modal.type === 'confirm' ? (
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  disabled={deleting}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  onClick={deleteUser}
                  disabled={deleting}
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            ) : (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="rounded-lg bg-[#355872] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2b475c]"
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}