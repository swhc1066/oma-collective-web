"use client";

import { motion } from "motion/react";
import { sectionFadeUp } from "@/lib/animations";
import { useMotionSafeVariants } from "@/lib/useMotionSafeVariants";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  className = "",
}: SectionHeaderProps) {
  const variants = useMotionSafeVariants(sectionFadeUp);

  return (
    <motion.div
      className={`mb-10 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {eyebrow && (
        <p className="font-display text-rust text-sm tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-maroon text-[clamp(2rem,5vw,4rem)]">
        {heading}
      </h2>
    </motion.div>
  );
}
