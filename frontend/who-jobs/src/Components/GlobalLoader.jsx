import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLoaderStore } from './stores/useLoaderStore';

export default function GlobalLoader() {
  const activeRequests = useLoaderStore((state) => state.activeRequests);
  const reduceMotion = useReducedMotion();
  
  // Derivamos el estado booleano para AnimatePresence
  const isLoading = activeRequests > 0;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg"
          role="status"
          aria-live="polite"
          aria-label="Cargando"
        >
          {/* Si ya cargás una tipografía display en tu app, borrá este <style> */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@1,500;1,600&display=swap');
            .font-display { font-family: 'Fraunces', serif; }
          `}</style>

          <div className="absolute w-72 h-72 rounded-full blur-3xl bg-brand-accent/25 pointer-events-none" />

          <div className="relative flex flex-col items-center">
            <svg width="140" height="44" viewBox="0 0 140 44" aria-hidden="true">
              {reduceMotion ? (
                <>
                  <line x1="20" y1="22" x2="120" y2="22" strokeWidth="2" strokeLinecap="round" className="stroke-brand-accent" />
                  <circle cx="20" cy="22" r="7" className="fill-brand-title" />
                  <circle cx="120" cy="22" r="7" className="fill-brand-title" />
                </>
              ) : (
                <>
                  <motion.circle
                    cx="20" cy="22" r="7" fill="none" strokeWidth="2"
                    className="stroke-brand-accent"
                    style={{ transformOrigin: '20px 22px' }}
                    animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <motion.circle
                    cx="120" cy="22" r="7" fill="none" strokeWidth="2"
                    className="stroke-brand-accent"
                    style={{ transformOrigin: '120px 22px' }}
                    animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
                  />
                  <motion.line
                    x1="20" y1="22" x2="120" y2="22" strokeWidth="2" strokeLinecap="round"
                    className="stroke-brand-accent"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.8, times: [0, 0.45, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <circle cx="20" cy="22" r="7" className="fill-brand-title" />
                  <circle cx="120" cy="22" r="7" className="fill-brand-title" />
                </>
              )}
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-5 font-display text-2xl italic text-brand-title"
            >
              Who<span className="text-brand-muted">Jobs</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-2 text-xs tracking-widest uppercase text-brand-muted"
            >
              Conectando
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
