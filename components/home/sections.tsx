"use client";

import { event, evening, intro, impact, mission, tickets, oma } from "@/lib/content";
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
      <H2 id="section-heading">A new era of energy, action &amp; impact.</H2>
      <div className="mx-auto mt-8 max-w-prose space-y-5 text-base sm:text-lg leading-relaxed">
        {intro.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-10 grid gap-2 text-base sm:text-lg">
        <p>
          <span className="font-display tracking-widest mr-3">When</span>
          {event.date.full}
        </p>
        <p>
          <span className="font-display tracking-widest mr-3">Where</span>
          {event.venue.name} &middot; {event.venue.addressLine1}, {event.venue.addressLine2}
        </p>
      </div>
    </>
  );
}

/* -------- Run of Show (chartreuse) -------- */
function RunOfShowBody() {
  return (
    <>
      <Eyebrow className="text-[var(--color-yellow)]">The Evening</Eyebrow>
      <H2 id="section-heading">Run of show</H2>
      <p className="mx-auto mt-6 max-w-prose text-base sm:text-lg leading-relaxed">
        {evening.blurb}
      </p>
      <div className="mt-10 grid gap-3 text-base sm:text-lg">
        <p>
          <span className="font-display tracking-widest mr-3">{event.time.doors}</span>
          Doors &amp; cocktails
        </p>
        <p>
          <span className="font-display tracking-widest mr-3">{event.time.dinner}</span>
          Seated dinner
        </p>
        <p>
          <span className="font-display tracking-widest mr-3">{event.time.program}</span>
          Program &amp; remarks
        </p>
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
        <span className="text-white">{event.venue.name}</span>
      </H2>
      <address className="mt-6 not-italic text-lg">
        {event.venue.addressLine1}<br />
        {event.venue.addressLine2}
      </address>
      <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed">
        {event.venue.parking}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
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
      <H2 id="section-heading">{mission.heading}</H2>
      <div className="mx-auto mt-8 max-w-prose space-y-5 text-base sm:text-lg leading-relaxed">
        {mission.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="mt-10 grid gap-3 text-sm">
        <a className="underline underline-offset-4 hover:text-[var(--color-rust)]" href={`mailto:${oma.email}`}>
          {oma.email}
        </a>
        <div className="flex flex-wrap justify-center gap-5">
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
