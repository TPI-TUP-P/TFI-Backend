import ReactDOM from "react-dom";
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

const VARIANTS = {
  danger: {
    icon: AlertCircle,
    iconColor: "#DC2626",
    iconBg: "#FEE2E2",
    button: "bg-red-600 hover:bg-red-700 text-white",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "#D97706",
    iconBg: "#FEF3C7",
    button: "bg-amber-600 hover:bg-amber-700 text-white",
  },
  info: {
    icon: Info,
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  success: {
    icon: CheckCircle,
    iconColor: "#16A34A",
    iconBg: "#DCFCE7",
    button: "bg-green-600 hover:bg-green-700 text-white",
  },
};

const ConfirmationModal = ({
  isOpen,
  type = "danger",
  buttonConfirmText = "Confirmar",
  buttonCancelText = "Cancelar",
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const variant = VARIANTS[type] || VARIANTS.danger;
  const IconComponent = variant.icon;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 transition-opacity animate-custom-enter"
        style={{
          backgroundColor: "rgba(30, 27, 46, 0.5)",
        }}
        onClick={onCancel}
      />

      <div
        className="relative w-full max-w-md mx-4 rounded-lg shadow-xl animate-custom-enter"
        style={{
          backgroundColor: "var(--color-brand-card)",
        }}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full transition-colors"
          style={{
            color: "var(--color-brand-muted)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--color-brand-border)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div
            className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full"
            style={{
              backgroundColor: variant.iconBg,
            }}
          >
            <IconComponent size={24} color={variant.iconColor} />
          </div>

          <h2
            className="text-lg font-semibold text-center mb-2"
            style={{
              color: "var(--color-brand-title)",
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-center text-sm mb-6"
              style={{
                color: "var(--color-brand-muted)",
              }}
            >
              {description}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                color: "var(--color-brand-accent)",
                borderColor: "var(--color-brand-border)",
                backgroundColor: "var(--color-brand-bg)",
                borderWidth: "1px",
                focusRingColor: "var(--color-brand-accent)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--color-brand-border)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "var(--color-brand-bg)";
              }}
            >
              {buttonCancelText}
            </button>

            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${variant.button}`}
              style={{
                backgroundColor: "var(--color-brand-accent)",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              {buttonConfirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmationModal;
