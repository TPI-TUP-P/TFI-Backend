import React from "react";
import { motion } from "framer-motion";
import { COLORS, rgba } from "../../Utils/colors";

const OPTIONS = [
  { key: 0, label: "Soy Candidato" },
  { key: 1, label: "Soy Reclutador" },
];

export default function RoleToggle({ role, setRole, compact = false }) {
  return (
    <div
      className={`relative inline-flex rounded-full border ${compact ? "p-0.5" : "p-1"}`}
      style={{ borderColor: rgba(COLORS.steel, 0.4), backgroundColor: rgba(COLORS.steel, 0.08) }}
    >
      {OPTIONS.map((opt) => {
        const active = role === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => setRole(opt.key)}
            className={`focus-ring relative z-10 rounded-full font-body font-medium transition-colors duration-300 ${
              compact ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
            }`}
            style={{ color: active ? COLORS.ink : rgba(COLORS.ink, 0.55) }}
          >
            {active && (
              <motion.span
                layoutId={compact ? "pill-nav" : "pill-hero"}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: COLORS.cream, boxShadow: `0 0 0 1px ${rgba(COLORS.steel, 0.5)}` }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
