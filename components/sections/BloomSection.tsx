"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type BloomShape = "lavender" | "chartreuse" | "teal" | "maroon" | "innerMaroon" | "rust";

const SHAPE_FILL: Record<BloomShape, string> = {
  lavender: "var(--color-lavender)",
  chartreuse: "var(--color-chartreuse)",
  teal: "var(--color-teal)",
  maroon: "var(--color-bg-maroon)",
  innerMaroon: "var(--color-inner-maroon)",
  rust: "var(--color-rust)",
};

/**
 * A leading curve at the top of each section that echoes the postcard shape.
 * Renders as an SVG quarter-circle filling the upper portion of the section
 * with the section's color, smoothly meeting the previous section.
 */
function LeadingCurve({ shape, fill }: { shape: BloomShape; fill: string }) {
  if (shape === "maroon") {
    // No curve for the about/wordmark section — it's a clean color block.
    return null;
  }
  // Quarter-circle anchored to the top of the section. Direction of the
  // curve mirrors the corresponding postcard shape.
  const path =
    shape === "lavender" || shape === "innerMaroon"
      ? "M0,0 L100,0 L100,30 C100,13 87,0 50,0 Z"
      : "M0,0 L100,0 L100,0 C50,0 0,13 0,30 Z";
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -top-px left-0 h-[8svh] sm:h-[14svh] w-full"
    >
      <path d={path} fill={fill} />
    </svg>
  );
}

export function BloomSection({
  id,
  shape,
  textColor,
  children,
  contentClassName = "",
  style = {},
}: {
  id: string;
  shape: BloomShape;
  textColor: string; // e.g. "text-white"
  children: ReactNode;
  contentClassName?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);
  const fill = SHAPE_FILL[shape];

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`relative flex min-h-[100svh] w-full items-center justify-center px-5 py-20 sm:px-10 sm:py-24 ${textColor}`}
      style={{ backgroundColor: fill, ...style }}
    >
      <LeadingCurve shape={shape} fill={fill} />
      <motion.div
        style={{ y, opacity }}
        className={`relative z-10 w-full max-w-3xl ${contentClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
