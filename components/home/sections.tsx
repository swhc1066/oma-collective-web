"use client";

import Image from "next/image";
import { event, intro, impact, tickets, sponsors, oma } from "@/lib/content";
import type { SectionId } from "./bars";

export function SectionBody({ id }: { id: SectionId }) {
  switch (id) {
    case "tickets":
      return <TicketsBody />;
    case "event":
      return <EventBody />;
    case "show":
      return <RunOfShowBody />;
    case "venue":
      return <VenueBody />;
    case "oma":
      return <AboutOMABody />;
  }
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-display text-xs sm:text-sm tracking-[0.3em] uppercase ${className}`}>
      {children}
    </p>
  );
}

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-5 font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] sm:leading-[0.9]"
    >
      {children}
    </h2>
  );
}

const sponsorRowClass =
  "list-none m-0 flex w-full min-w-0 max-w-full flex-row flex-wrap items-start justify-start gap-x-8 gap-y-8 p-0 text-left sm:gap-x-10 sm:gap-y-10";

const sponsorLiClass =
  "flex min-h-24 min-w-0 max-w-[220px] shrink-0 flex-col items-start justify-center text-left sm:max-w-[240px]";

/** "First &" on line one, remainder on line two (e.g. Tina & / John Cherica). */
function coupleNameLines(name: string): { line1: string; line2: string } | null {
  const parts = name.split(" & ");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return { line1: `${parts[0]} &`, line2: parts[1] };
}

/** Optional `logoScale` multiplies rendered logo size (1 = default). */
function SponsorItem({
  item,
}: {
  item: { name: string; logoFile?: string; logoScale?: number; nameLight?: boolean };
}) {
  const scale =
    "logoScale" in item && typeof item.logoScale === "number" ? item.logoScale : 1;
  const scaleOrigin = scale !== 1 ? "origin-left" : "";
  const nameClass = item.nameLight
    ? "text-white"
    : "text-[var(--color-bg-maroon)]";
  const coupleLines = coupleNameLines(item.name);

  return (
    <li className={sponsorLiClass}>
      {"logoFile" in item && item.logoFile ? (
        <div className="relative flex w-full max-w-[220px] items-start justify-start">
          <span
            className={`flex w-max max-h-24 max-w-full items-start justify-start ${scaleOrigin}`}
            style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
          >
            <Image
              src={`/logos/${encodeURIComponent(item.logoFile)}`}
              alt={item.name}
              width={220}
              height={96}
              className="max-h-24 w-auto max-w-full object-contain object-left"
            />
          </span>
        </div>
      ) : (
        <p className={`font-display text-lg leading-tight tracking-wide sm:text-xl ${nameClass}`}>
          {coupleLines ? (
            <>
              <span className="block">{coupleLines.line1}</span>
              <span className="block">{coupleLines.line2}</span>
            </>
          ) : (
            item.name
          )}
        </p>
      )}
    </li>
  );
}

/* -------- Tickets (rust) -------- */
function TicketsBody() {
  return (
    <>
      <Eyebrow className="text-white">Reserve your seat</Eyebrow>
      <H2 id="section-heading">
        {tickets.price}{" "}
        <span className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-bg-maroon)]">
          {tickets.perSeat}
        </span>
      </H2>

      <ul className="mt-8 grid gap-3 text-base sm:text-lg text-[var(--color-bg-maroon)]">
        {tickets.includes.map((item) => (
          <li key={item}>
            <span aria-hidden="true" className="mr-2 font-display">◆</span>
            {item}
          </li>
        ))}
      </ul>

      <a
        href={event.ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--color-bg-maroon)] px-8 py-4 font-display text-base sm:text-lg tracking-widest text-white transition hover:bg-[var(--color-inner-maroon)] focus-visible:outline-2 focus-visible:outline-white"
      >
        BUY TICKETS →
      </a>

      <div
        className="mt-12 border-t border-[var(--color-bg-maroon)]/30 pt-8"
        aria-labelledby="sponsors-heading"
      >
        <Eyebrow className="text-white">{sponsors.eyebrow}</Eyebrow>
        <H2 id="sponsors-heading">{sponsors.headline}</H2>

        <div className="mt-10 flex flex-col gap-12">
          {sponsors.tiers.map((tier) => (
            <section
              key={tier.title}
              className="flex flex-col gap-6 text-left"
              aria-labelledby={`sponsor-tier-${tier.title.toLowerCase()}`}
            >
              <p
                id={`sponsor-tier-${tier.title.toLowerCase()}`}
                className="font-display text-[22px] sm:text-[24px] tracking-[0.35em] text-[var(--color-bg-maroon)] uppercase"
              >
                {tier.title}
              </p>
              <ul className={sponsorRowClass}>
                {tier.items.map((item) => (
                  <SponsorItem key={`${tier.title}-${item.name}`} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-[var(--color-bg-maroon)]/30 pt-8">
        <Eyebrow className="text-white">{impact.eyebrow}</Eyebrow>
        <H2>{impact.headline}</H2>
        <ul className="mt-8 grid gap-6 sm:gap-8">
          {impact.items.map((item, i) => (
            <li key={item.title} className="text-[var(--color-bg-maroon)]">
              <span className="block font-display text-2xl sm:text-3xl text-white tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mt-1 font-display text-xl sm:text-2xl">{item.title}</h3>
              <p className="mx-auto mt-1 max-w-prose text-base leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-12 max-w-prose text-sm text-[var(--color-bg-maroon)]/80 leading-relaxed">
        {event.name} is a fundraising event of the {oma.legalName}.
      </p>
    </>
  );
}

/* -------- The Event (lavender) -------- */
function EventBody() {
  return (
    <>
      <Eyebrow className="text-[var(--color-rust)]">{intro.eyebrow}</Eyebrow>
      <H2 id="section-heading">OMAHA’S NEW SIGNATURE SUMMER EVENT</H2>
      <div className="mx-auto mt-8 space-y-5 text-balance text-base sm:text-lg leading-relaxed">
        {intro.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-12 grid gap-10 text-base sm:text-lg">
        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            Event Details
          </p>
          <p className="mt-3">Saturday, June 6, 2026</p>
          <p>6:30 PM Cocktail Hour &middot; 7:00 PM Dinner &amp; Program</p>
          <p>1111 Jones Street &middot; Omaha, Nebraska</p>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            Attire
          </p>
          <p className="mt-3 text-balance text-lg">
            This is not your traditional black-tie affair&hellip; unless you want it to be.
          </p>
          <p className="mt-1 text-balance text-lg">
            Summer Creative &mdash; elevated, artful, expressive. Bold color. Effortless style. Creative edge.
          </p>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            Tickets &amp; Tables
          </p>
          <p className="mt-3">Only 150 guests will be part of this year&rsquo;s event.</p>
          <p>Reserve your spot at the table today.</p>
        </div>
      </div>
    </>
  );
}

/* -------- Run of Show (chartreuse) -------- */
function RunOfShowBody() {
  return (
    <>
      <Eyebrow className="text-[var(--color-yellow)]">The Evening</Eyebrow>
      <H2 id="section-heading">Your experience includes</H2>

      <div className="mt-12 grid max-w-prose gap-10 text-base sm:text-lg">
        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            6:30 PM &middot; Cocktail Arrival
          </p>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            7:00 PM &middot; Three-Course Shared Dinner
          </p>
          <ul className="mt-3 list-none space-y-2 p-0 leading-relaxed">
            <li>A thoughtfully prepared dinner by Chef Tyler Johnson of FIG.</li>
            <li>A vibrant dessert presentation by Chef/Owner Erik Landa of CENTI.</li>
          </ul>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            8:00 PM &middot; Program
          </p>
          <ul className="mt-3 list-none space-y-2 p-0 leading-relaxed">
            <li>A special conversation celebrating the artistic legacy and impact of Ree &amp; Jun Kaneko.</li>
            <li>A curated auction featuring exclusive Old Market and local experiences.</li>
            <li>Live performance by Broadway Bar, led by Curtis Reynolds.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* -------- The Venue (teal) -------- */
function VenueBody() {
  return (
    <>
      <Eyebrow className="text-white">The Venue</Eyebrow>
      <H2 id="section-heading">
        <span className="text-white">KANEKO</span>
      </H2>
      <address className="mt-6 not-italic text-base sm:text-lg">
        1111 Jones Street &middot; Omaha, Nebraska
      </address>

      <p className="mt-8 max-w-prose text-base sm:text-lg leading-snug">
        A space rooted in creativity, experimentation, and community, KANEKO has long stood as one of the cultural anchors of the Old Market. Founded through the vision of Ree and Jun Kaneko, the space reflects the same spirit of artistic energy and collaboration that inspired this year&rsquo;s COLLECTIVE theme: THE ARTS.
      </p>

      <div className="mt-12 grid max-w-prose gap-8 text-base sm:text-lg">
        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            Arrival &amp; Parking
          </p>
          <p className="mt-3 leading-normal">
            Guests are encouraged to arrive between 6:15&ndash;6:30 PM for cocktail hour.
          </p>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            Nearby Parking Options
          </p>
          <ul className="mt-3 list-none space-y-2 p-0 leading-normal">
            <li>Street parking throughout the Old Market</li>
            <li>Nearby public garages within walking distance</li>
            <li>Ride share encouraged for ease of arrival</li>
          </ul>
        </div>

        <div>
          <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
            Recommended Garages
          </p>
          <ul className="mt-3 list-none space-y-2 p-0 leading-normal">
            <li>Landmark Parking Garage &mdash; 11th &amp; Jones</li>
            <li>City of Omaha Garages throughout the Old Market district</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-start gap-x-8 gap-y-3 text-sm">
        <a className="underline underline-offset-4 hover:text-white" href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          Get directions →
        </a>
        <a className="underline underline-offset-4 hover:text-white" href={event.venue.website} target="_blank" rel="noopener noreferrer">
          About Kaneko →
        </a>
      </div>
    </>
  );
}

/* -------- About the OMA (inner maroon) -------- */
function AboutOMABody() {
  return (
    <>
      <Eyebrow className="text-[var(--color-rust)]">About the OMA</Eyebrow>
      <H2 id="section-heading">Our Impact</H2>

      <div className="mx-auto mt-8 space-y-5 text-balance text-base sm:text-lg leading-relaxed">
        <p>
          The OMA is a volunteer-based neighborhood association working to unite the voices of the district and strengthen our community for the future.
        </p>
        <p>
          We bring together businesses, residents, and stakeholders to create shared experiences, amplify visibility, and advocate for a vibrant, welcoming Old Market for all.
        </p>
      </div>

      <div className="mx-auto mt-12">
        <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
          What Your Support Makes Possible
        </p>
        <div className="mt-4 space-y-5 text-balance text-base sm:text-lg leading-relaxed">
          <p>
            Through events, storytelling, marketing, beautification, and placemaking, we help create an Old Market that feels active, connected, and worth exploring.
          </p>
          <p>
            Your support helps power district-wide promotion, community experiences, and improvements made possible through collective investment in the future of the Old Market.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12">
        <p className="font-display font-bold uppercase tracking-[0.25em] text-base sm:text-lg">
          Together, in 2025&ndash;2026 we:
        </p>
        <ul className="mt-4 space-y-3 text-balance text-base sm:text-lg leading-relaxed">
          <li>
            In 2025, we generated more than 376,000 Instagram views and 1.7 million Facebook views showcasing the Old Market and its businesses.
          </li>
          <li>
            Launched new storytelling initiatives like 50 Faces, 50 Stories to celebrate the people and culture that define the district.
          </li>
          <li>
            Introduced Beats, Bites + Autumn Nights &mdash; a fall festival celebrating music, food, creativity, and community.
          </li>
          <li>
            Completed the 7 Circles Old Market Legacy Project at 11th &amp; Howard &mdash; bringing new native landscaping, trees, and connectivity to one of the district&rsquo;s most visible intersections.
          </li>
          <li>
            Continued Neighborly Nights into its 3rd year &mdash; creating free quarterly gatherings that connect residents, merchants, and community partners.
          </li>
          <li>
            Hosted quarterly Clean Sweep volunteer days to help care for and beautify the district.
          </li>
          <li>
            Expanded Market Matters into one of downtown Omaha&rsquo;s most consistent and informative community gatherings.
          </li>
          <li>
            Advanced planning and partnerships surrounding the future Cultural Arts Corridor and Nebraska Creative District designation.
          </li>
          <li>
            Strengthened relationships between residents, businesses, city leadership, and community organizations working toward a stronger Old Market.
          </li>
        </ul>
      </div>
      <div className="mt-10 grid gap-3 text-sm">
        <a className="underline underline-offset-4 hover:text-[var(--color-rust)]" href={`mailto:${oma.email}`}>
          {oma.email}
        </a>
        <div className="flex flex-wrap justify-start gap-5">
          <a className="underline underline-offset-4 hover:text-[var(--color-rust)]" href={oma.socials.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a className="underline underline-offset-4 hover:text-[var(--color-rust)]" href={oma.socials.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </>
  );
}
