# CLAUDE.md — Project context for Claude Code

Read this before making changes. It captures the design intent, conventions,
and known placeholders so you don't unintentionally rebuild things or drift
from the brand.

## What this site is

A **one-page** event site for **Collective '26**, a fundraiser dinner hosted
by the **Old Market Association of Omaha (OMA)** at **Kaneko** (1111 Jones
St., Omaha, NE) on **Saturday, June 6, 2026**. Beneficiary: the OMA itself.
Tagline on the postcard: "The Arts" / "Supporting the OMA".

The site is intentionally one page. No router, no CMS. If the OMA later
needs a permanent multi-page presence, this codebase is structured so it can
grow into that without a rewrite.

## Tech stack — do not change without reason

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — CSS-first config; design tokens live in
  `app/globals.css` under `@theme`. There is intentionally NO
  `tailwind.config.js`.
- **Motion** (`motion` package, the rebranded Framer Motion). If a loaded
  reference repo uses `framer-motion` imports, both packages still publish
  and are aliased — but prefer `motion/react` imports for new code.
- **Vercel** for deploy. Vercel Web Analytics is wired up in `app/layout.tsx`.

## Design language

The visual identity is **set by the save-the-date postcard** (reference image
provided separately by the user). It's bold, modern, and confident:

- Big organic curved color shapes overlapping in a layered composition.
- Condensed all-caps display sans-serif type.
- Limited, saturated palette — no gradients, no soft shadows, no glassmorphism.
- The aesthetic is editorial / poster, NOT typical SaaS / nonprofit.

When making design choices, ask: "would this look at home next to the
postcard?" If not, reconsider.

## Color palette

Defined as Tailwind tokens in `app/globals.css`. **Values are eyeballed from
a photo of the printed postcard** — replace with exact brand hex values once
the original art file is available.

| Token | Hex (approx) | Use |
|---|---|---|
| `cream` | `#f4ecdf` | primary background, light text on dark |
| `lavender` | `#c8b9c7` | dusty lavender accent shape |
| `chartreuse` | `#c4d43f` | bright lime accent / Tickets section bg |
| `maroon` | `#5a1e16` | primary brand color, dark backgrounds, headlines |
| `teal` | `#2d6e7e` | teal accent shape |
| `rust` | `#b14b30` | "Supporting the OMA" callout color, links |
| `ink` | `#1a1410` | body text on cream |

⚠️ **Contrast watch list.** Cream-on-teal and cream-on-chartreuse both run
close to WCAG AA failure depending on type size. If you place body text on
those colors, run a contrast checker before shipping.

## Typography

- Display face: **Bebas Neue** (Google Fonts) — closest free match to the
  postcard. Loaded via `next/font/google` in `app/layout.tsx`.
- Body face: **Inter** — neutral, readable, pairs well with Bebas.
- If the user obtains the actual font from the postcard designer (might be
  Druk, Industry, Surt, or similar), swap it in `layout.tsx` and update
  the `--font-display` CSS variable.

## Animation philosophy

Subtle. Choreographed. **Restrained.** Read `lib/animations.ts` for the
shared variants.

Rules:

1. **Always** wrap motion in `useMotionSafeVariants()` (see
   `lib/useMotionSafeVariants.ts`). Users with `prefers-reduced-motion: reduce`
   should see content instantly.
2. **No parallax. No scroll-jacking. No horizontal scroll gimmicks.**
3. On-load animation runs once on mount. On-scroll animations use
   `whileInView` with `viewport={{ once: true }}`.
4. Easing: prefer `easeOutExpo` for entrances. Don't use spring physics for
   this brand — too playful.
5. Total hero on-load choreography target: **1.2–1.6 seconds**. If it feels
   longer, it's too long.

## Known placeholders — replace before launch

These are tracked here so they aren't forgotten:

### Content (in `lib/content.ts`)
- [ ] `about.paragraph` — real event description
- [ ] `mission.paragraphs` — real OMA mission copy
- [ ] `ticketTiers` — confirm prices and what's included with the OMA board
- [ ] `oma.email`, `oma.ein`, `oma.socials` — real contact info
- [ ] `event.time` — confirm doors / dinner / program times

### Assets
- [ ] `public/shapes/*.svg` — replace inline placeholder shapes with real
      vector art exported from the postcard designer's source file. See
      `public/shapes/README.md` for the asset spec.
- [ ] `public/logos/oma.svg` — OMA logo
- [ ] `public/logos/kaneko.svg` — Kaneko logo (with permission)
- [ ] `public/og-image.png` — 1200x630 social share image
- [ ] `public/favicon.ico` — favicon based on OMA mark

### Configuration
- [ ] `metadataBase` URL in `app/layout.tsx` — replace `https://example.com`
      with the real domain
- [ ] OG `url` in `app/layout.tsx`
- [ ] `.env.local` — set `NEXT_PUBLIC_TICKETS_URL` to the real ticket page
      (Zeffy, Givebutter, Donorbox, Eventbrite — TBD by board)
- [ ] Per-tier ticket URLs if multiple tiers go to different ticket pages

## Code conventions

- Server Components by default. Add `"use client"` only when the component
  uses hooks or browser APIs (motion components do).
- One component per file. Section components named for what they are
  (`Hero.tsx`, `Tickets.tsx`).
- Copy lives in `lib/content.ts`. Don't inline strings in components except
  for trivial labels.
- Tailwind classes only — no CSS modules, no styled-components.
- When adding interactivity, prefer plain HTML/CSS over JS. The site should
  remain navigable and beautiful with JS disabled.

## Accessibility

- All sections have `aria-labelledby` or `aria-label`.
- Decorative shapes are marked `aria-hidden="true"`.
- Buttons have visible focus rings.
- Reduced-motion users get an instant page.
- Run an audit (Lighthouse / axe) before shipping. Target Lighthouse a11y
  score of 100.

## Things NOT to do

- **Don't** build a custom ticketing system. Tickets are a deep-link out
  to a hosted nonprofit platform.
- **Don't** add a CMS. The single source of truth is `lib/content.ts`.
- **Don't** add a chatbot, AI assistant, popup modal on load, or
  newsletter-signup interruption. This is a fundraiser invitation, not a
  marketing funnel.
- **Don't** bake in fonts as hardcoded `font-family` strings — use the CSS
  variables (`--font-display`, `--font-body`) so swapping is one edit.
