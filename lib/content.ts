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
