// AppNavbar.jsx
import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import Input from "../ui/Input";
const AppNavbar = () => {
  const logout = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
  { to: "/home", label: "Dashboard" },
  { to: "/jobs", label: "Empleos" },
];


  return (
     <header className="fixed left-1/2 top-4 z-50 w-[92%] max-w-5xl -translate-x-1/2">
      <div className="rounded-2xl border border-brand-border bg-brand-card/90 px-6 py-3 shadow-lg shadow-brand-title/5 backdrop-blur-md">
        
        <div className="hidden items-center justify-between gap-6 md:flex">
          <Link to="/dashboard" className="shrink-0 font-display text-base font-semibold text-brand-title">
            Who<span className="text-brand-accent">Jobs</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? "text-brand-title" : "text-brand-muted hover:text-brand-title"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="relative w-full max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <Input placeholder="Buscar..." classname="pl-9 py-2 text-xs rounded-full" />
          </div>

          <button onClick={logout} className="shrink-0 rounded-full border border-brand-border px-4 py-2 text-xs font-medium text-brand-title hover:bg-brand-bg">
            Salir
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 md:hidden">
          <Link to="/dashboard" className="font-display text-base font-semibold text-brand-title">
            Who<span className="text-brand-accent">Jobs</span>
          </Link>
          <button onClick={() => setOpen(!open)} className="text-brand-title">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-4 border-t border-brand-border pt-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "text-brand-title" : "text-brand-muted hover:text-brand-title"
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <Input placeholder="Buscar..." classname="pl-9 py-2 text-xs rounded-full" />
            </div>

            <button onClick={logout} className="rounded-full border border-brand-border px-4 py-2 text-xs font-medium text-brand-title hover:bg-brand-bg">
              Salir
            </button>
          </div>
        )}
      </div>
    </header>

  );
};

export default AppNavbar;