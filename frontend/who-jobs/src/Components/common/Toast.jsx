import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles =
    type === "success"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white";

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-xs -translate-x-1/2 px-4 sm:max-w-sm">
      <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${styles}`}>
        <span className="shrink-0">{type === "success" ? "✓" : "✕"}</span>
        <span className="break-words">{message}</span>
      </div>
    </div>
  );
};

export default Toast;