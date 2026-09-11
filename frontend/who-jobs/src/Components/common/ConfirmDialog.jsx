import React from "react";

const ConfirmDialog = ({
  title,
  message,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-brand-card p-5 shadow-lg sm:p-6">
        <h3 className="text-base font-bold text-brand-title sm:text-lg">{title}</h3>
        <p className="mt-2 break-words text-sm text-brand-muted">{message}</p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-brand-accent hover:bg-brand-title"
            }`}
          >
            {loading ? "..." : confirmLabel}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-lg border border-brand-border px-4 py-2.5 text-sm font-medium text-brand-title transition hover:bg-brand-bg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;