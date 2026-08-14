import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const getInitials = (name = "", lastName = "") => {
  const first = name.trim().charAt(0) || "";
  const last = lastName.trim().charAt(0) || "";
  return (first + last).toUpperCase() || "U";
};

const roleLabels = {
  0: "Candidato",
  1: "Reclutador",
  2: "Administrador",
  3: "Super Administrador",
  Candidate: "Candidato",
  Recruiter: "Reclutador",
  Admin: "Administrador",
  SuperAdmin: "Super Administrador",
};

const ProfileCard = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) return null;

  const {
    name,
    lastName,
    email,
    phone,
    role,
    createdDate,
    cvFileName,
    cvFilePath,
  } = user;

  const fullName = `${name || ""} ${lastName || ""}`.trim() || "Usuario";
  const roleLabel = roleLabels[role] || role || null;
  const isCandidate = role === 0 || role === "Candidate";

  return (
    <aside className="flex w-full flex-col rounded-xl border border-brand-border bg-brand-card p-6 shadow-sm">

      {/* Avatar + nombre */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-accent text-2xl font-bold text-white">
          {getInitials(name, lastName)}
        </div>

        <h2 className="mt-4 text-lg font-bold text-brand-title">
          {fullName}
        </h2>

        {roleLabel && (
          <span className="mt-1 rounded-full bg-brand-bg px-3 py-1 text-xs font-medium text-brand-muted">
            {roleLabel}
          </span>
        )}
      </div>

      {/* Datos de contacto */}
      <div className="mt-6 flex flex-col gap-3 border-t border-brand-border pt-5">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-brand-muted">
            Email
          </p>
          <p className="truncate text-sm font-medium text-brand-title">
            {email}
          </p>
        </div>

        {phone && (
          <div>
            <p className="text-[11px] uppercase tracking-wide text-brand-muted">
              Teléfono
            </p>
            <p className="text-sm font-medium text-brand-title">{phone}</p>
          </div>
        )}

        {createdDate && (
          <div>
            <p className="text-[11px] uppercase tracking-wide text-brand-muted">
              Miembro desde
            </p>
            <p className="text-sm font-medium text-brand-title">
              {new Date(createdDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* CV */}
      {isCandidate && (
        <div className="mt-6 border-t border-brand-border pt-5">
          <p className="text-[11px] uppercase tracking-wide text-brand-muted">
            Curriculum
          </p>

        {cvFileName ? (
            <a
          
            href={cvFilePath || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-sm font-medium text-brand-accent hover:underline"
          >
            {cvFileName}
          </a>
        ) : (
          <p className="mt-1 text-sm text-brand-muted">
            No hay CV cargado
          </p>
        )}
      </div>
      )}
      {/* CTA */}
      <button 
      className="mt-6 w-full rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title"
      onClick={() => navigate("/home")}
    >
        Mas información
      </button>
    </aside>
  );
};

export default ProfileCard;