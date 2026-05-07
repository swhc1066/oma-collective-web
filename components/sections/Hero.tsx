"use client";

import { motion } from "motion/react";
import {
  staggerContainer,
  fadeUp,
  shapeDrift,
} from "@/lib/animations";
import { useMotionSafeVariants } from "@/lib/useMotionSafeVariants";
import { event } from "@/lib/content";

/**
 * Hero — recreates the postcard composition with animated SVG shapes.
 *
 * Layout intent (matches the save-the-date postcard):
 *   - Top-left: lavender circle with "SAVE THE DATE" microtype (we'll repurpose
 *     this corner for the date or a small intro).
 *   - Top-right: chartreuse and teal vertical panels with date + venue text.
 *   - Center/bottom: large maroon organic blob with the COLLECTIVE '26 wordmark.
 *   - Bottom-right: rust shape with "Supporting the OMA" callout.
 *
 * IMPORTANT: The shapes below are PLACEHOLDER SVG paths roughly approximating
 * the postcard. Replace with the real vector art exported from the designer's
 * source file. See public/shapes/README.md for the asset spec.
 */
export function Hero() {
  const container = useMotionSafeVariants(staggerContainer);
  const drift = useMotionSafeVariants(shapeDrift);
  const up = useMotionSafeVariants(fadeUp);

  return (
    <section
      aria-label="Collective '26 — Saturday June 6 at Kaneko, Omaha"
      className="relative min-h-screen w-full overflow-hidden bg-cream"
    >
      {/* Animated shape composition. Treat as decoration; real content is
          layered above it with z-index. */}
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={container}
        aria-hidden="true"
      >
        {/* Lavender circle — top left */}
        <motion.div
          variants={drift}
          className="absolute -left-20 -top-20 h-[60vh] w-[60vh] rounded-full bg-lavender"
          style={{ transformOrigin: "top left" }}
        />

        {/* Chartreuse vertical panel */}
        <motion.div
          variants={drift}
          className="absolute right-[20%] top-0 h-[70vh] w-[20vw] bg-chartreuse"
          style={{ transformOrigin: "top center" }}
        />

        {/* Teal vertical panel — far right */}
        <motion.div
          variants={drift}
          className="absolute right-0 top-0 h-[60vh] w-[20vw] bg-teal"
          style={{ transformOrigin: "top right" }}
        />

        {/* Maroon organic blob — dominant center/bottom shape.
            TODO: replace with real SVG path from postcard source. */}
        <motion.svg
          variants={drift}
          viewBox="0 0 800 600"
          className="absolute bottom-0 left-0 h-[80vh] w-[80vw]"
          preserveAspectRatio="xMidYMax meet"
          style={{ transformOrigin: "bottom center" }}
        >
          <path
            d="M 100 600 Q 100 200 350 200 Q 600 200 600 50 L 800 50 L 800 600 Z"
            fill="var(--color-maroon)"
          />
        </motion.svg>

        {/* Rust shape — bottom right */}
        <motion.div
          variants={drift}
          className="absolute bottom-0 right-0 h-[40vh] w-[35vw] bg-rust"
          style={{
            transformOrigin: "bottom right",
            clipPath: "ellipse(80% 100% at 100% 100%)",
          }}
        />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 py-10 md:px-12 md:py-16"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* Top row: save-the-date marker + date/venue stack */}
        <div className="flex items-start justify-between gap-8">
          <motion.div variants={up} className="text-ink">
            <p className="font-display text-sm tracking-wider md:text-base">
              Save
              <br />
              The
              <br />
              Date
            </p>
          </motion.div>

          <motion.div
            variants={up}
            className="flex gap-8 font-display text-cream"
          >
            <div className="text-right text-sm md:text-base">
              {event.date.weekdayParts.map((p) => (
                <div key={p}>{p}</div>
              ))}
            </div>
            <div className="text-right text-sm md:text-base">
              <div>{event.venue.name}</div>
              <div>{event.venue.addressLine1}</div>
              <div>{event.venue.addressLine2}</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: wordmark + supporting line + CTA */}
        <div className="flex flex-col gap-6">
          <motion.h1
            variants={up}
            className="font-display text-cream text-[clamp(3.5rem,12vw,12rem)] leading-none"
          >
            {event.name}{" "}
            <span className="text-cream/90 text-[0.5em] align-top">
              {event.tagline}
            </span>
          </motion.h1>

          <motion.div
            variants={up}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="font-display text-rust text-lg md:text-xl">
              {event.beneficiary}
            </p>

            <a
              href={event.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-3 font-display text-lg text-maroon transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cream focus:ring-offset-2 focus:ring-offset-maroon"
            >
              Buy Tickets
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
