import { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import StatCard from './StatCard'

export default function AdminView() {
  const [jobQuery, setJobQuery] = useState('')
  const [userQuery, setUserQuery] = useState('')

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-[#355872] to-[#2b475c] p-6 text-white shadow-lg">
          <h1 className="font-display text-3xl font-semibold">
            Panel administrativo
          </h1>

          <p className="text-sm text-white/80 mt-2">
            Supervisá usuarios, búsquedas laborales y la actividad general de la plataforma.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Usuarios activos" value="1.248" subtitle="+12 esta semana" />

          <StatCard title="Búsquedas activas" value="87" subtitle="5 pendientes" />

          <StatCard title="Postulaciones" value="3.421" subtitle="Últimos 30 días" />

          <StatCard title="Empresas" value="42" subtitle="2 nuevas hoy" />
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow hover:border-[#355872] hover:shadow-md transition-all">
            <p className="font-medium text-[#1f2a33]">Crear búsqueda</p>

            <p className="text-sm text-slate-500 mt-1">
              Publicar una nueva oferta laboral
            </p>
          </button>

          <button className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow hover:border-[#355872] hover:shadow-md transition-all">
            <p className="font-medium text-[#1f2a33]">Gestionar usuarios</p>

            <p className="text-sm text-slate-500 mt-1">
              Revisar candidatos y reclutadores
            </p>
          </button>

          <button className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow hover:border-[#355872] hover:shadow-md transition-all">
            <p className="font-medium text-[#1f2a33]">Ver reportes</p>

            <p className="text-sm text-slate-500 mt-1">
              Contenido pendiente de revisión
            </p>
          </button>
        </div>

        {/* Gestión */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-[#1f2a33]">
                Gestionar búsquedas
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Buscá una oferta y realizá acciones administrativas.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="ID, título o empresa"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#355872]/30"
              />

              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100">
                Buscar
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
              <div>
                <p className="font-medium text-[#1f2a33]">
                  Frontend React Developer
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  ID #JOB-1024 · Tech Solutions SRL
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-white">
                  Ver
                </button>

                <button className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-700 hover:bg-amber-100">
                  Pausar
                </button>

                <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100">
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-[#1f2a33]">
                Gestionar usuarios
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Buscá candidatos o reclutadores registrados.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Email, nombre o ID"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#355872]/30"
              />

              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gray-100">
                Buscar
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
              <div>
                <p className="font-medium text-[#1f2a33]">Tomás Benítez</p>

                <p className="text-sm text-slate-500 mt-1">
                  tomas@mail.com · Candidato · Activo
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-white">
                  Ver cuenta
                </button>

                <button className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-700 hover:bg-amber-100">
                  Suspender
                </button>

                <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

