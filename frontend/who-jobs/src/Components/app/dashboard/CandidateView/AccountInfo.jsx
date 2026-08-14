const roleNames = {
  0: 'Candidato',
  1: 'Reclutador',
  2: 'Administrador',
  3: 'Super Administrador',
}

export default function AccountInfo({
  user,
  onEdit,
}) {
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
            className="rounded-xl border border-gray-200 bg-gray-50 p-4
                       flex items-start justify-between gap-4"
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
                  onEdit(
                    item.field,
                    item.label,
                    item.value
                  )
                }
                className="shrink-0 rounded-lg border border-gray-300
                           px-3 py-2 text-sm font-medium text-slate-700
                           hover:bg-white transition-colors duration-200"
              >
                Editar
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  )
}