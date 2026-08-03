import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../Utils/content";
import { COLORS, rgba } from "../Utils/colors";

export default function IDBadge({ role }) {
  const data = content[role];
  const Icon = data.badgeIcon;

  return (
    <div className="relative mx-auto w-full max-w-60 lg:mx-0">
      {/* halo */}
      <div
        className="absolute -inset-8 -z-10 rounded-full blur-3xl"
        style={{ backgroundColor: rgba(COLORS.sky, 0.55) }}
        aria-hidden="true"
      />
      {/* clip */}
      <div className="relative z-10 flex justify-center">
        <div className="h-4 w-9 rounded-full border-2" style={{ borderColor: COLORS.ink, backgroundColor: COLORS.cream }} />
      </div>
      <motion.div
        whileHover={{ rotate: 1.5, y: -4 }}
        initial={{ rotate: -3 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative z-10 -mt-1 overflow-hidden rounded-2xl border-2 bg-white px-6 py-7 text-center shadow-[0_18px_40px_-15px_rgba(53,88,114,0.35)]"
        style={{ borderColor: COLORS.ink }}
      >
        <div
          className="absolute inset-x-4 top-4 border-t border-dashed"
          style={{ borderColor: rgba(COLORS.steel, 0.6) }}
          aria-hidden="true"
        />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: COLORS.steel }}>
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
            <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: rgba(COLORS.sky, 0.5) }}>
              <Icon size={24} style={{ color: COLORS.ink }} strokeWidth={1.75} />
            </div>
            <p className="mt-3 font-display text-xl font-semibold" style={{ color: COLORS.ink }}>
              {data.badgeRole}
            </p>
            <p className="font-mono text-[11px]" style={{ color: rgba(COLORS.ink, 0.6) }}>
              {data.badgeSub}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
