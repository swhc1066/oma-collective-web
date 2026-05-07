/**
 * Animation variants and easing curves for the site.
 *
 * Philosophy: subtle, choreographed, restrained. No parallax. No scroll-jacking.
 * Always gate behind useReducedMotion() at the component level — never assume
 * motion is OK.
 *
 * If your local Framer Motion / Motion repo has its own preferred variants,
 * replace these. This file is a starting point, not a contract.
 */

import type { Variants, Transition } from "motion/react";

// Easing curves — tuned to feel natural, not bouncy.
export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOutQuart: Transition["ease"] = [0.76, 0, 0.24, 1];

/**
 * Container that staggers its children. Use on a section wrapper to
 * choreograph headline → subhead → CTA reveal.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

/**
 * Fade up from below. Default for paragraphs, headings, and CTAs.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/**
 * Slow drift-in for the large color-block / shape SVGs in the hero.
 * Pair with `transformOrigin` set to the appropriate edge for each shape.
 */
export const shapeDrift: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easeOutExpo },
  },
};

/**
 * Clip-path reveal for headline text. The headline starts hidden behind a
 * vertical clip and is "uncovered" as the shapes settle.
 */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easeInOutQuart, delay: 0.4 },
  },
};

/**
 * Section-on-scroll variant. Use with whileInView + viewport={{ once: true }}.
 */
export const sectionFadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};
