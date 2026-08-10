// AppSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, Settings } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const links = [
  { to: "/dashboard", label: "Panel", icon: LayoutDashboard },
  { to: "/dashboard/candidatos", label: "Candidatos", icon: Users },
  { to: "/dashboard/mensajes", label: "Mensajes", icon: MessageSquare },
  { to: "/dashboard/ajustes", label: "Ajustes", icon: Settings },
];

const AppSidebar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="flex h-full w-60 flex-col border-r border-brand-border bg-brand-card px-4 py-6">
      <span className="mb-8 px-2 font-display text-lg font-semibold text-brand-title">
        Who<span className="text-brand-accent">Jobs</span>
      </span>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm font-medium ${
                isActive
                  ? "border-brand-accent bg-brand-bg text-brand-title"
                  : "border-transparent text-brand-muted hover:text-brand-title"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="border-t border-brand-border pt-4">
          <p className="text-sm font-medium text-brand-title">
            {user.nombre} {user.apellido}
          </p>
          <p className="text-xs text-brand-muted">{user.rol}</p>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;