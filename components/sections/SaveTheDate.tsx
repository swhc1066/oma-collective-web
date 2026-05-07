import { BloomSection } from "./BloomSection";
import { event } from "@/lib/content";

export function SaveTheDate() {
  return (
    <BloomSection
      id="save-the-date"
      shape="lavender"
      textColor="text-[var(--color-bg-maroon)]"
    >
      <p className="font-display text-sm tracking-[0.3em]">SAVE THE DATE</p>
      <h2 id="save-the-date-heading" className="mt-6 font-display text-6xl sm:text-8xl">
        {event.date.weekdayParts.join(" ")}
      </h2>
      <p className="mt-8 max-w-prose text-base sm:text-lg leading-relaxed">
        Mark your calendar. {event.name} arrives at {event.venue.name}, {event.venue.addressLine2}.
      </p>
    </BloomSection>
  );
}
