// AppNavbar.jsx
import React from "react";
import { useAuthStore } from "../stores/useAuthStore";

const AppNavbar = () => {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="border-b border-brand-border bg-brand-card">
      <div className="flex items-center justify-end px-6 py-4">
        <button
          onClick={logout}
          className="rounded-full border border-brand-border px-4 py-2 text-sm font-medium text-brand-title hover:bg-brand-bg"
        >
          Salir
        </button>
      </div>
    </header>
  );
};

export default AppNavbar;