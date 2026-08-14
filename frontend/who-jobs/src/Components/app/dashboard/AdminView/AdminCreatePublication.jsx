import { useState } from 'react'
import api from '../../../../Services/api'

export default function AdminCreatePublication({ onCreated }) {
  const [form, setForm] = useState({
    job_position: '',
    description: '',
    salary: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await api.post('/Publication', {
        job_position: form.job_position,
        description: form.description,
        salary: Number(form.salary),
      })

      setForm({
        job_position: '',
        description: '',
        salary: '',
      })

      alert('Publicación creada correctamente.')

      onCreated?.()
    } catch (error) {
      console.error('Error creando publicación:', error)
      alert('No se pudo crear la publicación.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow">
      <div>
        <h2 className="text-xl font-semibold text-[#1f2a33]">
          Crear búsqueda
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Publicá una nueva búsqueda laboral.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <input
          name="job_position"
          value={form.job_position}
          onChange={handleChange}
          placeholder="Puesto"
          required
          className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#355872]/30"
        />

        <input
          name="salary"
          type="number"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salario"
          required
          className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#355872]/30"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción de la búsqueda"
          required
          rows={4}
          className="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#355872]/30 md:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#355872] px-5 py-3 text-sm font-medium text-white hover:bg-[#2b475c] disabled:opacity-50 md:col-span-2"
        >
          {loading ? 'Creando...' : 'Crear búsqueda'}
        </button>
      </form>
    </div>
  )
}