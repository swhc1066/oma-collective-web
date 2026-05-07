import { BloomSection } from "./BloomSection";
import { event } from "@/lib/content";

export function Venue() {
  return (
    <BloomSection id="venue" shape="teal" textColor="text-[var(--color-light-teal)]">
      <p className="font-display text-sm tracking-[0.3em] text-white">The Venue</p>
      <h2 id="venue-heading" className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl text-white">
        {event.venue.name}
      </h2>
      <address className="mt-6 not-italic text-lg">
        {event.venue.addressLine1}<br />
        {event.venue.addressLine2}
      </address>
      <p className="mt-6 max-w-prose text-base leading-relaxed">
        {event.venue.parking}
      </p>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <a className="underline underline-offset-4 hover:text-white" href={event.venue.mapsUrl} target="_blank" rel="noopener noreferrer">
          Get directions →
        </a>
        <a className="underline underline-offset-4 hover:text-white" href={event.venue.website} target="_blank" rel="noopener noreferrer">
          About Kaneko →
        </a>
      </div>
    </BloomSection>
  );
}
