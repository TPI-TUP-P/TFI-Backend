import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../../Utils/content";

export default function IDBadge({ role }) {
  const data = content[role];
  const Icon = data?.badgeIcon;

  return (
    <div className="relative mx-auto w-full max-w-[240px] lg:mx-0">
      {/* Halo de resplandor suave */}
      <div
        className="absolute -inset-8 -z-10 rounded-full bg-brand-accent/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Clip superior de la credencial */}
      <div className="relative z-10 flex justify-center">
        <div className="h-4 w-9 rounded-full border-2 border-brand-title bg-brand-bg" />
      </div>

      {/* Tarjeta / Credencial */}
      <motion.div
        whileHover={{ rotate: 1.5, y: -4 }}
        initial={{ rotate: -3 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative z-10 -mt-1 overflow-hidden rounded-2xl border-2 border-brand-title bg-brand-card px-6 py-7 text-center shadow-xl shadow-brand-title/10"
      >
        {/* Línea punteada de corte */}
        <div
          className="absolute inset-x-4 top-4 border-t border-dashed border-brand-border"
          aria-hidden="true"
        />

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted">
          WhoJobs ID
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-col items-center"
          >
            {/* Contenedor del ícono */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-bg">
              {Icon ? (
                <Icon size={24} className="text-brand-title" strokeWidth={1.75} />
              ) : null}
            </div>

            <p className="mt-3 text-xl font-semibold text-brand-title">
              {data?.badgeRole}
            </p>

            <p className="font-mono text-[11px] text-brand-muted">
              {data?.badgeSub}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}