"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const fadeUp: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export function Wordmark() {
  const reduce = useReducedMotion();
  const initial = reduce ? "visible" : "hidden";

  return (
    <div
      className="relative flex h-full w-full min-w-0 flex-col justify-end overflow-hidden px-5 pb-8 sm:px-10 sm:pb-12 lg:pb-16"
      style={{ containerType: "inline-size" }}
    >
      <motion.p
        custom={0}
        variants={fadeUp}
        initial={initial}
        animate="visible"
        className="mb-4 max-w-[44ch] font-display uppercase tracking-[0.3em] text-white/50 text-xs sm:text-sm"
        style={{ lineHeight: 1.7 }}
      >
        An evening celebrating the creativity, culture, and collective investment shaping the future of Omaha&rsquo;s Old Market.
      </motion.p>
      <div className="flex items-baseline gap-[0.6em] whitespace-nowrap">
        <motion.span
          custom={0}
          variants={fadeUp}
          initial={initial}
          animate="visible"
          className="font-display text-white"
          style={{
            fontSize: "clamp(36px, 10.5cqi, 150px)",
            lineHeight: 0.85,
            letterSpacing: "-0.005em",
          }}
        >
          COLLECTIVE&nbsp;&apos;26
        </motion.span>

        <motion.span
          custom={1}
          variants={fadeUp}
          initial={initial}
          animate="visible"
          className="relative inline-block font-display text-white"
          style={{
            fontSize: "clamp(16px, 4.2cqi, 60px)",
            lineHeight: 0.95,
          }}
        >
          <span className="absolute bottom-full left-0 leading-none">THE</span>
          ARTS
        </motion.span>
      </div>
    </div>
  );
}
