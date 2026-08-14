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

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        <h3 className="font-display text-2xl font-semibold text-[#1f2a33] mb-4">
          Actualizar {label}
        </h3>

        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          disabled={saving}
          className="w-full rounded-lg border border-gray-300 p-3
                     disabled:bg-gray-100"
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
            className="w-full sm:w-auto rounded-lg border border-gray-300
                       px-4 py-2 text-slate-700 hover:bg-gray-100
                       transition-colors duration-200 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="w-full sm:w-auto rounded-lg bg-[#355872]
                       px-5 py-2 text-white font-medium
                       hover:bg-[#2b475c]
                       transition-colors duration-200
                       disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>

        </div>
      </div>
    </div>
  )
}