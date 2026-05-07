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

## Typography

- Display face: **dazzle-unicase-bold** (Adobe Fonts kit `bug3big`),
  weight 500 (Medium). Loaded via `<link rel="stylesheet" href="https://use.typekit.net/bug3big.css">`
  in `app/layout.tsx`.
- Body face: **Inter** (Google Fonts) for any non-display copy.
- All postcard text uses Dazzle Unicase per the source SVG. Don't substitute
  Bebas Neue or other fallbacks.

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

### Content (in `lib/content.ts`)
- [ ] `about.paragraph` — real event description
- [ ] `mission.paragraphs` — real OMA mission copy
- [ ] `oma.email`, `oma.ein`, `oma.socials` — real contact info
- [ ] `event.time` — confirm doors / dinner / program times

### Configuration
- [ ] `metadataBase` URL in `app/layout.tsx` — replace `https://example.com`
- [ ] `.env.local` — set `NEXT_PUBLIC_TICKETS_URL` to the real ticket page

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
