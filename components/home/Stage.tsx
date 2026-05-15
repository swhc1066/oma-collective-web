"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { Wordmark } from "./Wordmark";
import { CurveOverlay } from "./CurveOverlay";
import { BARS, getBar, nextSection, prevSection, type SectionId } from "./bars";
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

  // Keyboard nav while a section is open: Esc closes, ←/→ moves between sections.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") setActive(nextSection(active));
      else if (e.key === "ArrowLeft") setActive(prevSection(active));
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
        className="grid h-full grid-rows-[30%_70%] lg:grid-cols-[70%_30%] lg:grid-rows-1"
        style={{ pointerEvents: active ? "none" : undefined }}
      >
        <Wordmark />

        <div className="relative">
          <nav
            aria-label="Sections"
            className="relative grid h-full grid-cols-1 grid-rows-5"
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
                  <span className="flex translate-y-[8px] flex-col text-left leading-[1.05] text-xs sm:text-sm md:text-base lg:text-lg">
                    {bar.mobileLabel && (
                      <span className="flex flex-col sm:hidden">
                        {bar.mobileLabel.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    )}
                    <span className={`flex flex-col ${bar.mobileLabel ? "hidden sm:flex" : ""}`}>
                      {bar.label.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </nav>
          {/* Curve decorations hidden for now — re-enable when ready. */}
          {false && <CurveOverlay />}
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
              className="fixed right-4 top-4 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-black/15 text-white transition hover:bg-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
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
                className={`w-full max-w-3xl text-left ${getBar(active).fg}`}
              >
                <SectionBody id={active} />
              </motion.div>
            </div>

            {/* NEXT-SECTION QUARTER-CIRCLE LINK (bottom-right).
                Sequence per click:
                  1. layoutId morphs the circle to fill the new section (~0.8s)
                  2. New section copy fades in (delay 0.85s)
                  3. New next-circle fades in (delay ~1s) */}
            {(() => {
              const nextId = nextSection(active);
              const next = getBar(nextId);
              const cornerLines = next.quarterCircleLabel ?? null;
              const ariaTarget = cornerLines ?? next.label;
              return (
                <motion.button
                  key={`next-${active}`}
                  layoutId={`bar-${nextId}`}
                  onClick={() => setActive(nextId)}
                  aria-label={`Go to ${ariaTarget.join(" ")}`}
                  className={`fixed bottom-0 right-0 z-20 cursor-pointer overflow-hidden font-display tracking-widest w-[min(17.9svh,23vw)] h-[min(17.9svh,23vw)] sm:w-[min(28svh,36vw,200px)] sm:h-[min(28svh,36vw,200px)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white/70 ${next.fg}`}
                  style={{
                    backgroundColor: next.bg,
                    borderTopLeftRadius: "100%",
                  }}
                  initial={
                    reduce
                      ? false
                      : { clipPath: "circle(0% at 100% 100%)" }
                  }
                  animate={{ clipPath: "circle(150% at 100% 100%)" }}
                  transition={{
                    layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    clipPath: { delay: 1.0, duration: 1.0, ease: [0.4, 0, 0.2, 1] },
                  }}
                >
                  {/* Centered at the visual centroid of a bottom-right
                      quarter-disc (~42% inset from each adjacent edge). */}
                  <motion.span
                    className="pointer-events-none absolute z-10 flex flex-row items-center gap-1 sm:gap-1.5 text-left text-sm sm:text-base md:text-lg leading-[1.05]"
                    style={{
                      bottom: "42%",
                      right: "42%",
                      transform: "translate(50%, calc(50% + 8px))",
                    }}
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.4 }}
                  >
                    <span className="flex min-w-0 flex-col items-start">
                      {cornerLines ? (
                        cornerLines.map((line) => (
                          <span key={line} className="block">{line}</span>
                        ))
                      ) : (
                        <>
                          {next.mobileLabel && (
                            <span className="flex flex-col sm:hidden">
                              {next.mobileLabel.map((line) => (
                                <span key={line} className="block">{line}</span>
                              ))}
                            </span>
                          )}
                          <span className={`flex flex-col ${next.mobileLabel ? "hidden sm:flex" : ""}`}>
                            {next.label.map((line) => (
                              <span key={line} className="block">{line}</span>
                            ))}
                          </span>
                        </>
                      )}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 md:h-7 md:w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </motion.span>
                </motion.button>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
