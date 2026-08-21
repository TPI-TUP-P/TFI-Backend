import React, { useState } from "react";
import { postulationService } from "../../Services/postulation.service";
import { userService } from "../../Services/user.service";

const stateLabels = {
  0: "Pendiente",
  1: "Aceptada",
  2: "Rechazada",
};

const ApplyModal = ({ job, onClose, onSuccess }) => {
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSavedCv, setLoadingSavedCv] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0] || null);
  };

  const handleUseSavedCv = async () => {
    setLoadingSavedCv(true);
    setResult(null);
    try {
      const url = await userService.getMyCvUrl();

      const fileResponse = await fetch(url);
      if (!fileResponse.ok) {
        throw new Error("No se pudo descargar el CV guardado.");
      }

      const blob = await fileResponse.blob();
      const file = new File([blob], "cv.pdf", { type: "application/pdf" });

      setCvFile(file);
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        "No tenés un CV guardado en tu perfil, o no se pudo obtener.";
      setResult({ type: "error", message });
    } finally {
      setLoadingSavedCv(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      setResult({ type: "error", message: "Tenés que adjuntar tu CV." });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await postulationService.apply(job.id, cvFile);

      setResult({
        type: "success",
        message: `¡Postulación enviada con éxito! Estado: ${stateLabels[response.state] ?? "Pendiente"}.`,
      });
      onSuccess?.(response.id);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.title ||
        error?.response?.data?.message ||
        "No se pudo completar la postulación. Intentá de nuevo.";

      setResult({ type: "error", message });
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
            Postularme a {job.job_position}
          </h2>
          <button
            onClick={onClose}
            className="text-brand-muted transition hover:text-brand-title"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {!result || result.type === "error" ? (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-brand-title">
                Adjuntá tu CV
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-brand-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-accent file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-title"
              />

              <button
                type="button"
                onClick={handleUseSavedCv}
                disabled={loadingSavedCv}
                className="mt-2 w-full rounded-lg border border-brand-border px-3 py-2 text-sm font-medium text-brand-title transition hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingSavedCv ? "Cargando..." : "Usar mi CV guardado"}
              </button>

              {cvFile && (
                <p className="mt-2 truncate text-xs text-brand-muted">
                  Seleccionado: {cvFile.name}
                </p>
              )}
            </div>

            {result?.type === "error" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {result.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar postulación"}
            </button>
          </form>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
              ✓
            </div>
            <p className="text-sm font-medium text-brand-title">
              {result.message}
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg border border-brand-border px-4 py-2 text-sm font-semibold text-brand-title transition hover:bg-brand-bg"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyModal;