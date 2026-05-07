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
