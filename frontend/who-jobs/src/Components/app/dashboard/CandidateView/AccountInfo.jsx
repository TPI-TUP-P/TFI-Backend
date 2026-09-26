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
    <div className="space-y-6 rounded-2xl border border-brand-border bg-brand-card p-4 shadow-sm sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-brand-title">
          Información de la cuenta
        </h2>

        <p className="mt-1 text-sm text-brand-muted">
          Datos utilizados para tus postulaciones dentro de la plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map(item => (
          <div
            key={item.field}
            className="flex items-start justify-between gap-4 rounded-xl
                       border border-brand-border bg-brand-bg p-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                {item.label}
              </p>

              <p className="mt-2 break-words text-base font-medium text-brand-title">
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
                className="shrink-0 rounded-lg border border-brand-border
                           bg-brand-card px-3 py-2 text-sm font-medium
                           text-brand-title transition-colors duration-200
                           hover:bg-brand-bg hover:border-brand-accent"
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