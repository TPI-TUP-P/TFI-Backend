import React from "react";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import RoleToggle from "./RoleToggle";

export default function Navbar({ role, setRole }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="focus-ring text-xl font-bold tracking-tight text-brand-title"
        >
          Who<span className="text-brand-accent">Jobs</span>
        </Link>

        {/* Toggle para Desktop */}
        <div className="hidden md:block">
          <RoleToggle role={role} setRole={setRole} compact />
        </div>

        {/* Botón Ingresar */}
        <Link
          to="/login"
          className="focus-ring flex items-center gap-2 rounded-full border border-brand-title px-4 py-2 text-sm font-semibold text-brand-title transition-colors hover:bg-brand-title hover:text-brand-card"
        >
          <LogIn size={15} strokeWidth={2} />
          Ingresar
        </Link>
      </div>

      {/* Toggle para Mobile */}
      {/* <div className="md:flex justify-center pb-3 hidden">
        <RoleToggle role={role} setRole={setRole} compact />
      </div> */}
    </header>
  );
}