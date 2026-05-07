import { BloomSection } from "./BloomSection";
import { event, tickets, oma } from "@/lib/content";

export function Tickets() {
  return (
    <BloomSection
      id="tickets"
      shape="rust"
      textColor="text-white"
    >
      <p className="font-display text-sm tracking-[0.3em] text-[var(--color-bg-maroon)]">
        Reserve your seat
      </p>

      <div className="mt-6 sm:mt-8 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
        <span className="font-display text-6xl sm:text-8xl md:text-9xl leading-none">
          {tickets.price}
        </span>
        <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-wide text-[var(--color-bg-maroon)]">
          {tickets.perSeat}
        </span>
      </div>

      <ul className="mt-8 sm:mt-10 grid gap-3 text-base sm:text-lg">
        {tickets.includes.map((item) => (
          <li key={item} className="flex items-baseline gap-3">
            <span aria-hidden="true" className="text-[var(--color-bg-maroon)] font-display">
              ◆
            </span>
            {item}
          </li>
        ))}
      </ul>

      <a
        href={event.ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 sm:mt-12 inline-flex items-center gap-3 rounded-full bg-[var(--color-bg-maroon)] px-8 sm:px-10 py-4 sm:py-5 font-display text-base sm:text-lg tracking-widest text-white transition hover:bg-[var(--color-inner-maroon)] focus-visible:outline-2 focus-visible:outline-white"
      >
        BUY TICKETS →
      </a>

      <p className="mt-10 sm:mt-12 max-w-prose text-sm text-white/85 leading-relaxed">
        {event.name} is a fundraising event of the {oma.legalName}.
      </p>
    </BloomSection>
  );
}
