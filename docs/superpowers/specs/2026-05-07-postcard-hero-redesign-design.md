# Collective '26 — Postcard Hero Redesign

**Date:** 2026-05-07
**Status:** Design approved by user; ready for implementation plan

## Goal

Redesign the one-page Collective '26 site so the hero is a **pixel-perfect web
recreation of the printed save-the-date postcard**, and the rest of the page
flows from it: each colored shape from the postcard becomes the background of
its own scroll section ("the shape blooms into the section").

The site remains a single page, no router, no CMS. Source of truth for copy
stays in `lib/content.ts`.

## Visual source

- **Postcard PDF:** `docs/OMA-2026-Gala-v2 save date.pdf`
- **Shapes-only SVG:** `docs/design/oma-collective-background.svg`
- **Shapes + text SVG:** `docs/design/oma-collective-background-text.svg`


The shapes-only SVG is the canonical geometry. The hero will inline its paths
directly so geometry is exact at any viewport size.

## Color system (locked, from SVG)

Replace the current eyeballed palette in `app/globals.css`:

| Token            | Hex       | Role                                                |
| ---------------- | --------- | --------------------------------------------------- |
| `--bg-maroon`    | `#62192e` | postcard base background, dominant brand color     |
| `--inner-maroon` | `#7a061f` | the bottom-right quarter-circle that bites the teal |
| `--teal`         | `#016f98` | top-right block; "Venue / Kaneko" section          |
| `--lavender`     | `#ceb1ff` | top-left circle; "Save the Date" section           |
| `--chartreuse`   | `#9e9e0e` | top-middle circle; "Schedule" section               |
| `--rust`         | `#ef5518` | "Supporting the OMA" callout / mission color       |
| `--yellow`       | `#e5e142` | SATURDAY/JUNE/SIXTH headline color                  |
| `--light-teal`   | `#b5d1ca` | KANEKO address text                                 |
| `--white`        | `#ffffff` | wordmark + section accents                          |

The previous `cream` / `ink` tokens are retired — the postcard does not use
them.

## Typography

**Display:** `dazzle-unicase-bold` from Adobe Fonts kit `bug3big`. Weight 500
(Medium) is used everywhere on the postcard. Loaded via:

```html
<link rel="stylesheet" href="https://use.typekit.net/bug3big.css">
```

Available weights: 200, 300, 500, 700.

**Body:** Inter, Google Fonts (kept from current setup). Used only for any
long-form prose in inner sections; the postcard hero itself is 100% Dazzle
Unicase per the source.

Bebas Neue is removed.

## Hero (locked)

The hero is built from the inlined SVG paths, scaled to fill its container at
the postcard's native `432:288` (3:2) aspect ratio. Text is overlaid in
absolutely-positioned divs whose coordinates are derived from the SVG text
positions, expressed as percentages of the postcard so they scale correctly.

Reference implementation: `.superpowers/brainstorm/<session>/content/hero-v3.html`.

### Layers (back to front)

1. `rect` `--bg-maroon` — full postcard
2. `rect` `--teal` — top-right block, 36% wide
3. `path` `--lavender` — full circle r=144 centered at canvas (0,0); only the
   bottom-right quarter is visible
4. `path` `--chartreuse` — half-circle r=144 centered at (288, 0); bottom-half
   visible, bulges left
5. `path` `--inner-maroon` — quarter-disk r=144 centered at (288, 288); bites
   into the teal from the bottom-right corner of the canvas

### Text overlays

| Block         | Color           | Approx % position | Notes                              |
| ------------- | --------------- | ----------------- | ---------------------------------- |
| SAVE/THE/DATE | `--bg-maroon`   | 3.7% / 5.5%       | on the lavender                    |
| SAT/JUNE/SIXTH| `--yellow`      | 53.4% / 5.5%      | on the chartreuse, indented lines  |
| KANEKO addr   | `--light-teal`  | 70.4% / 5.5%      | on the teal                        |
| COLLECTIVE'26 | `--white`       | 3.7% / bottom 4.6%| massive, on the maroon             |
| THE / ARTS    | `--white`       | 58.7% / 84%       | smaller wordmark companion         |
| SUPPORTING    | `--rust`        | 70.4% / 88.5%     | on the inner-maroon quarter circle |

### Hero load animation (~1.5s total)

| Time | Element                | Effect                                     |
| ---- | ---------------------- | ------------------------------------------ |
| 0.00 | bg-maroon              | fade in                                    |
| 0.10 | lavender               | scale from 0.2 → 1, origin top-left (0,0)  |
| 0.20 | chartreuse             | scale from 0.2 → 1, origin (288, 0)        |
| 0.25 | teal                   | **slide in from right** (`translateX(+160) → 0`) |
| 0.45 | inner-maroon           | scale from 0.2 → 1, origin (288, 288)      |
| 0.85 | SAVE THE DATE          | fade + translateY(14→0)                    |
| 0.95 | SAT/JUNE/SIXTH         | "                                          |
| 1.05 | KANEKO                 | "                                          |
| 1.15 | COLLECTIVE '26         | "                                          |
| 1.30 | THE ARTS               | "                                          |
| 1.45 | SUPPORTING THE OMA     | "                                          |

Easing: `cubic-bezier(.16,1,.3,1)` for shapes, `cubic-bezier(.2,.8,.2,1)` for
text. Reduced-motion users get the final state instantly.

## Scroll mechanic — "shape blooms into section"

After the hero, each scroll section is paired with a postcard shape. As the
user scrolls a section into view, that shape scales and translates from its
postcard position to fill the entire viewport, while section content fades in
on top.

**Section order and color mapping:**

| # | Section            | Source shape       | Background fills with |
| - | ------------------ | ------------------ | --------------------- |
| 1 | Hero               | (the postcard)     | —                     |
| 2 | Save the Date      | top-left lavender  | `--lavender`          |
| 3 | The Evening        | top-middle chartreuse | `--chartreuse`     |
| 4 | Venue (Kaneko)     | top-right teal     | `--teal`              |
| 5 | About / Wordmark   | maroon base        | `--bg-maroon`         |
| 6 | Supporting the OMA | bottom-right inner-maroon | `--inner-maroon` (with rust accents) |

The page no longer needs a dedicated Tickets section — the persistent CTA
(see "Tickets CTA" below) handles conversion above the fold and on every
section.

The "About / Wordmark" section (5) is the deepest scroll moment and re-asserts
the COLLECTIVE '26 wordmark in cream on maroon. This is by design — it
mirrors the postcard's own composition where maroon dominates.

### Implementation note

The scroll-bloom is implemented with a sticky pinned hero canvas plus
`scroll-timeline`/`view-timeline` driven CSS transforms (or `motion`'s
`useScroll` + `useTransform` if browser support requires JS fallback). The
specific approach is an implementation-plan concern, not a design decision —
both produce the same visual.

## Tickets CTA (persistent)

A single "Buy Tickets" CTA is anchored to the **top-right of the viewport at
all times** (fixed positioning, above all sections). Behavior:

- **On hero:** lives in the cream margin outside the postcard's bounding box.
  Fades in *after* the hero load animation completes (delay ~1.6s) so it
  doesn't compete with the postcard composition. Style: small pill, white
  text on `--bg-maroon`, ~14px label, `dazzle-unicase-bold` weight 500,
  uppercase, with a chevron `→`.
- **Post-scroll:** as the user scrolls past the hero, the pill slides up into
  a thin top-of-page sticky header that gains a `COLLECTIVE '26` mini-wordmark
  on the left. Background of the header is whatever color the current section
  has bloomed to (no separate panel — the header floats over the section's
  full-bleed color). Border-bottom is a 1px line in `--white` at 15% alpha.
- Single anchor. Links to `NEXT_PUBLIC_TICKETS_URL`.
- Hidden behind `prefers-reduced-motion: reduce` only for the slide
  transition; the CTA itself is always present and visible.

This resolves Open Question #1 (no separate Tickets section needed) and #5
(yes, a small persistent wordmark — but only post-scroll).

## Animation philosophy (unchanged from CLAUDE.md, plus additions)

- All motion gated by `prefers-reduced-motion: reduce`.
- No parallax, no scroll-jacking, no horizontal-scroll gimmicks.
- Hero load animation runs once on mount.
- The bloom transitions are scroll-driven — they progress with scroll position,
  do not auto-play, and reverse when the user scrolls back up.
- Easing `cubic-bezier(.16,1,.3,1)` for shape moves; `cubic-bezier(.2,.8,.2,1)`
  for text.

## Out of scope for this redesign

- New ticketing flow (still a deep-link out, platform TBD)
- CMS or content editor
- Multi-page expansion
- Donor/sponsor logo wall
- Photography (the design is type+shape only, per the postcard)

## Open questions / placeholders

Tracked here so the implementation plan can either resolve or defer them:

1. ~~Tickets section~~ — **Resolved.** Persistent top-right CTA replaces a
   dedicated section. See "Tickets CTA" above.
2. **Section copy.** Real text for each section (`lib/content.ts` placeholders)
   is still TBD. The hero text is locked from the postcard.
3. **COLLECTIVE '26 wordmark sizing.** User flagged it reads slightly too
   large in the v3 mockup. We'll tune in production — likely 10–11vw cap.
4. **Mobile bloom mechanic.** On narrow viewports the postcard rotates from
   3:2 to portrait or letterboxes. Decide during implementation: portrait
   re-flow vs. letterbox-with-pan.
5. ~~Wordmark constancy~~ — **Resolved.** Small `COLLECTIVE '26` mini-wordmark
   appears in the sticky header *only after* the hero scrolls off. See
   "Tickets CTA" above.

## Reference files

- Hero mockup: `.superpowers/brainstorm/30189-1778163619/content/hero-v3.html`
- Postcard PDF: `docs/OMA-2026-Gala-v2 save date.pdf`
- SVG (shapes): `docs/design/oma-collective-background.svg`
- SVG (with text): `docs/design/oma-collective-background-text.svg`
- Adobe Fonts kit: `https://use.typekit.net/bug3big.css`
