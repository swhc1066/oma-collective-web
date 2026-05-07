# Collective '26 — OMA Fundraiser Site

One-page event site for **Collective '26**, the Old Market Association of
Omaha's fundraiser dinner at Kaneko on Saturday, June 6, 2026.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_TICKETS_URL
npm run dev
```

Open http://localhost:3000.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- Motion (formerly Framer Motion) for animation
- Vercel for hosting + Web Analytics

## Project structure

```
app/                  Next.js App Router entries
  layout.tsx          fonts, metadata, analytics
  page.tsx            composes all section components
  globals.css         Tailwind v4 + design tokens (colors, fonts, easing)

components/
  sections/           page sections (Hero, About, Tickets, etc.)
  motion/             reusable motion wrappers (FadeUp, etc.)
  ui/                 small reusable UI bits (SectionHeader, etc.)

lib/
  content.ts          ALL event copy lives here — single source of truth
  animations.ts       reusable Motion variants
  useMotionSafeVariants.ts   reduced-motion-aware wrapper

public/
  shapes/             SVG art for the hero composition (see README)
  logos/              OMA + Kaneko + sponsor logos
```

## Editing copy

Don't hunt through JSX. Edit `lib/content.ts` — every section pulls from it.

## Deploying

Push to GitHub, connect the repo to Vercel, set the
`NEXT_PUBLIC_TICKETS_URL` env var in the Vercel dashboard. That's it.

## What's still placeholder

See `CLAUDE.md` for the full handoff list. Short version: hero shapes are
approximated until we get the real SVG art, and all copy in `lib/content.ts`
needs board sign-off.
