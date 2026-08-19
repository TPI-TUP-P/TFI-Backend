import React, { useState } from "react";
import { postulationService } from "../../Services/postulation.service";

const stateLabels = {
  0: { text: "Pendiente", color: "bg-yellow-100 text-yellow-700" },
  1: { text: "Aceptada", color: "bg-green-100 text-green-700" },
  2: { text: "Rechazada", color: "bg-red-100 text-red-700" },
};

const PostulationCard = ({ postulation, onUpdateState }) => {
  const [loadingAction, setLoadingAction] = useState(null);
  const [downloadingCv, setDownloadingCv] = useState(false);

  const stateInfo = stateLabels[postulation.state] ?? stateLabels[0];
  const isResolved = postulation.state === 1 || postulation.state === 2;

  const fullName =
    [postulation.applicantName, postulation.applicantLastName]
      .filter(Boolean)
      .join(" ") || "Postulante";

  const handleAction = async (newState, action) => {
    setLoadingAction(action);
    try {
      await onUpdateState(postulation.id, newState);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDownloadCv = async () => {
    setDownloadingCv(true);
    try {
      const url = await postulationService.getCvUrl(postulation.id);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      alert("No se pudo obtener el CV.");
    } finally {
      setDownloadingCv(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-brand-border bg-brand-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-semibold text-brand-title">
            {fullName}
          </p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${stateInfo.color}`}>
            {stateInfo.text}
          </span>
        </div>

        <p className="mt-1 text-xs text-brand-muted">
          Postulado el {new Date(postulation.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={handleDownloadCv}
          disabled={downloadingCv}
          className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-accent hover:underline disabled:opacity-60"
        >
          📄 {downloadingCv ? "Generando enlace..." : "Descargar CV"}
        </button>
      </div>

      {!isResolved && (
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => handleAction(1, "accept")}
            disabled={loadingAction !== null}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingAction === "accept" ? "..." : "Aceptar"}
          </button>
          <button
            onClick={() => handleAction(2, "reject")}
            disabled={loadingAction !== null}
            className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingAction === "reject" ? "..." : "Rechazar"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostulationCard;