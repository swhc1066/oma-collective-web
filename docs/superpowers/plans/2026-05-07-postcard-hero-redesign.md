# Postcard Hero Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current site with a pixel-perfect web recreation of the
Collective '26 save-the-date postcard as the hero, plus five scroll-bloom
sections each themed to one of the postcard's color shapes, plus a persistent
"Buy Tickets" CTA.

**Architecture:** A single Next.js page composed of one `PostcardHero`
component (inlined SVG with absolutely-positioned text overlays + on-load
animation), one `TicketsCTA` (fixed top-right, transforms into a sticky header
post-scroll), and five `BloomSection` instances driven by scroll position via
Motion's `useScroll` + `useTransform`. The page is server-rendered; only the
animated parts are client components.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4
(`@theme` tokens in `app/globals.css`), Motion 12 (`motion/react`), Adobe
Fonts (`dazzle-unicase-bold`, weight 500).

**Spec reference:** `docs/superpowers/specs/2026-05-07-postcard-hero-redesign-design.md`.

---

## File map

**Created:**
- `components/hero/PostcardHero.tsx` — the postcard recreation + load animation
- `components/hero/PostcardSVG.tsx` — inlined SVG shapes only, no text
- `components/hero/TicketsCTA.tsx` — persistent CTA + sticky header
- `components/sections/BloomSection.tsx` — scroll-bloom wrapper primitive
- `components/sections/SaveTheDate.tsx`
- `components/sections/Schedule.tsx`
- `components/sections/Venue.tsx`
- `components/sections/AboutWordmark.tsx`
- `components/sections/SupportingOMA.tsx`
- `lib/postcard-geometry.ts` — shared shape constants (sizes, origins)

**Modified:**
- `app/globals.css` — replace palette, swap font tokens to Dazzle Unicase
- `app/layout.tsx` — load Adobe Fonts CSS, drop Bebas Neue, keep Inter
- `app/page.tsx` — new section composition
- `lib/content.ts` — add hero/section copy keys; remove ticket-tier scaffold
- `CLAUDE.md` — update palette, fonts, animation notes

**Deleted (replaced by new components):**
- `components/sections/Hero.tsx`
- `components/sections/About.tsx`
- `components/sections/EventDetails.tsx`
- `components/sections/OmaMission.tsx`
- `components/sections/Tickets.tsx`
- `components/sections/Sponsors.tsx`
- `components/sections/Footer.tsx` *(to be re-added in a follow-up if needed)*
- `components/ui/SectionHeader.tsx`
- `components/motion/FadeUp.tsx` *(replaced by inline Motion variants)*
- `lib/animations.ts` *(superseded; motion variants live with components now)*

---

## Task 1: Update color palette and font tokens in `globals.css`

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `@theme` block**

Replace the existing `@theme` block in `app/globals.css` with:

```css
@theme {
  /* Brand palette — locked from docs/design/oma-collective-background.svg */
  --color-bg-maroon: #62192e;     /* postcard base, dominant brand color */
  --color-inner-maroon: #7a061f;  /* the bottom-right quarter circle */
  --color-teal: #016f98;          /* top-right block; Venue section */
  --color-lavender: #ceb1ff;      /* top-left circle; Save the Date */
  --color-chartreuse: #9e9e0e;    /* top-middle circle; Schedule */
  --color-rust: #ef5518;          /* "Supporting the OMA" callout */
  --color-yellow: #e5e142;        /* SAT/JUNE/SIXTH headline */
  --color-light-teal: #b5d1ca;    /* KANEKO address text */
  --color-white: #ffffff;

  /* Typography */
  --font-display: "dazzle-unicase-bold", "Inter", system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, -apple-system, sans-serif;

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-text: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

- [ ] **Step 2: Replace body and base styles**

Replace everything below `@theme { ... }` with:

```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  background-color: var(--color-bg-maroon);
  color: var(--color-white);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.font-display, h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: 0.01em;
  line-height: 1.0;
  text-transform: uppercase;
}

::selection {
  background-color: var(--color-chartreuse);
  color: var(--color-bg-maroon);
}
```

- [ ] **Step 3: Verify dev server compiles**

Run: `npm run dev`
Expected: server starts on :3000 with no Tailwind/PostCSS errors. Visit page; existing components will be ugly (still using old class names). That's fine — they'll be replaced.
Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: lock palette + display font from postcard SVG"
```

---

## Task 2: Wire Adobe Fonts and drop Bebas Neue in `layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

Full file content:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collective '26 — Old Market Association of Omaha",
  description:
    "Saturday, June 6, 2026 at Kaneko. A fundraising dinner supporting the Old Market Association of Omaha.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Collective '26 — Supporting the Arts",
    description:
      "Saturday, June 6 · Kaneko · Omaha. A fundraising dinner benefiting the Old Market Association.",
    url: "https://example.com",
    siteName: "Old Market Association of Omaha",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collective '26 — Supporting the Arts",
    description:
      "Saturday, June 6 · Kaneko · Omaha.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bug3big.css" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run dev server, verify font loads**

Run: `npm run dev`. Open `http://localhost:3000`. Open DevTools → Network → filter `typekit`. Confirm the kit CSS loads with `200`.
Stop server.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load dazzle-unicase from Adobe Fonts; drop Bebas Neue"
```

---

## Task 3: Create shared geometry constants

**Files:**
- Create: `lib/postcard-geometry.ts`

- [ ] **Step 1: Write the file**

```ts
/**
 * Geometry of the postcard, used by PostcardHero and BloomSection.
 *
 * Source: docs/design/oma-collective-background.svg
 * SVG viewBox is 432 x 288 (3:2). All shape paths and percent-based text
 * positions below are derived directly from that file.
 */

export const POSTCARD_VIEWBOX = { w: 432, h: 288 } as const;
export const POSTCARD_RATIO = POSTCARD_VIEWBOX.w / POSTCARD_VIEWBOX.h; // 1.5

export const SHAPE_PATHS = {
  lavenderRight:
    "M0-144.06V143.94C79.53,143.94,144,79.47,144-.06S79.53-144.06,0-144.06Z",
  lavenderLeft:
    "M0-144.06V143.94C-79.52,143.94-143.99,79.47-143.99-.06S-79.52-144.06,0-144.06Z",
  chartreuse:
    "M287.96-143.92V144.08C208.43,144.08,143.96,79.61,143.96.08s64.47-144,144-144Z",
  innerMaroon:
    "M288,144.08v288c79.53,0,144-64.47,144-144s-64.47-144-144-144Z",
} as const;

/**
 * Hero text overlay positions, expressed as percent of postcard width/height.
 * Derived from the SVG <text> coords (e.g. x=16/432 = 3.7%).
 */
export const HERO_TEXT_POS = {
  saveTheDate:  { left: "3.7%",  top: "5.5%"  },
  when:         { left: "53.4%", top: "5.5%"  },
  where:        { left: "70.4%", top: "5.5%"  },
  wordmark:     { left: "3.7%",  bottom: "4.6%" },
  arts:         { left: "58.7%", top: "84%"   },
  supporting:   { left: "70.4%", top: "88.5%" },
} as const;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/postcard-geometry.ts
git commit -m "feat: extract postcard geometry constants"
```

---

## Task 4: Build `PostcardSVG` component

**Files:**
- Create: `components/hero/PostcardSVG.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/hero/PostcardSVG.tsx
git commit -m "feat: PostcardSVG with on-load shape animation"
```

---

## Task 5: Build `PostcardHero` with text overlays

**Files:**
- Create: `components/hero/PostcardHero.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
          width: "min(96vw, calc(94svh * 1.5))",
          aspectRatio: "432 / 288",
          containerType: "size",
        }}
      >
        <PostcardSVG />

        <motion.div
          custom={0} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-bg-maroon)]"
          style={{
            ...HERO_TEXT_POS.saveTheDate,
            fontSize: "clamp(10px, 3.1cqh, 34px)",
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
            fontSize: "clamp(10px, 3.1cqh, 34px)",
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
            fontSize: "clamp(10px, 3.1cqh, 34px)",
            lineHeight: 1.2,
          }}
        >
          KANEKO<br />1111 JONES ST.<br />OMAHA, NE
        </motion.div>

        <motion.div
          custom={3} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display whitespace-nowrap text-[var(--color-white)]"
          style={{
            ...HERO_TEXT_POS.wordmark,
            fontSize: "clamp(48px, 11cqh, 220px)",
            lineHeight: 0.85,
            letterSpacing: "-0.005em",
          }}
        >
          COLLECTIVE&nbsp;&apos;26
        </motion.div>

        <motion.div
          custom={4} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-white)]"
          style={{
            ...HERO_TEXT_POS.arts,
            fontSize: "clamp(20px, 7.5cqh, 100px)",
            lineHeight: 0.95,
          }}
        >
          <span className="block">THE</span>
          <span className="block">ARTS</span>
        </motion.div>

        <motion.div
          custom={5} variants={textIn} initial={initial} animate="visible"
          className="absolute font-display text-[var(--color-rust)]"
          style={{
            ...HERO_TEXT_POS.supporting,
            fontSize: "clamp(10px, 3.1cqh, 30px)",
            lineHeight: 1.2,
          }}
        >
          SUPPORTING<br />THE OMA
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into `app/page.tsx` temporarily for visual check**

Replace `app/page.tsx` with:

```tsx
import { PostcardHero } from "@/components/hero/PostcardHero";

export default function Page() {
  return (
    <main>
      <PostcardHero />
    </main>
  );
}
```

- [ ] **Step 3: Visual check**

Run: `npm run dev`. Open `http://localhost:3000`. Confirm:
- The postcard renders pixel-faithful to `docs/design/oma-collective-background-text.svg`
- Shapes animate in (lavender → chartreuse → teal slides from right → inner-maroon)
- Text fades up after shapes complete
- Whole sequence is ~1.5s
- Reload with DevTools → "Emulate prefers-reduced-motion: reduce" — page renders fully without animation

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/hero/PostcardHero.tsx app/page.tsx
git commit -m "feat: PostcardHero with text overlays and load animation"
```

---

## Task 6: Build `TicketsCTA` (persistent + sticky-on-scroll)

**Files:**
- Create: `components/hero/TicketsCTA.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-12 border-b border-white/15 backdrop-blur-sm"
      />

      <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between px-4 sm:px-6">
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
          className="font-display rounded-full bg-[var(--color-bg-maroon)] px-4 py-2 text-xs tracking-widest text-white ring-1 ring-white/20 transition hover:bg-[var(--color-inner-maroon)] focus-visible:outline-2 focus-visible:outline-white"
        >
          BUY TICKETS →
        </motion.a>
      </header>
    </>
  );
}
```

- [ ] **Step 2: Mount in page**

Replace `app/page.tsx` with:

```tsx
import { PostcardHero } from "@/components/hero/PostcardHero";
import { TicketsCTA } from "@/components/hero/TicketsCTA";

export default function Page() {
  return (
    <main>
      <TicketsCTA />
      <PostcardHero />
    </main>
  );
}
```

- [ ] **Step 3: Visual check**

Run: `npm run dev`. Confirm:
- After ~1.6s, "BUY TICKETS →" pill appears top-right over the hero
- The wordmark and header backdrop are invisible until you scroll
- Add 2000px of placeholder scroll for testing: in DevTools, run `document.querySelector("main").style.minHeight = "300vh"`. Scroll. Confirm the header backdrop and `COLLECTIVE '26` mini-wordmark fade in.
- Hovering the pill darkens it.

Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/hero/TicketsCTA.tsx app/page.tsx
git commit -m "feat: TicketsCTA persistent pill + sticky-on-scroll header"
```

---

## Task 7: Build `BloomSection` primitive

**Files:**
- Create: `components/sections/BloomSection.tsx`

The bloom is a full-viewport section whose background is one of the postcard
shapes scaled to fill the screen. As the section enters the viewport, the
shape scales from its postcard-sized footprint at the top of the section to
fill the section. Because each section is 100svh and uses its color as
solid background, the "shape" is mostly conceptual — what we actually animate
is the section's text content sliding/fading in, and a leading SVG curve at
the section's top edge that mirrors the postcard shape.

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type BloomShape = "lavender" | "chartreuse" | "teal" | "maroon" | "innerMaroon";

const SHAPE_FILL: Record<BloomShape, string> = {
  lavender: "var(--color-lavender)",
  chartreuse: "var(--color-chartreuse)",
  teal: "var(--color-teal)",
  maroon: "var(--color-bg-maroon)",
  innerMaroon: "var(--color-inner-maroon)",
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
      className="absolute -top-px left-0 h-[14svh] w-full"
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
      className={`relative flex min-h-[100svh] w-full items-center justify-center px-6 py-24 sm:px-10 ${textColor}`}
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/BloomSection.tsx
git commit -m "feat: BloomSection primitive for scroll-driven sections"
```

---

## Task 8: Build the five content sections

**Files:**
- Create: `components/sections/SaveTheDate.tsx`
- Create: `components/sections/Schedule.tsx`
- Create: `components/sections/Venue.tsx`
- Create: `components/sections/AboutWordmark.tsx`
- Create: `components/sections/SupportingOMA.tsx`

- [ ] **Step 1: Write `SaveTheDate.tsx`**

```tsx
import { BloomSection } from "./BloomSection";
import { event } from "@/lib/content";

export function SaveTheDate() {
  return (
    <BloomSection
      id="save-the-date"
      shape="lavender"
      textColor="text-[var(--color-bg-maroon)]"
    >
      <p className="font-display text-sm tracking-[0.3em]">SAVE THE DATE</p>
      <h2 id="save-the-date-heading" className="mt-6 font-display text-6xl sm:text-8xl">
        {event.date.weekdayParts.join(" ")}
      </h2>
      <p className="mt-8 max-w-prose text-base sm:text-lg leading-relaxed">
        Mark your calendar. {event.name} arrives at {event.venue.name}, {event.venue.addressLine2}.
      </p>
    </BloomSection>
  );
}
```

- [ ] **Step 2: Write `Schedule.tsx`**

```tsx
import { BloomSection } from "./BloomSection";
import { event } from "@/lib/content";

export function Schedule() {
  return (
    <BloomSection
      id="schedule"
      shape="chartreuse"
      textColor="text-[var(--color-bg-maroon)]"
    >
      <p className="font-display text-sm tracking-[0.3em]">THE EVENING</p>
      <h2 id="schedule-heading" className="mt-6 font-display text-6xl sm:text-8xl">
        Run of show
      </h2>
      <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 text-lg">
        <dt className="font-display tracking-widest">{event.time.doors}</dt>
        <dd>Doors &amp; cocktails</dd>
        <dt className="font-display tracking-widest">{event.time.dinner}</dt>
        <dd>Seated dinner</dd>
        <dt className="font-display tracking-widest">{event.time.program}</dt>
        <dd>Program &amp; remarks</dd>
      </dl>
    </BloomSection>
  );
}
```

- [ ] **Step 3: Write `Venue.tsx`**

```tsx
import { BloomSection } from "./BloomSection";
import { event } from "@/lib/content";

export function Venue() {
  return (
    <BloomSection id="venue" shape="teal" textColor="text-[var(--color-light-teal)]">
      <p className="font-display text-sm tracking-[0.3em] text-white">THE VENUE</p>
      <h2 id="venue-heading" className="mt-6 font-display text-6xl sm:text-8xl text-white">
        {event.venue.name}
      </h2>
      <address className="mt-6 not-italic text-lg">
        {event.venue.addressLine1}<br />
        {event.venue.addressLine2}
      </address>
      <div className="mt-10 flex gap-6 text-sm">
        <a className="underline underline-offset-4 hover:text-white" href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          Get directions →
        </a>
        <a className="underline underline-offset-4 hover:text-white" href={event.venue.website} target="_blank" rel="noopener noreferrer">
          About Kaneko →
        </a>
      </div>
    </BloomSection>
  );
}
```

- [ ] **Step 4: Write `AboutWordmark.tsx`**

```tsx
import { BloomSection } from "./BloomSection";
import { about, event } from "@/lib/content";

export function AboutWordmark() {
  return (
    <BloomSection id="about" shape="maroon" textColor="text-white">
      <h2 id="about-heading" className="font-display text-[14vw] leading-[0.85] tracking-tight sm:text-[12vw]">
        COLLECTIVE&nbsp;&apos;26
      </h2>
      <p className="mt-2 font-display text-2xl tracking-widest sm:text-3xl">
        {event.tagline.toUpperCase()}
      </p>
      <p className="mt-10 max-w-prose text-base sm:text-lg leading-relaxed">
        {about.paragraph}
      </p>
    </BloomSection>
  );
}
```

- [ ] **Step 5: Write `SupportingOMA.tsx`**

```tsx
import { BloomSection } from "./BloomSection";
import { mission, event } from "@/lib/content";

export function SupportingOMA() {
  return (
    <BloomSection id="supporting-oma" shape="innerMaroon" textColor="text-white">
      <p className="font-display text-sm tracking-[0.3em] text-[var(--color-rust)]">
        SUPPORTING THE OMA
      </p>
      <h2 id="supporting-oma-heading" className="mt-6 font-display text-5xl sm:text-7xl">
        {mission.heading}
      </h2>
      <div className="mt-8 max-w-prose space-y-5 text-base sm:text-lg leading-relaxed">
        {mission.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <a
        href={event.ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-block rounded-full bg-[var(--color-rust)] px-8 py-4 font-display text-base tracking-widest text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white"
      >
        BUY TICKETS →
      </a>
    </BloomSection>
  );
}
```

- [ ] **Step 6: Type-check all sections**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/sections/SaveTheDate.tsx components/sections/Schedule.tsx components/sections/Venue.tsx components/sections/AboutWordmark.tsx components/sections/SupportingOMA.tsx
git commit -m "feat: five bloom sections (Save the Date, Schedule, Venue, About, Supporting)"
```

---

## Task 9: Compose final `page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the final page**

```tsx
import { PostcardHero } from "@/components/hero/PostcardHero";
import { TicketsCTA } from "@/components/hero/TicketsCTA";
import { SaveTheDate } from "@/components/sections/SaveTheDate";
import { Schedule } from "@/components/sections/Schedule";
import { Venue } from "@/components/sections/Venue";
import { AboutWordmark } from "@/components/sections/AboutWordmark";
import { SupportingOMA } from "@/components/sections/SupportingOMA";

export default function Page() {
  return (
    <main>
      <TicketsCTA />
      <PostcardHero />
      <SaveTheDate />
      <Schedule />
      <Venue />
      <AboutWordmark />
      <SupportingOMA />
    </main>
  );
}
```

- [ ] **Step 2: Visual review**

Run: `npm run dev`. Open `http://localhost:3000`. Confirm:
- Hero loads animated, postcard pixel-perfect
- "BUY TICKETS →" appears top-right after load
- Scroll: Save the Date (lavender) → Schedule (chartreuse) → Venue (teal) → About (maroon, big wordmark) → Supporting OMA (inner-maroon w/ rust accents)
- Each section's text fades up on entry
- Sticky header with mini-wordmark visible once past hero
- Backwards scroll reverses cleanly
- Toggle reduced-motion in DevTools — full page renders without animation

Stop server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose final page with hero + 5 bloom sections"
```

---

## Task 10: Refresh `lib/content.ts`

**Files:**
- Modify: `lib/content.ts`

- [ ] **Step 1: Replace with trimmed schema**

```ts
/**
 * Single source of truth for all event copy.
 * Edit values here rather than hunting through component JSX.
 */

export const event = {
  name: "Collective '26",
  tagline: "The Arts",
  beneficiary: "Supporting the OMA",
  date: {
    full: "Saturday, June 6, 2026",
    short: "June 6, 2026",
    iso: "2026-06-06",
    weekdayParts: ["Saturday", "June", "Sixth"],
  },
  time: {
    doors: "6:00 PM",
    dinner: "7:00 PM",
    program: "8:30 PM",
  },
  venue: {
    name: "Kaneko",
    addressLine1: "1111 Jones St.",
    addressLine2: "Omaha, NE",
    mapsUrl: "https://maps.google.com/?q=Kaneko+1111+Jones+St+Omaha+NE",
    website: "https://thekaneko.org",
  },
  ticketsUrl:
    process.env.NEXT_PUBLIC_TICKETS_URL ?? "#tickets-not-configured",
} as const;

export const about = {
  // PLACEHOLDER — replace with real event description from OMA board.
  paragraph:
    "Collective '26 is an evening of food, art, and community at Kaneko, gathering Old Market supporters, neighbors, and friends to celebrate the creative life of one of Omaha's most iconic neighborhoods.",
} as const;

export const mission = {
  // PLACEHOLDER — replace with real OMA mission copy from OMA board.
  heading: "About the Old Market Association",
  paragraphs: [
    "The Old Market Association is a nonprofit dedicated to preserving, promoting, and strengthening Omaha's Old Market — the historic district that has anchored the city's cultural identity for generations.",
    "Funds raised at Collective '26 directly support the OMA's work to keep the district vibrant: public art, neighborhood programming, small business advocacy, and the people who make the Old Market what it is.",
  ],
} as const;

export const oma = {
  legalName: "Old Market Association of Omaha",
  email: "info@oldmarketassociation.org",
  ein: "00-0000000",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors. (Removing `ticketTiers` is safe because no remaining code references it after Task 11 cleanup.)

- [ ] **Step 3: Commit**

```bash
git add lib/content.ts
git commit -m "refactor: trim content schema to match new section layout"
```

---

## Task 11: Delete superseded files

**Files:**
- Delete: `components/sections/Hero.tsx`, `About.tsx`, `EventDetails.tsx`, `OmaMission.tsx`, `Tickets.tsx`, `Sponsors.tsx`, `Footer.tsx`
- Delete: `components/ui/SectionHeader.tsx`
- Delete: `components/motion/FadeUp.tsx`
- Delete: `lib/animations.ts`, `lib/useMotionSafeVariants.ts`

- [ ] **Step 1: Confirm nothing else imports them**

Run:
```bash
grep -rn "from \"@/components/sections/\(Hero\|About\|EventDetails\|OmaMission\|Tickets\|Sponsors\|Footer\)\"" . --include='*.tsx' --include='*.ts' --exclude-dir=node_modules --exclude-dir=.next
grep -rn "from \"@/components/\(motion/FadeUp\|ui/SectionHeader\)\"" . --include='*.tsx' --include='*.ts' --exclude-dir=node_modules --exclude-dir=.next
grep -rn "from \"@/lib/\(animations\|useMotionSafeVariants\)\"" . --include='*.tsx' --include='*.ts' --exclude-dir=node_modules --exclude-dir=.next
```

Expected: no results from any of the three.

- [ ] **Step 2: Delete the files**

```bash
git rm components/sections/Hero.tsx components/sections/About.tsx components/sections/EventDetails.tsx components/sections/OmaMission.tsx components/sections/Tickets.tsx components/sections/Sponsors.tsx components/sections/Footer.tsx
git rm components/ui/SectionHeader.tsx
git rm components/motion/FadeUp.tsx
git rm lib/animations.ts lib/useMotionSafeVariants.ts
rmdir components/ui components/motion 2>/dev/null || true
```

- [ ] **Step 3: Type-check + build**

Run:
```bash
npx tsc --noEmit
npm run build
```
Expected: both succeed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove superseded section components and helpers"
```

---

## Task 12: Update `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update palette table**

Replace the entire "Color palette" section with:

```markdown
## Color palette

Defined as Tailwind tokens in `app/globals.css`. **Locked from
`docs/design/oma-collective-background.svg`.**

| Token            | Hex       | Use                                                |
|------------------|-----------|----------------------------------------------------|
| `bg-maroon`      | `#62192e` | postcard base, page background                     |
| `inner-maroon`   | `#7a061f` | bottom-right quarter-circle, "Supporting" section  |
| `teal`           | `#016f98` | top-right block, Venue section                     |
| `lavender`       | `#ceb1ff` | top-left circle, Save the Date section             |
| `chartreuse`     | `#9e9e0e` | top-middle circle, Schedule section                |
| `rust`           | `#ef5518` | "Supporting the OMA" callout                       |
| `yellow`         | `#e5e142` | SAT/JUNE/SIXTH headline                            |
| `light-teal`     | `#b5d1ca` | KANEKO address text                                |
| `white`          | `#ffffff` | wordmark, body text on dark                        |
```

- [ ] **Step 2: Update typography section**

Replace the "Typography" section with:

```markdown
## Typography

- Display face: **dazzle-unicase-bold** (Adobe Fonts kit `bug3big`),
  weight 500 (Medium). Loaded via `<link rel="stylesheet" href="https://use.typekit.net/bug3big.css">`
  in `app/layout.tsx`.
- Body face: **Inter** (Google Fonts) for any non-display copy.
- All postcard text uses Dazzle Unicase per the source SVG. Don't substitute
  Bebas Neue or other fallbacks.
```

- [ ] **Step 3: Update "Things NOT to do" section**

Replace the placeholder list under "Known placeholders" with:

```markdown
## Known placeholders — replace before launch

### Content (in `lib/content.ts`)
- [ ] `about.paragraph` — real event description
- [ ] `mission.paragraphs` — real OMA mission copy
- [ ] `oma.email`, `oma.ein`, `oma.socials` — real contact info
- [ ] `event.time` — confirm doors / dinner / program times

### Configuration
- [ ] `metadataBase` URL in `app/layout.tsx` — replace `https://example.com`
- [ ] `.env.local` — set `NEXT_PUBLIC_TICKETS_URL` to the real ticket page
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect locked palette + fonts"
```

---

## Task 13: Final smoke test

- [ ] **Step 1: Run full build**

```bash
npm run build
npm run start
```

Open `http://localhost:3000`. Verify:
1. Hero load animation plays once, ~1.5s, ends with all postcard elements visible.
2. Postcard geometry matches `docs/design/oma-collective-background-text.svg` at all viewport widths from 360px to 1920px.
3. `BUY TICKETS →` pill is visible top-right at all times. Hover darkens it.
4. Scroll all the way down: each section enters with content fading up, background colored as expected.
5. Sticky header backdrop + mini-wordmark fade in as hero scrolls off, fade out if you scroll back to top.
6. DevTools → "Emulate prefers-reduced-motion: reduce" → reload → page renders fully without animation; CTA still visible; section transitions are instant.
7. Lighthouse run on the homepage — Accessibility ≥ 95.

Stop the server.

- [ ] **Step 2: Final commit (if any tweaks were needed)**

```bash
git status
# only commit if there are intentional changes from the smoke test
```

---

## Out of scope (follow-ups)

- Footer with OMA contact info, EIN tax disclosure, social links.
- Sponsors / patron acknowledgements section.
- OG share image (`public/og-image.png`).
- Real `metadataBase` URL.
- Mobile-specific tuning of the postcard hero (currently letterboxes; spec
  flagged a portrait-reflow option).
- Real ticket platform URL in `.env.local`.
