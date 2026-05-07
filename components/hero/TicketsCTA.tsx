"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { event } from "@/lib/content";

export function TicketsCTA() {
  const { scrollY } = useScroll();
  // Hero is 100svh tall. Transition the CTA from "hero pill" to "sticky header"
  // between 60vh and 100vh of scroll.
  const headerOpacity = useTransform(scrollY, [0, 400, 700], [0, 0, 1]);
  const wordmarkOpacity = useTransform(scrollY, [400, 700], [0, 1]);

  return (
    <>
      {/* sticky header bar — fades in once the hero starts leaving */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: headerOpacity }}
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-14 border-b border-white/15 backdrop-blur-sm"
      />

      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-4 sm:px-6">
        <motion.span
          style={{ opacity: wordmarkOpacity }}
          className="font-display text-sm tracking-wide text-white"
        >
          COLLECTIVE&nbsp;&apos;26
        </motion.span>

        <motion.a
          href={event.ticketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display rounded-full bg-[var(--color-bg-maroon)] px-6 py-3 text-sm tracking-widest text-white transition hover:bg-[var(--color-inner-maroon)] focus-visible:outline-2 focus-visible:outline-white"
        >
          BUY TICKETS →
        </motion.a>
      </header>
    </>
  );
}
