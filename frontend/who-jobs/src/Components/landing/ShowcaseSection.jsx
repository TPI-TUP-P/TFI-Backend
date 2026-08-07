import React from "react";
import { motion } from "framer-motion";
import { UserRound, Briefcase, Check } from "lucide-react";
import { COLORS, rgba } from "../../Utils/colors";

function Benefits({ items }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2.5">
          <Check size={14} style={{ color: COLORS.ink }} strokeWidth={2.5} />
          <span className="font-body text-sm" style={{ color: COLORS.ink }}>
            {t}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProfileMock() {
  return (
    <div className="mt-7 rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: rgba(COLORS.steel, 0.4) }}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: rgba(COLORS.sky, 0.5) }}>
          <UserRound size={18} style={{ color: COLORS.ink }} strokeWidth={1.75} />
        </div>
        <div>
          <div className="h-2.5 w-28 rounded-full" style={{ backgroundColor: rgba(COLORS.ink, 0.6) }} />
          <div className="mt-1.5 h-2 w-20 rounded-full" style={{ backgroundColor: rgba(COLORS.steel, 0.5) }} />
        </div>
        <span
          className="ml-auto rounded-full px-2.5 py-1 font-mono text-[10px]"
          style={{ backgroundColor: rgba(COLORS.ink, 0.08), color: COLORS.ink }}
        >
          94% match
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["Frontend Senior", "React", "TypeScript"].map((t) => (
          <span
            key={t}
            className="rounded-full border px-2.5 py-1 font-mono text-[10px]"
            style={{ borderColor: rgba(COLORS.steel, 0.5), color: COLORS.ink }}
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
    <div className="mt-7 space-y-2.5 rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: rgba(COLORS.steel, 0.4) }}>
      {rows.map((row) => (
        <div
          key={row.role}
          className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
          style={{ borderColor: rgba(COLORS.steel, 0.3) }}
        >
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full" style={{ backgroundColor: rgba(COLORS.sky, 0.5) }}>
            <Briefcase size={14} style={{ color: COLORS.ink }} strokeWidth={1.75} />
          </div>
          <span className="font-body text-xs font-medium" style={{ color: COLORS.ink }}>
            {row.role}
          </span>
          <span
            className="ml-auto rounded-full px-2 py-0.5 font-mono text-[10px]"
            style={{ backgroundColor: rgba(COLORS.ink, 0.08), color: COLORS.ink }}
          >
            {row.match}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: COLORS.cream }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: COLORS.steel }}>
            Así se ve
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl" style={{ color: COLORS.ink }}>
            Lo justo y necesario para cada uno.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-3xl border bg-white/70 p-8"
            style={{ borderColor: rgba(COLORS.steel, 0.4) }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: COLORS.steel }}>
              Para Candidatos
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold" style={{ color: COLORS.ink }}>
              Un perfil que trabaja por vos.
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed" style={{ color: rgba(COLORS.ink, 0.7) }}>
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
            className="rounded-3xl border bg-white/70 p-8"
            style={{ borderColor: rgba(COLORS.steel, 0.4) }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: COLORS.steel }}>
              Para Reclutadores
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold" style={{ color: COLORS.ink }}>
              Buscás y encontrás, sin vueltas.
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed" style={{ color: rgba(COLORS.ink, 0.7) }}>
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
