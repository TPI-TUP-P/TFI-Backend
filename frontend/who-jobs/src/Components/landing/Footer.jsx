import React from "react";
import { COLORS, rgba } from "../../Utils/colors";

const COLUMNS = [
  { title: "Producto", links: ["Candidatos", "Reclutadores", "Precios"] },
  { title: "Compañía", links: ["Nosotros", "Contacto"] },
  { title: "Legal", links: ["Privacidad", "Términos"] },
];
  const Footer =() =>  {
  return (
<footer className="border-t border-brand-border bg-brand-bg px-6 py-6 text-brand-title">
  <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
    <div className="flex items-center gap-2">
      <p className="font-display text-base font-semibold text-brand-title">
        Who<span className="text-brand-accent">Jobs</span>
      </p>
      <span className="text-brand-border">|</span>
      <p className="font-mono text-xs text-brand-muted">
        Sin ruido. Solo trabajo.
      </p>
    </div>

    <p className="font-mono text-xs text-brand-muted">
      © 2026 WhoJobs — hecho sin feeds.
    </p>
  </div>
</footer>
  );
}

export default Footer;