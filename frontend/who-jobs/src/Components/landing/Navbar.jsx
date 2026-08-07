import React from "react";
import { LogIn } from "lucide-react";
import { COLORS, rgba } from "../../Utils/colors";
import RoleToggle from "./RoleToggle";
import { Link } from "react-router-dom";

export default function Navbar({ role, setRole }) {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{ borderColor: rgba(COLORS.steel, 0.3), backgroundColor: rgba(COLORS.cream, 0.85) }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="focus-ring font-display text-xl font-semibold tracking-tight" style={{ color: COLORS.ink }}>
          Who<span style={{ color: COLORS.steel }}>Jobs</span>
        </a>

        <div className="hidden md:block">
          <RoleToggle role={role} setRole={setRole} compact />
        </div>

        <Link
        to="/login"
          className="focus-ring flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-white"
          style={{ borderColor: COLORS.ink, color: COLORS.ink }}
        >
          <LogIn size={15} strokeWidth={2} />
          Ingresar
        </Link>
      </div>
      <div className="flex justify-center pb-3 md:hidden">
        <RoleToggle role={role} setRole={setRole} compact />
      </div>
    </header>
  );
}
