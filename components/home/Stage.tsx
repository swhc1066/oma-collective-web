"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { Wordmark } from "./Wordmark";
import { CurveOverlay } from "./CurveOverlay";
import { BARS, getBar, nextSection, type SectionId } from "./bars";
import { SectionBody } from "./sections";

const barEnter: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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

  // Lock body scroll behind the open overlay.
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
      {/* HOME GRID — fades out when a section is active */}
      <motion.div
        aria-hidden={active ? "true" : undefined}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="grid h-full grid-rows-[1fr_auto] lg:grid-cols-[7fr_3fr] lg:grid-rows-1"
        style={{ pointerEvents: active ? "none" : undefined }}
      >
        <Wordmark />

        <div className="relative">
          <nav
            aria-label="Sections"
            className="relative grid h-full grid-cols-5 lg:grid-cols-1 lg:grid-rows-5"
          >
            {BARS.map((bar, i) => {
              // While any section is open, suppress the home-grid bars so
              // their layoutIds don't collide with the next-link circle's
              // (which uses the same `bar-${id}` layoutId for the morph).
              if (active) {
                return <div key={bar.id} aria-hidden="true" />;
              }
              return (
                <motion.button
                  key={bar.id}
                  layoutId={`bar-${bar.id}`}
                  onClick={() => setActive(bar.id)}
                  custom={i}
                  variants={barEnter}
                  initial={reduce ? "visible" : "hidden"}
                  animate="visible"
                  className={`group relative flex items-start justify-start p-4 sm:p-5 lg:p-6 ${bar.fg} font-display tracking-widest hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/70`}
                  style={{ backgroundColor: bar.bg }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="flex flex-col text-left leading-[1.05] text-xs sm:text-sm md:text-base lg:text-lg">
                    {bar.label.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </motion.button>
              );
            })}
          </nav>
          <CurveOverlay />
        </div>
      </motion.div>

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

            <div className="flex min-h-full items-center justify-center px-6 py-20 sm:px-10 sm:py-24">
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className={`w-full max-w-3xl text-center ${getBar(active).fg}`}
              >
                <SectionBody id={active} />
              </motion.div>
            </div>

            {/* NEXT-SECTION QUARTER-CIRCLE LINK (bottom-right).
                Sequence per click:
                  1. layoutId morphs the circle to fill the new section (~0.8s)
                  2. New section copy fades in (delay 0.85s)
                  3. New next-circle fades in (delay 1.5s) */}
            {(() => {
              const nextId = nextSection(active);
              const next = getBar(nextId);
              return (
                <motion.button
                  key={`next-${active}`}
                  layoutId={`bar-${nextId}`}
                  onClick={() => setActive(nextId)}
                  aria-label={`Go to ${next.label.join(" ")}`}
                  className={`fixed bottom-0 right-0 z-20 overflow-hidden font-display tracking-widest hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/70 ${next.fg}`}
                  style={{
                    backgroundColor: next.bg,
                    width: "min(23svh, 30vw)",
                    height: "min(23svh, 30vw)",
                    borderTopLeftRadius: "100%",
                  }}
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    opacity: { delay: 1.5, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
                  }}
                >
                  {/* Center the label in the visible quarter-disc area
                      (bottom-right quadrant of the bounding square). */}
                  <span className="pointer-events-none absolute bottom-0 right-0 flex h-1/2 w-1/2 items-center justify-center">
                    <span className="flex flex-col items-center text-center text-sm sm:text-base md:text-lg leading-[1.05]">
                      {next.label.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </span>
                  </span>
                </motion.button>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
