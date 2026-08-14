export default function EditUserModal({
  open,
  label,
  value,
  setValue,
  saving,
  error,
  onSave,
  onClose,
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-brand-card p-6 shadow-2xl">

        <h3 className="font-display text-2xl font-semibold text-brand-title mb-4">
          Actualizar {label}
        </h3>

        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={saving}
          className="w-full rounded-lg border border-brand-border
                     bg-brand-card p-3 text-brand-title
                     outline-none focus:border-brand-accent
                     disabled:bg-brand-bg"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            disabled={saving}
            className="w-full sm:w-auto rounded-lg border border-brand-border
                       px-4 py-2 text-brand-title
                       hover:bg-brand-bg
                       transition-colors duration-200
                       disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="w-full sm:w-auto rounded-lg bg-brand-accent
                       px-5 py-2 text-white font-medium
                       hover:opacity-90
                       transition-opacity duration-200
                       disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>

        </div>
      </div>
    </div>
  )
}