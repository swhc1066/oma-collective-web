"use client";

import { useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

/**
 * Returns the passed variants normally, OR a no-op set if the user has
 * `prefers-reduced-motion: reduce`. Use in any animated component:
 *
 *   const variants = useMotionSafeVariants(fadeUp);
 *
 * This keeps the component tree identical for both motion preferences —
 * we just neutralize the transitions.
 */
export function useMotionSafeVariants(variants: Variants): Variants {
  const prefersReduced = useReducedMotion();
  if (!prefersReduced) return variants;

  // Replace every variant with an opacity-only / instant version.
  const safe: Variants = {};
  for (const key of Object.keys(variants)) {
    safe[key] = { opacity: 1, transition: { duration: 0 } };
  }
  return safe;
}
