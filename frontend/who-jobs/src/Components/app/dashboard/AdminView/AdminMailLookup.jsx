import { useState } from 'react'
import api from '../../../../Services/api'

export default function AdminUserSearch() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [searched, setSearched] = useState(false)

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
    if (!email.trim()) {
      showModal(
        'Email vacío',
        'Ingresá un email para realizar la búsqueda.'
      )
      return
    }

    try {
      setLoading(true)
      setUser(null)
      setSearched(false)

      const data = await api.get(
        `/User/email/${encodeURIComponent(email.trim())}`
      )

      setUser(data)
      setSearched(true)
    } catch (error) {
      console.error('Error buscando usuario:', error)

      setUser(null)
      setSearched(true)

      showModal(
        'Usuario no encontrado',
        error.message || 'No se encontró un usuario con ese email.'
      )
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = () => {
    if (!user) return

    showModal(
      'Eliminar usuario',
      `¿Estás seguro de que querés eliminar al usuario “${
        user.name ?? 'Sin nombre'
      }”? Esta acción no se puede deshacer.`,
      'confirm'
    )
  }

  const deleteUser = async () => {
    if (!user) return

    try {
      setDeleting(true)

      await api.delete(`/User/${user.id}`)

      setUser(null)
      setEmail('')

      showModal(
        'Usuario eliminado',
        'El usuario fue eliminado correctamente.'
      )
    } catch (error) {
      console.error('Error eliminando usuario:', error)

      showModal(
        'Error',
        error.message || 'No se pudo eliminar el usuario.'
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-brand-border bg-brand-card p-6 shadow-sm">

        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-brand-title">
            Buscar usuario
          </h2>

          <p className="text-sm text-brand-muted">
            Buscá un usuario por su dirección de email.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="usuario@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchUser()
              }
            }}
            className="flex-1 rounded-lg border border-brand-border
                       bg-brand-card p-3 text-brand-title
                       placeholder:text-brand-muted
                       focus:border-brand-accent
                       focus:outline-none
                       focus:ring-2 focus:ring-brand-accent/20"
          />

          <button
            onClick={searchUser}
            disabled={loading}
            className="rounded-lg bg-brand-accent px-5 py-3
                       text-sm font-medium text-white
                       transition hover:opacity-90
                       disabled:cursor-not-allowed
                       disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        <div className="mt-5">

          {!searched && (
            <p className="text-sm text-brand-muted">
              Ingresá un email para comenzar una búsqueda.
            </p>
          )}

          {searched && !user && (
            <p className="rounded-xl border border-brand-border
                          bg-brand-bg p-4 text-sm text-brand-muted">
              No se encontró ningún usuario con ese email.
            </p>
          )}

          {user && (
            <div className="rounded-xl border border-brand-border bg-brand-bg p-4">

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-brand-muted">
                    Nombre
                  </p>

                  <p className="font-medium text-brand-title">
                    {user.name ?? 'Sin nombre'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-brand-muted">
                    Email
                  </p>

                  <p className="break-all text-sm text-brand-title">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-brand-muted">
                    ID
                  </p>

                  <p className="break-all text-sm text-brand-title">
                    {user.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-brand-muted">
                    Rol
                  </p>

                  <p className="text-sm text-brand-title">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={openDeleteModal}
                  disabled={deleting}
                  className="rounded-lg border border-red-200
                             bg-red-50 px-3 py-2 text-sm text-red-700
                             transition hover:bg-red-100
                             disabled:cursor-not-allowed
                             disabled:opacity-50"
                >
                  Eliminar usuario
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!deleting) closeModal()
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-brand-card
                       p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">

              <div
                className={`flex h-10 w-10 shrink-0 items-center
                            justify-center rounded-full ${
                  modal.type === 'confirm'
                    ? 'bg-red-100'
                    : 'bg-brand-bg'
                }`}
              >
                <span
                  className={`text-lg font-bold ${
                    modal.type === 'confirm'
                      ? 'text-red-600'
                      : 'text-brand-accent'
                  }`}
                >
                  {modal.type === 'confirm' ? '!' : 'i'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-brand-title">
                  {modal.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {modal.message}
                </p>
              </div>

            </div>

            {modal.type === 'confirm' ? (
              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={() => {
                    closeModal()
                  }}
                  disabled={deleting}
                  className="rounded-lg border border-brand-border
                             px-4 py-2.5 text-sm font-medium
                             text-brand-title transition
                             hover:bg-brand-bg
                             disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  onClick={deleteUser}
                  disabled={deleting}
                  className="rounded-lg bg-red-600 px-4 py-2.5
                             text-sm font-medium text-white
                             transition hover:bg-red-700
                             disabled:cursor-not-allowed
                             disabled:opacity-50"
                >
                  {deleting ? 'Eliminando...' : 'Eliminar'}
                </button>

              </div>
            ) : (
              <div className="mt-6 flex justify-end">

                <button
                  onClick={closeModal}
                  className="rounded-lg bg-brand-accent
                             px-5 py-2.5 text-sm font-medium text-white
                             transition hover:opacity-90"
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