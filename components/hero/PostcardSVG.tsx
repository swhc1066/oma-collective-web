"use client";

import { motion, type Variants } from "motion/react";
import { useReducedMotion } from "motion/react";
import { SHAPE_PATHS } from "@/lib/postcard-geometry";

const shapeVariants: Variants = {
  hidden: { scale: 0.2, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
};
const slideVariants: Variants = {
  hidden: { x: 160, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export function PostcardSVG({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const initial = reduce ? "visible" : "hidden";

  return (
    <svg
      viewBox="0 0 432 288"
      preserveAspectRatio="none"
      className={`absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        x="-10" y="-10" width="452" height="308" fill="#62192e"
        variants={fadeVariants} initial={initial} animate="visible"
      />
      <motion.rect
        x="288" y="-10" width="154" height="308" fill="#016f98"
        variants={slideVariants} initial={initial} animate="visible"
        transition={{ delay: 0.25 }}
      />
      <motion.path
        d={SHAPE_PATHS.lavenderRight} fill="#ceb1ff"
        style={{ transformOrigin: "0px 0px" }}
        variants={shapeVariants} initial={initial} animate="visible"
        transition={{ delay: 0.10 }}
      />
      <motion.path
        d={SHAPE_PATHS.lavenderLeft} fill="#ceb1ff"
        style={{ transformOrigin: "0px 0px" }}
        variants={shapeVariants} initial={initial} animate="visible"
        transition={{ delay: 0.10 }}
      />
      <motion.path
        d={SHAPE_PATHS.chartreuse} fill="#9e9e0e"
        style={{ transformOrigin: "288px 0px" }}
        variants={shapeVariants} initial={initial} animate="visible"
        transition={{ delay: 0.20 }}
      />
      <motion.path
        d={SHAPE_PATHS.innerMaroon} fill="#7a061f"
        style={{ transformOrigin: "288px 288px" }}
        variants={shapeVariants} initial={initial} animate="visible"
        transition={{ delay: 0.45 }}
      />
    </svg>
  );
}
