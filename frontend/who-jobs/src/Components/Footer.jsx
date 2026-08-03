import React from "react";
import { COLORS, rgba } from "../Utils/colors";

const COLUMNS = [
  { title: "Producto", links: ["Candidatos", "Reclutadores", "Precios"] },
  { title: "Compañía", links: ["Nosotros", "Contacto"] },
  { title: "Legal", links: ["Privacidad", "Términos"] },
];

export const Footer =() =>  {
  return (
    <footer className="border-t px-6 py-14" style={{ borderColor: rgba(COLORS.steel, 0.3) }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <p className="font-display text-lg font-semibold" style={{ color: COLORS.ink }}>
            Who<span style={{ color: COLORS.steel }}>Jobs</span>
          </p>
          <p className="mt-2 font-mono text-xs" style={{ color: rgba(COLORS.ink, 0.55) }}>
            Sin ruido. Solo trabajo.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: COLORS.steel }}>
                {col.title}
              </p>
              <ul className="mt-3 space-y-2 font-body text-sm" style={{ color: rgba(COLORS.ink, 0.8) }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a className="focus-ring hover:underline" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mx-auto mt-12 max-w-6xl border-t pt-6 font-mono text-xs"
        style={{ borderColor: rgba(COLORS.steel, 0.3), color: rgba(COLORS.ink, 0.5) }}
      >
        © 2026 WhoJobs — hecho sin feeds.
      </div>
    </footer>
  );
}
