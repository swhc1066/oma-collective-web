"use client";

import { motion } from "motion/react";
import { sectionFadeUp } from "@/lib/animations";
import { useMotionSafeVariants } from "@/lib/useMotionSafeVariants";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Drop-in wrapper for any element that should fade up as it enters the
 * viewport. Already handles reduced-motion.
 */
export function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  const variants = useMotionSafeVariants(sectionFadeUp);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
