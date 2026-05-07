"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { PostcardSVG } from "./PostcardSVG";
import { HERO_TEXT_POS } from "@/lib/postcard-geometry";

const textIn: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.85 + i * 0.10, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export function PostcardHero() {
  const reduce = useReducedMotion();
  const initial = reduce ? "visible" : "hidden";

  return (
    <section className="relative flex h-[100svh] w-screen items-center justify-center overflow-hidden bg-[var(--color-bg-maroon)]">
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(100vw, calc(100svh * 1.5))",
          height: "min(100svh, calc(100vw / 1.5))",
          containerType: "size",
        }}
      >
        <PostcardSVG />

        <motion.div
          custom={0} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-bg-maroon)]"
          style={{
            ...HERO_TEXT_POS.saveTheDate,
            fontSize: "clamp(10px, 3.1cqh, 30px)",
            lineHeight: 1.2,
          }}
        >
          SAVE<br />THE<br />DATE
        </motion.div>

        <motion.div
          custom={1} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-yellow)]"
          style={{
            ...HERO_TEXT_POS.when,
            fontSize: "clamp(10px, 3.1cqh, 30px)",
            lineHeight: 1.2,
          }}
        >
          SATURDAY<br />
          <span className="block pl-[5.07%]">JUNE</span>
          <span className="block pl-[4.49%]">SIXTH</span>
        </motion.div>

        <motion.div
          custom={2} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-light-teal)]"
          style={{
            ...HERO_TEXT_POS.where,
            fontSize: "clamp(10px, 3.1cqh, 30px)",
            lineHeight: 1.2,
          }}
        >
          KANEKO<br />1111 JONES ST.<br />OMAHA, NE
        </motion.div>

        <div
          className="absolute flex items-baseline gap-[0.9em] whitespace-nowrap"
          style={{
            left: HERO_TEXT_POS.wordmark.left,
            bottom: HERO_TEXT_POS.wordmark.bottom,
          }}
        >
          <motion.span
            custom={3} variants={textIn} initial={initial} animate="visible"
            className="font-display text-[var(--color-white)]"
            style={{
              fontSize: "clamp(36px, 11cqh, 220px)",
              lineHeight: 0.85,
              letterSpacing: "-0.005em",
            }}
          >
            COLLECTIVE&nbsp;&apos;26
          </motion.span>

          <motion.span
            custom={4} variants={textIn} initial={initial} animate="visible"
            className="relative inline-block font-display text-[var(--color-white)]"
            style={{
              fontSize: "clamp(16px, 4.9cqh, 100px)",
              lineHeight: 0.95,
            }}
          >
            <span className="absolute bottom-full left-0 leading-none">THE</span>
            ARTS
          </motion.span>
        </div>

        <motion.div
          custom={5} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-rust)]"
          style={{
            ...HERO_TEXT_POS.supporting,
            fontSize: "clamp(10px, 3.1cqh, 26px)",
            lineHeight: 1.2,
          }}
        >
          SUPPORTING<br />THE OMA
        </motion.div>
      </div>
    </section>
  );
}
