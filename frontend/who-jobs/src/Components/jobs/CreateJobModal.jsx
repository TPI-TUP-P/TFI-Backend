import React, { useState } from "react";
import { jobService } from "../../Services/job.service";

const initialForm = { job_position: "", description: "", salary: "" };

const CreateJobModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobPosition = form.job_position.trim();
    const description = form.description.trim();
    const salary = parseFloat(form.salary);
    const newErrors = {};

    if (!jobPosition) {
      newErrors.job_position = "El puesto es obligatorio.";
    } else if (jobPosition.length < 5) {
      newErrors.job_position = "El puesto debe tener al menos 5 caracteres.";
    } else if (jobPosition.length >= 100) {
      newErrors.job_position = "El puesto debe tener menos de 100 caracteres.";
    }

    if (!description) {
      newErrors.description = "La descripción es obligatoria.";
    } else if (description.length < 5) {
      newErrors.description = "La descripción debe tener al menos 5 caracteres.";
    } else if (description.length >= 1000) {
      newErrors.description = "La descripción debe tener menos de 1000 caracteres.";
    }

    if (!form.salary) {
      newErrors.salary = "El salario es obligatorio.";
    } else if (isNaN(salary)) {
      newErrors.salary = "Ingresá un salario válido.";
    } else if (salary < 1) {
      newErrors.salary = "El salario mínimo es $1.";
    } else if (salary > 1_000_000_000) {
      newErrors.salary = "El salario máximo es $1.000.000.000.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const payload = {
        job_position: jobPosition,
        description: description,
        salary: salary,
        applicants: 0,
      };
      const response = await jobService.create(payload);
      onCreated?.(response);
      onClose();
    } catch (err) {
      console.error(err);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-brand-card p-5 shadow-lg sm:p-6">

        <div className="flex items-start justify-between">
          <h2 className="text-base font-bold text-brand-title sm:text-lg">
            Nueva publicación
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 text-brand-muted transition hover:text-brand-title"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-title">
              Puesto
            </label>
            <input
              type="text"
              name="job_position"
              value={form.job_position}
              onChange={handleChange}
              minLength={5}
              maxLength={99}
              placeholder="Ej: Desarrollador Frontend Jr."
              className={`w-full rounded-lg border bg-brand-bg px-3 py-2 text-sm text-brand-title outline-none focus:border-brand-accent ${
                errors.job_position ? "border-red-500" : "border-brand-border"
              }`}
            />
            {errors.job_position && (
              <p className="mt-1 text-sm text-red-600">{errors.job_position}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-title">
              Descripción
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              minLength={5}
              maxLength={999}
              rows={4}
              placeholder="Detalle del puesto, requisitos, etc."
              className={`w-full resize-none rounded-lg border bg-brand-bg px-3 py-2 text-sm text-brand-title outline-none focus:border-brand-accent ${
                errors.description ? "border-red-500" : "border-brand-border"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
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
              min="1"
              max="1000000000"
              step="0.01"
              placeholder="Ej: 900000"
              className={`w-full rounded-lg border bg-brand-bg px-3 py-2 text-sm text-brand-title outline-none focus:border-brand-accent ${
                errors.salary ? "border-red-500" : "border-brand-border"
              }`}
            />
            {errors.salary && (
              <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
            )}
          </div>

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