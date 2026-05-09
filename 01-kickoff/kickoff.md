# Requirements Narrative — Collective '26

## What it is
A one-page event website for **Collective '26**, the Old Market Association
of Omaha's (OMA) annual fundraiser dinner. The site invites guests to learn
about the event, understand the OMA's mission, and reserve a seat at a
hosted dinner at Kaneko on Saturday, June 6, 2026. Beneficiary of the
fundraiser is the OMA itself.

## The problem
The OMA needs a confident, modern digital home for its annual fundraiser
that matches the bold editorial feel of the printed save-the-date — not a
generic nonprofit template. The site has to convert interest into ticket
purchases, communicate venue/date/time clearly, and represent the
association's brand alongside the broader Old Market identity.

## Users
- **Prospective guests / donors** — Omaha-area arts supporters who received
  the postcard or heard about the dinner; primary goal is "what is this and
  how do I get a seat."
- **OMA board members & event organizers** — secondary audience using the
  site as a shareable artifact; need confidence the page reflects the
  organization well.
- [NEEDS INPUT: sponsors / corporate table-buyers — is there a separate
  sponsorship tier or call-to-action, or is everything a single ticket SKU?]

## Core capabilities
- Communicate the event identity (name, date, venue, beneficiary) on a
  single scrollable page.
- Drive ticket reservations via a deep-link to a hosted nonprofit
  ticketing platform (no in-house checkout).
- Tell the OMA's story / mission in service of fundraising context.
- Present venue details (Kaneko, 1111 Jones St., Omaha, NE) including
  address and any wayfinding info.
- Present schedule of the evening (doors / dinner / program).
- Provide contact / social channels for the OMA.
- Render beautifully on mobile (postcard recipients will scan a QR / tap a
  link from a phone first).
- Remain navigable and legible with JavaScript disabled or with
  `prefers-reduced-motion`.

## Out of scope (v1)
- Custom ticketing / checkout — handled by an external nonprofit platform.
- CMS or admin UI — content lives in `lib/content.ts` and ships via git.
- Multi-page routing, blog, news, or year-over-year archive.
- Newsletter signup, popup modals, chatbots, or marketing-funnel patterns.
- Authenticated areas, donor portals, or gated content.
- Internationalization.

## Success looks like
- Sold-out (or capacity-met) Collective '26 dinner on June 6, 2026.
- Lighthouse accessibility score of 100; performance ≥ 90 on mobile.
- Zero meaningful content edits required between launch and event night
  (content frozen ~2 weeks out).
- [NEEDS INPUT: target ticket count or revenue goal for the fundraiser]
- [NEEDS INPUT: launch date / when the link goes live to recipients]

## Open questions
- [NEEDS INPUT: confirm event timing — doors / dinner / program slots]
- [NEEDS INPUT: actual ticketing platform + URL for `NEXT_PUBLIC_TICKETS_URL`]
- [NEEDS INPUT: real OMA contact email and which social channels to link]
- [NEEDS INPUT: final mission copy and event description from the OMA board]
- [NEEDS INPUT: is there a sponsor tier, table-host program, or honoree
  callout that needs its own section?]
- [NEEDS INPUT: production domain for `metadataBase` in `app/layout.tsx`]

---

# UX Inventory — Collective '26

## Screens

**Home (single page)**
- Purpose: deliver the entire invitation experience — identity, date,
  venue, mission, schedule, and ticket CTA — in one scroll.
- Entry points: postcard QR / direct link, social posts, OMA email blasts.
- Key elements: wordmark + tagline, hero "Save the Date" composition
  echoing the postcard shapes, event details (date/venue/schedule),
  "Supporting the OMA" mission section, ticket CTA bar(s), footer with
  contact + socials.
- States:
  - Pre-launch (link live but tickets not yet on sale) — [NEEDS INPUT:
    is there a "tickets coming soon" state, or does launch == tickets live?]
  - On sale (default).
  - Sold out — [NEEDS INPUT: should there be a sold-out treatment, or
    will the ticket platform handle that?]
  - Post-event (after June 6) — [NEEDS INPUT: thank-you state, or take
    site down?]

## Key user flows

**Reserve a seat (primary)**
Land on home → scan hero (date, venue, beneficiary) → scroll through
event details + mission → tap "Reserve a spot at our table" → leave site
to external ticketing platform → complete purchase off-site.

**Learn about the OMA (secondary)**
Land on home → scroll to mission section → read about the Old Market
Association → optionally follow social/contact links from the footer.

**Share the invite**
Receive postcard → scan QR / type URL → land on home → screenshot or
forward URL to a friend (relies on strong OG image + clear title).

## Interaction patterns
- Subtle, choreographed motion only — hero composition animates in once
  on mount (~1.5s total); section "blooms" tied to viewport scroll
  progress so they reverse cleanly when scrolling back.
- No parallax, no scroll-jacking, no horizontal scroll gimmicks.
- All motion gated by `useReducedMotion()`; reduced-motion users get
  final state instantly.
- Ticket CTA appears at multiple natural points (hero, dedicated bar,
  footer) — every CTA is a deep-link out, no in-site checkout.
- Editorial / poster aesthetic: bold organic curved color shapes,
  condensed all-caps display sans (Dazzle Unicase), saturated palette,
  no gradients / soft shadows / glassmorphism.

## UX unknowns
- Sponsor / table-host treatment — does the page need a tier list, logo
  wall, or "host a table" CTA distinct from individual tickets?
- Program / honoree section — is there a featured speaker, performer, or
  honoree to credit on the page?
- Donation-only path for people who can't attend — is there a "give
  without attending" link, and does it route to the same platform?
- Photo / press treatment for past Collective events — is there imagery
  to show, or is the page entirely typographic + shape-based?
- Mobile-specific layout decisions for the layered shape composition
  (the postcard reads as a unit; on a 375px viewport the shapes likely
  need to restack — [NEEDS INPUT: postcard mobile reference, or designer
  call on stacking order]).

---

# Constraints & Context — Collective '26

## Project type
[ ] Client work  [ ] Internal Lintel product  [ ] Both
→ **Client work** (Old Market Association of Omaha)

## Timeline signals
- **Hard date:** event is Saturday, June 6, 2026 at Kaneko.
- Site must be live well in advance of the event so postcard recipients
  can act on the QR / URL.
- Today is 2026-05-08 — roughly **4 weeks** to event night.
- [NEEDS INPUT: confirmed soft-launch date for the URL]
- [NEEDS INPUT: content-freeze date ahead of event]

## Tech stack
Confirmed Lintel-adjacent stack already scaffolded in this repo (overrides
the default React + shadcn/ui defaults):
- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — CSS-first config in `app/globals.css` under
  `@theme`; no `tailwind.config.js`.
- **Motion** (`motion/react`) for animation.
- **Vercel** for deploy; Vercel Web Analytics wired up in
  `app/layout.tsx`.
- No CMS, no database — single source of truth is `lib/content.ts`.
- No shadcn/ui or Supabase on this project (one-page marketing site).

## Design system
[ ] Lintel brand
[x] Client-driven, derived from the printed save-the-date postcard
[ ] To be defined

- **Palette (locked from `docs/design/oma-collective-background.svg`):**
  bg-maroon `#62192e`, inner-maroon `#7a061f`, teal `#016f98`, lavender
  `#ceb1ff`, chartreuse `#9e9e0e`, rust `#ef5518`, yellow `#e5e142`,
  light-teal `#b5d1ca`, white `#ffffff`. Tokens live in `app/globals.css`.
- **Display type:** Dazzle Unicase Bold (Adobe Fonts kit `bug3big`),
  weight 500. All postcard text uses this — do not substitute.
- **Body type:** Inter (Google Fonts).
- **Aesthetic:** bold, modern, confident, editorial / poster — layered
  organic curved shapes, condensed all-caps display, saturated colors.
  No gradients, no soft shadows, no glassmorphism, no SaaS template feel.
- **Hi-fi screen designs:** none yet — the postcard is the design source
  of truth and the existing Stage / sections components are the in-repo
  interpretation. [NEEDS INPUT: any additional designer involvement, or
  is dev-led design from the postcard the plan?]

## Integrations & dependencies
- **Ticketing platform** — external nonprofit platform deep-linked via
  `NEXT_PUBLIC_TICKETS_URL`. [NEEDS INPUT: which platform — Givebutter,
  Zeffy, Eventbrite, RSVPify, etc.]
- **Adobe Fonts** (Typekit kit `bug3big`) for Dazzle Unicase — site
  depends on Typekit being reachable; needs a sensible fallback chain.
- **Google Fonts** for Inter.
- **Vercel Web Analytics** (already wired).
- [NEEDS INPUT: any donation / payment platform separate from ticketing?]
- [NEEDS INPUT: email capture or CRM (Mailchimp, etc.) — currently
  out of scope per CLAUDE.md, confirm that holds]

## Known risks
- **Tight runway** — ~4 weeks to event; any unresolved content gaps
  (mission copy, schedule, ticket URL) compress the launch window.
- **Adobe Fonts dependency** — Dazzle Unicase is Typekit-only; if the
  kit fails to load the visual identity collapses. Need a graceful
  fallback and to verify the kit is published, not draft.
- **Mobile layout of layered shape composition** — the postcard is a
  fixed-aspect printed piece; translating it to a fluid mobile viewport
  is the highest-risk visual problem and currently unspecified.
- **Single content source in `lib/content.ts`** — fast to edit but every
  copy change is a deploy; need a clear handoff for late edits from the
  OMA board.
- **No design comps for non-postcard sections** (mission, schedule,
  footer) — direction is "match the postcard" but interpretation risk
  is on the implementer.

## Non-negotiables
- One page. No router. No CMS.
- No custom ticketing — always deep-link out.
- No popup modals, newsletter interruptions, chatbots, or marketing
  funnel patterns. This is a fundraiser invitation, not a growth funnel.
- Visual identity must read as a continuation of the printed postcard.
- Reduced-motion users get an instant, fully legible page.
- Lighthouse accessibility target: 100.
- Fonts referenced via CSS variables (`--font-display`, `--font-body`),
  never hardcoded `font-family` strings.

## Client / stakeholder context
- **Client:** Old Market Association of Omaha (OMA).
- **Beneficiary:** the OMA itself (self-funding fundraiser).
- [NEEDS INPUT: primary point of contact / decision-maker on the OMA
  board — who approves copy and visual direction?]
- [NEEDS INPUT: approval / review cadence — single sign-off, board vote,
  rolling approvals?]
- [NEEDS INPUT: communication channel — email, Slack-shared, in-person?]
- [NEEDS INPUT: who owns post-launch edits if the OMA needs a copy
  change between launch and event night?]
