"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { Wordmark } from "./Wordmark";
import { BARS, getBar, type SectionId } from "./bars";
import { SectionBody } from "./sections";

const barEnter: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Stage() {
  const [active, setActive] = useState<SectionId | null>(null);
  const reduce = useReducedMotion();

  // Esc closes the active section.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Lock scroll behind the open overlay.
  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [active]);

  return (
    <main className="relative h-[100svh] w-screen overflow-hidden bg-[var(--color-bg-maroon)]">
      {/* HOME GRID */}
      <div
        aria-hidden={active ? "true" : undefined}
        className="grid h-full grid-rows-[1fr_auto] lg:grid-cols-[1fr_22rem] lg:grid-rows-1"
      >
        <Wordmark />

        <nav
          aria-label="Sections"
          className="grid grid-cols-5 lg:grid-cols-1 lg:grid-rows-5"
        >
          {BARS.map((bar, i) => {
            // Hide the active bar in the grid so it doesn't render alongside
            // the overlay (motion's layoutId animates between the two).
            if (active === bar.id) return <div key={bar.id} aria-hidden="true" />;
            return (
              <motion.button
                key={bar.id}
                layoutId={`bar-${bar.id}`}
                onClick={() => setActive(bar.id)}
                custom={i}
                variants={barEnter}
                initial={reduce ? "visible" : "hidden"}
                animate="visible"
                className={`group relative flex items-end justify-center px-2 py-4 sm:px-4 sm:py-5 lg:items-center lg:justify-start lg:px-6 ${bar.fg} font-display tracking-widest hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/70`}
                style={{ backgroundColor: bar.bg }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-center lg:text-left leading-tight">
                  {bar.label}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* SECTION OVERLAY */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            layoutId={`bar-${active}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="section-heading"
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: getBar(active).bg }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close section"
              className="fixed right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-black/15 text-white transition hover:bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className={`mx-auto w-full max-w-3xl px-6 py-20 sm:px-10 sm:py-24 ${getBar(active).fg}`}
            >
              <SectionBody id={active} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
