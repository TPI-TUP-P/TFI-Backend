import { useState } from "react";
import { User, Briefcase, Check } from "lucide-react";
import { useAuthLandingStore } from "../stores/useAuthLandingStore";

const COLORS = {
  bg: "#F5F4F7",
  card: "#FFFFFF",
  title: "#1E1B2E",
  muted: "#6B657B",
  accent: "#7C3AED",
  accentSoft: "#F3EEFD",
  border: "#E4E1EA",
};

const ROLES = [
  {
    id: "candidato",
    icon: User,
    title: "Candidato",
    description: "Busco empleo",
  },
  {
    id: "reclutador",
    icon: Briefcase,
    title: "Reclutador",
    description: "Busco talento",
  },
];

const RoleSelector = ({ role, setData }) => {
  const handleSelect = (id) => {
    console.log(id);
    if (id === role) return;
    setData({
      selectedRole: id,
    });
  };

  return (
    <div
      role="radiogroup"
      aria-label="Tipo de cuenta"
      className="grid mb-5 grid-cols-2 gap-3 w-full"
    >
      {ROLES.map((r) => {
        const isSelected = role === r.id;
        const Icon = r.icon;
        return (
          <button
            key={r.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => handleSelect(r.id)}
            className="relative rounded-2xl border p-4 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              borderColor: isSelected ? COLORS.accent : COLORS.border,
              backgroundColor: isSelected ? COLORS.accentSoft : COLORS.card,
              boxShadow: isSelected ? `0 0 0 3px ${COLORS.accent}1A` : "none",
            }}
          >
            <span
              className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor: isSelected ? COLORS.accent : COLORS.border,
                backgroundColor: isSelected ? COLORS.accent : "#FFFFFF",
              }}
            >
              {isSelected && (
                <Check
                  className="h-2.5 w-2.5"
                  style={{ color: "#FFFFFF" }}
                  strokeWidth={3}
                />
              )}
            </span>

            <span
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                backgroundColor: isSelected ? COLORS.accent : COLORS.bg,
                color: isSelected ? "#FFFFFF" : COLORS.accent,
              }}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>

            <div
              className="text-[15px] font-bold leading-tight"
              style={{ color: COLORS.title }}
            >
              {r.title}
            </div>
            <div
              className="mt-1 text-xs leading-snug"
              style={{ color: COLORS.muted }}
            >
              {r.description}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
