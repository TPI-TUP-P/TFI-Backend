// AppNavbar.jsx
import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
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
      <div className="flex items-center justify-between gap-6 rounded-full border border-brand-border bg-brand-card/90 px-6 py-3 shadow-lg shadow-brand-title/5 backdrop-blur-md">
        
        {/* Logo */}
        <Link to="/home" className="flex-shrink-0 font-display text-base font-semibold text-brand-title">
          Who<span className="text-brand-accent">Jobs</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "text-brand-title font-semibold" : "text-brand-muted hover:text-brand-title"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        <div className="relative hidden w-full max-w-xs lg:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <Input placeholder="Buscar..." classname="pl-9 py-2 text-xs rounded-full" />
        </div>

        {/* Logout Button */}
        <button onClick={logout} className="flex-shrink-0 on rounded-full border border-brand-border px-4 py-2 text-xs font-medium text-brand-title hover:bg-brand-bg">
          Salir
        </button>
      </div>
    </header>

  );
};

export default AppNavbar;