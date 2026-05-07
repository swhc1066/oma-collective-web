/**
 * Five nav bars on the home grid. Each is a clickable section.
 * Order matches docs/design/oma-collective-site-v2.svg (top to bottom).
 */

export type SectionId = "tickets" | "event" | "show" | "venue" | "oma";

export interface BarConfig {
  id: SectionId;
  label: string;       // shown on the bar
  bg: string;          // CSS background color
  fg: string;          // tailwind text-color class for label + content
  accent: string;      // tailwind text-color class for the eyebrow accent
}

export const BARS: BarConfig[] = [
  {
    id: "tickets",
    label: "BUY YOUR TICKETS",
    bg: "var(--color-rust)",
    fg: "text-[var(--color-bg-maroon)]",
    accent: "text-white",
  },
  {
    id: "event",
    label: "THE EVENT",
    bg: "var(--color-lavender)",
    fg: "text-[var(--color-bg-maroon)]",
    accent: "text-[var(--color-rust)]",
  },
  {
    id: "show",
    label: "RUN OF SHOW",
    bg: "var(--color-chartreuse)",
    fg: "text-[var(--color-bg-maroon)]",
    accent: "text-[var(--color-yellow)]",
  },
  {
    id: "venue",
    label: "THE VENUE",
    bg: "var(--color-teal)",
    fg: "text-[var(--color-light-teal)]",
    accent: "text-white",
  },
  {
    id: "oma",
    label: "ABOUT THE OMA",
    bg: "var(--color-inner-maroon)",
    fg: "text-white",
    accent: "text-[var(--color-rust)]",
  },
];

export function getBar(id: SectionId): BarConfig {
  const bar = BARS.find((b) => b.id === id);
  if (!bar) throw new Error(`Unknown section id: ${id}`);
  return bar;
}
