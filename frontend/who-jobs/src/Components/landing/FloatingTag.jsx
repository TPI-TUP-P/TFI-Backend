import React from "react";
import { motion, useTransform } from "framer-motion";
import { COLORS, rgba } from "../../Utils/colors";

const FloatingTag = ({ label, Icon, top, left, right, speed, delay, scrollYProgress, reduce }) => {
  //useTransform controla el movimiento vertical por scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : speed]);

  return (
    <motion.div
      className="absolute hidden select-none items-center gap-1.5 rounded-full border bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur-sm lg:flex"
      style={{ 
        top, 
        left, 
        right, 
        y, // Controlado por el scroll
        borderColor: rgba(COLORS.steel, 0.45) 
      }}
      initial={{ opacity: 0, scale: 0.9 }} // Animación de entrada sin usar 'y'
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <Icon size={13} style={{ color: COLORS.steel }} strokeWidth={2} />
      <span className="font-mono text-[11px] tracking-tight" style={{ color: COLORS.ink }}>
        {label}
      </span>
    </motion.div>
  );
};

export default FloatingTag;
