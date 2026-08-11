import React from "react";
import { motion } from "framer-motion";
import { UserRound, Briefcase, Check } from "lucide-react";
import { COLORS, rgba } from "../../Utils/colors";

function Benefits({ items }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2.5">
          <Check size={14} className="text-brand-title" strokeWidth={2.5} />
          <span className="font-body text-sm text-brand-title font-medium">
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProfileMock() {
  return (
    <div className="mt-7 rounded-2xl border border-brand-border bg-brand-card p-5 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-bg">
          <UserRound size={18} className="text-brand-title" strokeWidth={1.75} />
        </div>
        <div>
          <div className="h-2.5 w-28 rounded-full bg-brand-title/70" />
          <div className="mt-1.5 h-2 w-20 rounded-full bg-brand-border" />
        </div>
        <span className="ml-auto rounded-full bg-brand-bg px-2.5 py-1 font-mono text-[10px] font-semibold text-brand-title">
          94% match
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["Frontend Senior", "React", "TypeScript"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-brand-border bg-brand-card px-2.5 py-1 font-mono text-[10px] text-brand-title"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SearchResultsMock() {
  const rows = [
    { role: "Backend .NET Semi Sr.", match: "91%" },
    { role: "UX Writer", match: "87%" },
  ];
  return (
    <div className="mt-7 space-y-2.5 rounded-2xl border border-brand-border bg-brand-card p-5 shadow-xs">
      {rows.map((row) => (
        <div
          key={row.role}
          className="flex items-center gap-3 rounded-xl border border-brand-border/60 bg-brand-bg/40 px-3 py-2.5"
        >
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-bg">
            <Briefcase size={14} className="text-brand-title" strokeWidth={1.75} />
          </div>
          <span className="font-body text-xs font-semibold text-brand-title">
            {row.role}
          </span>
          <span className="ml-auto rounded-full bg-brand-bg px-2 py-0.5 font-mono text-[10px] font-semibold text-brand-title">
            {row.match}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="bg-brand-bg px-6 py-24 text-brand-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">
            Así se ve
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-brand-title sm:text-4xl">
            Lo justo y necesario para cada uno.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-3xl border border-brand-border bg-brand-card/70 p-8 shadow-xs"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-brand-muted">
              Para Candidatos
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-brand-title">
              Un perfil que trabaja por vos.
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-brand-muted">
              Lo completás una vez y queda visible para las búsquedas que de verdad coinciden con lo que sabés hacer.
            </p>
            <ProfileMock />
            <Benefits items={["Se completa en 10 minutos", "Nadie te escribe sin motivo"]} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="rounded-3xl border border-brand-border bg-brand-card/70 p-8 shadow-xs"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-brand-muted">
              Para Reclutadores
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-brand-title">
              Buscás y encontrás, sin vueltas.
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-brand-muted">
              Filtrás por lo que necesitás y accedés directo a los perfiles que encajan. Nada de publicar y esperar.
            </p>
            <SearchResultsMock />
            <Benefits items={["Filtrás por rol, stack y disponibilidad", "Escribís directo, sin intermediarios"]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}