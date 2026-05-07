/**
 * Single source of truth for all event copy.
 * Edit values here rather than hunting through component JSX.
 *
 * TODO before launch: replace every PLACEHOLDER value with real copy from
 * the OMA board.
 */

export const event = {
  name: "Collective '26",
  tagline: "The Arts",
  beneficiary: "Supporting the OMA",
  date: {
    full: "Saturday, June 6, 2026",
    short: "June 6, 2026",
    iso: "2026-06-06", // used for structured data / calendar links
    weekdayParts: ["Saturday", "June", "Sixth"], // matches postcard layout
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
  // PLACEHOLDER — replace with real event description.
  paragraph:
    "Collective '26 is an evening of food, art, and community at Kaneko, gathering Old Market supporters, neighbors, and friends to celebrate the creative life of one of Omaha's most iconic neighborhoods.",
} as const;

export const mission = {
  // PLACEHOLDER — replace with real OMA mission copy.
  heading: "About the Old Market Association",
  paragraphs: [
    "The Old Market Association is a nonprofit dedicated to preserving, promoting, and strengthening Omaha's Old Market — the historic district that has anchored the city's cultural identity for generations.",
    "Funds raised at Collective '26 directly support the OMA's work to keep the district vibrant: public art, neighborhood programming, small business advocacy, and the people who make the Old Market what it is.",
  ],
} as const;

export const ticketTiers = [
  // PLACEHOLDER tiers — confirm real pricing and what each includes with the
  // OMA board before launch. Set the URL per-tier on Zeffy/Givebutter.
  {
    name: "Individual Seat",
    price: "$150",
    description: "Cocktail hour, three-course dinner, and program.",
    url: process.env.NEXT_PUBLIC_TICKETS_INDIVIDUAL_URL ?? "#",
    featured: false,
  },
  {
    name: "Patron Table",
    price: "$1,500",
    description:
      "Reserved table of eight, premium seating, recognition in event materials.",
    url: process.env.NEXT_PUBLIC_TICKETS_TABLE_URL ?? "#",
    featured: true,
  },
  {
    name: "Sponsor",
    price: "$5,000+",
    description:
      "Reserved table of eight, top recognition, and program-level sponsorship.",
    url: process.env.NEXT_PUBLIC_TICKETS_SPONSOR_URL ?? "#",
    featured: false,
  },
] as const;

export const oma = {
  // PLACEHOLDER — replace with real OMA contact info.
  legalName: "Old Market Association of Omaha",
  email: "info@oldmarketassociation.org",
  ein: "00-0000000", // important for tax-deductible disclosure on tickets
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;
