import React, { useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import RoleToggle from "./RoleToggle";
import { floatingTags } from "../../Utils/content";
import { subscribeEmail } from "../../Services/subscribeService";
import { COLORS, rgba } from "../../Utils/colors";
import { useForm } from 'react-hook-form';
import { useAuthLandingStore } from "../stores/useAuthLandingStore";
import IDBadge from "./IDBadge";
export default function Hero({ role, setRole, data }) {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const navigate = useNavigate();
  const {setData } = useAuthLandingStore();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  // const { scrollYProgress } = useScroll({
  //   target: heroRef,
  //   offset: ["start start", "end start"],
  // });


  
  const onSubmit = (data)=> {
     setData({
      initialEmail: data.email,
      selectedRole: role,
    });
    
    navigate("/register")

      
    
  }

  return (
    <section  className="relative overflow-hidden px-6 pb-28 pt-16 lg:pt-24">
      {floatingTags.map((tag) => (
        <div key={tag.label} {...tag}  />
      ))}

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: rgba(COLORS.steel, 0.5) }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.sky }} />
            <span className="font-mono text-[11px] tracking-[0.15em]" style={{ color: COLORS.ink }}>
              {data?.eyebrow}
            </span>
          </motion.div>

          <div className="mb-6 lg:hidden">
            <RoleToggle role={role} setRole={setRole} />
          </div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={role + "-h1"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: COLORS.ink }}
            >
              {data?.headline[0]}
              <br />
              <span style={{ color: COLORS.steel }}>{data?.headline[1]}</span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={role + "-sub"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-6 max-w-md font-body text-lg leading-relaxed"
              style={{ color: rgba(COLORS.ink, 0.75) }}
            >
              {data?.sub}
            </motion.p>
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
            <div
              className="flex flex-1 items-center gap-2 rounded-full border bg-white px-4 py-3"
              style={{ borderColor: rgba(COLORS.steel, 0.5) }}
            >
              <Mail size={16} style={{ color: COLORS.steel }} />
              <input
                type="email"
                {...register("email", {
                  required: "Ingresa tu email para continuar",
                  pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresa un email valido',
              },
                })}
                placeholder={data?.placeholder}
                className="focus-ring w-full bg-transparent font-body text-sm outline-none"
                style={{ color: COLORS.ink }}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="focus-ring group flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: COLORS.ink }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={role + "-cta"}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  {status === "loading" ? "Enviando..." : data?.ctaLabel}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </motion.span>
              </AnimatePresence>
            </button>
          </form>
          <p className="mt-3 font-mono text-xs" style={{ color: rgba(COLORS.ink, 0.5) }}>
            {status === "done" ? "¡Listo! Te avisamos apenas abramos." : status === "error" ? "Algo falló, probá de nuevo." : data?.ctaSub}
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <IDBadge role={role} />
        </div>
      </div>
    </section>
  );
}
