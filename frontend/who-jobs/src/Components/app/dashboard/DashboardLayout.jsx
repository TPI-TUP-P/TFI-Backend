import { useState } from 'react'

export default function DashboardLayout({ title, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-body">
      {/* Overlay móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-[#355872] text-white p-6 shadow-xl
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-semibold">
            Dashboard
          </h2>

          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="space-y-2">
          <a
            href="/home"
            className="block rounded-lg px-3 py-2 text-blue-100 hover:bg-[#2b475c] hover:text-white transition-colors duration-200 focus-ring"
          >
            Inicio
          </a>
        </nav>
      </aside>

      {/* Contenido */}
      <div className="md:ml-64">
        {/* Header móvil */}
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl text-[#355872]"
          >
            ☰
          </button>

          <span className="font-display text-xl font-semibold text-[#1f2a33]">
            {title}
          </span>

          <div className="w-8" />
        </header>

        <main className="p-4 md:p-8">
          {/* Título desktop */}
          <div className="hidden md:block mb-8">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-[#1f2a33] mb-2">
              {title}
            </h1>

            <div className="h-1 w-16 rounded-full bg-[#355872]" />
          </div>

          <div className="font-body text-[#334155]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}