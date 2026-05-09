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
    parking:
      "Public lots and on-street parking on 11th and Jones. Valet available the night of the event.",
  },
  ticketsUrl:
    process.env.NEXT_PUBLIC_TICKETS_URL ??
    "https://www.zeffy.com/en-US/ticketing/collective--26-2",
} as const;

export const intro = {
  eyebrow: "Omaha's New Signature Summer Event",
  paragraphs: [
    "The OMA proudly presents COLLECTIVE ’26: THE ARTS — a reimagined annual fundraiser bringing together the people who shape, support, and believe in the Old Market.",
    "Held within the striking KANEKO galleries, this year’s event celebrates the artistic spirit and cultural energy that continue to shape the Old Market. The evening honors the creative legacy of Ree and Jun Kaneko — whose vision and artistry helped define the district we know today.",
    "More than a traditional gala, COLLECTIVE is designed as an immersive summer evening of art, atmosphere, conversation, and connection.",
    "All proceeds support the ongoing work of the OMA to elevate, connect, and strengthen the district through community-building, storytelling, beautification, and placemaking efforts.",
  ],
} as const;

export const evening = {
  blurb:
    "An evening of curated dining, live performance, and community remarks — held in Kaneko's open creative space.",
} as const;

export const impact = {
  eyebrow: "What your ticket supports",
  headline: "Keeping the Old Market vibrant.",
  items: [
    {
      title: "COMMUNITY & CONNECTION",
      description:
        "Supporting events and experiences that bring neighbors, businesses, creatives, and guests together throughout the year.",
    },
    {
      title: "VISIBILITY & STORYTELLING",
      description:
        "Amplifying the people, businesses, and culture of the Old Market through marketing, social media, and creative initiatives like 50 Faces, 50 Stories.",
    },
    {
      title: "BEAUTIFICATION & PLACEMAKING",
      description:
        "Helping shape a more vibrant, walkable, and welcoming district through projects like the 7 Circles Old Market Legacy Project, Clean Sweeps, and future Cultural Arts Corridor efforts.",
    },
  ],
} as const;

export const mission = {
  // PLACEHOLDER — replace with real OMA mission copy from OMA board.
  heading: "About the Old Market Association",
  paragraphs: [
    "The Old Market Association is a nonprofit dedicated to preserving, promoting, and strengthening Omaha's Old Market — the historic district that has anchored the city's cultural identity for generations.",
    "Funds raised at Collective '26 directly support the OMA's work to keep the district vibrant: public art, neighborhood programming, small business advocacy, and the people who make the Old Market what it is.",
  ],
} as const;

export const tickets = {
  price: "$135",
  perSeat: "per guest",
  includes: [
    "Cocktail Hour",
    "Three-Course Seated Dinner",
    "Live Program & Remarks",
  ],
} as const;

export const oma = {
  legalName: "Old Market Association of Omaha",
  email: "info@oldmarket.org",
  socials: {
    instagram: "https://instagram.com/oldmarketomaha/",
    facebook: "https://facebook.com/OldMarketOmaha",
  },
} as const;
