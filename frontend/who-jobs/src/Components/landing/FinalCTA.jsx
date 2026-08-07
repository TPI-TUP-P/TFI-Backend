import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { COLORS, rgba } from "../../Utils/colors";

export default function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16"
        style={{ backgroundColor: COLORS.ink }}
      >
        <div
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: rgba(COLORS.sky, 0.35) }}
          aria-hidden="true"
        />
        <p className="relative font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: COLORS.sky }}>
          Sin ruido, arrancá ahora
        </p>
        <h2 className="relative mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Dejá el feed atrás.
          <br />
          Empezá cuando quieras.
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="relative mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3">
            <Mail size={16} style={{ color: COLORS.steel }} />
            <input
              type="email"
              placeholder="tu@email.com"
              className="focus-ring w-full bg-transparent font-body text-sm outline-none"
              style={{ color: COLORS.ink }}
            />
          </div>
          <button
            type="submit"
            className="focus-ring flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: COLORS.sky, color: COLORS.ink }}
          >
            Empezar gratis
            <ArrowRight size={15} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
