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
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${styles}`}>
        {type === "success" ? "✓" : "✕"} {message}
      </div>
    </div>
  );
};

export default Toast;