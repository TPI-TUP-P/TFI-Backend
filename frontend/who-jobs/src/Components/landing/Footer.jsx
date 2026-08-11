import React from "react";
import { COLORS, rgba } from "../../Utils/colors";

const COLUMNS = [
  { title: "Producto", links: ["Candidatos", "Reclutadores", "Precios"] },
  { title: "Compañía", links: ["Nosotros", "Contacto"] },
  { title: "Legal", links: ["Privacidad", "Términos"] },
];
  const Footer =() =>  {
  return (
 <footer className="border-t border-brand-border bg-brand-bg px-6 py-14 text-brand-title">
  <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
    <div className="max-w-xs">
      <p className="font-display text-lg font-semibold text-brand-title">
        Who<span className="text-brand-accent">Jobs</span>
      </p>
      <p className="mt-2 font-mono text-xs text-brand-muted">
        Sin ruido. Solo trabajo.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
      {COLUMNS.map((col) => (
        <div key={col.title}>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-brand-muted">
            {col.title}
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm text-brand-title/80">
            {col.links.map((link) => (
              <li key={link}>
                <a className="focus-ring transition-colors hover:text-brand-accent hover:underline" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  
  <div className="mx-auto mt-12 max-w-6xl border-t border-brand-border pt-6 font-mono text-xs text-brand-muted">
    © 2026 WhoJobs — hecho sin feeds.
  </div>
</footer>
  );
}

export default Footer;