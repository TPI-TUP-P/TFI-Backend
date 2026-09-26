import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowUp } from "lucide-react";
import { COLORS, rgba } from "../../Utils/colors";

export default function FinalCTA() {
  return (
 <section className="px-6 py-24 bg-brand-bg">
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55 }}
    className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-title px-8 py-16 text-center text-brand-card sm:px-16 shadow-xl"
  >
    {/* Resplandor decorativo con acento de marca */}
    <div
      className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-accent/30 blur-3xl"
      aria-hidden="true"
    />

    <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-accent">
      Sin ruido, arrancá ahora
    </p>

    <h2 className="relative mt-4 font-display text-3xl font-semibold leading-tight text-brand-card sm:text-4xl">
      Dejá el feed atrás.
      <br />
      Empezá cuando quieras.
    </h2>

    <a
      href="#hero"
      className="focus-ring relative z-10 my-6 mx-auto flex w-fit items-center justify-center gap-2 rounded-full bg-brand-bg px-6 py-3 text-sm font-semibold text-brand-title transition-transform hover:scale-[1.02] hover:bg-brand-card active:scale-[0.98]"
    >
      Empezar gratis
      <ArrowUp size={15} />
    </a>
  </motion.div>
</section>
  );
}
