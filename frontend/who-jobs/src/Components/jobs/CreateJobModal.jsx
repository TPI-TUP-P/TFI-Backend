import React, { useState } from "react";
import { jobService } from "../../Services/job.service";

const initialForm = {
  job_position: "",
  description: "",
  salary: "",
};

const CreateJobModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.job_position.trim() || !form.description.trim() || !form.salary) {
      setError("Completá todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        job_position: form.job_position,
        description: form.description,
        salary: parseFloat(form.salary),
        applicants: 0,
      };

      const response = await jobService.create(payload);

      onCreated?.(response);
      onClose();
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.title ||
        "No se pudo crear la publicación. Intentá de nuevo.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-md rounded-xl bg-brand-card p-6 shadow-lg">

        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-brand-title">
            Nueva publicación
          </h2>
          <button
            onClick={onClose}
            className="text-brand-muted transition hover:text-brand-title"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-title">
              Puesto
            </label>
            <input
              type="text"
              name="job_position"
              value={form.job_position}
              onChange={handleChange}
              placeholder="Ej: Desarrollador Frontend Jr."
              className="w-full rounded-lg border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-title outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-title">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Detalle del puesto, requisitos, etc."
              className="w-full resize-none rounded-lg border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-title outline-none focus:border-brand-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-title">
              Salario estimado
            </label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Ej: 900000"
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-brand-border bg-brand-bg px-3 py-2 text-sm text-brand-title outline-none focus:border-brand-accent"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Publicando..." : "Publicar oferta"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateJobModal;