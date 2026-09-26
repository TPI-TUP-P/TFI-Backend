import React from "react";
import { motion } from "framer-motion";

const OPTIONS = [
  { key: "candidato", label: "Soy Candidato" },
  { key: "reclutador", label: "Soy Reclutador" },
];

export default function RoleToggle({ role, setRole, compact = false }) {
  return (
    <div
      className={`relative inline-flex rounded-full border border-brand-border bg-brand-card ${
        compact ? "p-0.5" : "p-1"
      }`}
    >
      {OPTIONS.map((opt) => {
        const active = role === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => setRole(opt.key)}
            className={`relative z-10 rounded-full font-medium transition-colors duration-300 focus:outline-none ${
              compact ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
            } ${active ? "text-brand-title font-semibold" : "text-brand-muted hover:text-brand-title"}`}
          >
            {active && (
              <motion.span
                layoutId={compact ? "pill-nav" : "pill-hero"}
                className="absolute inset-0 z-0 rounded-full bg-brand-bg border border-brand-border shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}