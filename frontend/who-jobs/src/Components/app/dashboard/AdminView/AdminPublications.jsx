import { useState } from 'react'
import api from '../../../../Services/api'

export default function AdminPublications() {
  const [query, setQuery] = useState('')
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [publicationToDelete, setPublicationToDelete] = useState(null)

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

  const searchPublications = async () => {
    if (!query.trim()) {
      showModal(
        'Búsqueda vacía',
        'Ingresá un puesto para realizar la búsqueda.'
      )
      return
    }

    try {
      setLoading(true)

      const data = await api.get('/Publication/search', {
        params: {
          name: query,
          page: 1,
          pageSize: 10,
        },
      })

      setPublications(Array.isArray(data) ? data : [])
      setSearched(true)

      if (!Array.isArray(data) || data.length === 0) {
        showModal(
          'Sin resultados',
          'No se encontraron publicaciones para el puesto ingresado.'
        )
      }
    } catch (error) {
      console.error('Error buscando publicaciones:', error)

      setPublications([])
      setSearched(true)

      showModal(
        'Error de búsqueda',
        error.message || 'Ocurrió un error al buscar publicaciones.'
      )
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (publication) => {
    setPublicationToDelete(publication)

    showModal(
      'Eliminar publicación',
      `¿Estás seguro de que querés eliminar la publicación “${
        publication.job_position ?? 'Sin título'
      }”? Esta acción no se puede deshacer.`,
      'confirm'
    )
  }

  const deletePublication = async () => {
    if (!publicationToDelete) return

    try {
      setDeleting(true)

      await api.delete(`/Publication/${publicationToDelete.id}`)

      setPublications((current) =>
        current.filter(
          (publication) => publication.id !== publicationToDelete.id
        )
      )

      setPublicationToDelete(null)

      showModal(
        'Publicación eliminada',
        'La publicación fue eliminada correctamente.'
      )
    } catch (error) {
      console.error('Error eliminando publicación:', error)

      showModal(
        'Error',
        error.message || 'No se pudo eliminar la publicación.'
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
            Gestionar búsquedas
          </h2>

          <p className="text-sm text-brand-muted">
            Buscá y administrá publicaciones laborales.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Buscar por puesto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchPublications()
              }
            }}
            className="flex-1 rounded-lg border border-brand-border
                       bg-brand-card p-3 text-brand-title
                       placeholder:text-brand-muted
                       focus:outline-none focus:border-brand-accent
                       focus:ring-2 focus:ring-brand-accent/20"
          />

          <button
            onClick={searchPublications}
            disabled={loading}
            className="rounded-lg bg-brand-accent px-5 py-3
                       text-sm font-medium text-white
                       transition hover:opacity-90
                       disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        <div className="mt-5 space-y-3">

          {!searched && (
            <p className="text-sm text-brand-muted">
              Ingresá un puesto para comenzar una búsqueda.
            </p>
          )}

          {searched && publications.length === 0 && (
            <p className="rounded-xl border border-brand-border
                          bg-brand-bg p-4 text-sm text-brand-muted">
              No se encontraron publicaciones.
            </p>
          )}

          {publications.map((publication) => (
            <div
              key={publication.id}
              className="rounded-xl border border-brand-border
                         bg-brand-bg p-4"
            >
              <div>
                <p className="font-medium text-brand-title">
                  {publication.job_position ?? 'Sin título'}
                </p>

                <p className="mt-1 break-all text-sm text-brand-muted">
                  ID: {publication.id}
                </p>

                {publication.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-brand-muted">
                    {publication.description}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                <button
                  className="rounded-lg border border-brand-border
                             px-3 py-2 text-sm text-brand-title
                             transition hover:bg-brand-card"
                >
                  Ver
                </button>

                <button
                  onClick={() => openDeleteModal(publication)}
                  disabled={deleting}
                  className="rounded-lg border border-red-200
                             bg-red-50 px-3 py-2 text-sm text-red-700
                             transition hover:bg-red-100
                             disabled:opacity-50"
                >
                  Eliminar
                </button>

              </div>
            </div>
          ))}
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
                    setPublicationToDelete(null)
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
                  onClick={deletePublication}
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