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

## Auction admin (`/admin`)

The QR-accessed auction list at `/auction` is fed by an admin area at
`/admin`. Items and photos live in Supabase (Postgres + Storage).

One-time setup:

1. Create a Supabase project and add these env vars in Vercel (and
   `.env.local` locally):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ALLOWED_ADMIN_EMAIL` (the single admin email; middleware rejects all
     others even if they have valid Supabase credentials)

2. In the Supabase dashboard:
   - **Authentication → Providers → Email**: ensure Email is enabled.
   - **Authentication → Users → Add user**: create the admin with the same
     email as `ALLOWED_ADMIN_EMAIL`, set a strong password, and mark the email
     as confirmed.

3. Visit `/admin/login` and sign in with that email and password.

Items added via the admin appear immediately on `/auction` (the public page
is server-rendered and revalidated on every save).

## What's still placeholder

See `CLAUDE.md` for the full handoff list. Short version: hero shapes are
approximated until we get the real SVG art, and all copy in `lib/content.ts`
needs board sign-off.
