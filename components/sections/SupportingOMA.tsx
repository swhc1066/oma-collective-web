import { BloomSection } from "./BloomSection";
import { mission, event } from "@/lib/content";

export function SupportingOMA() {
  return (
    <BloomSection id="supporting-oma" shape="innerMaroon" textColor="text-white">
      <p className="font-display text-sm tracking-[0.3em] text-[var(--color-rust)]">
        SUPPORTING THE OMA
      </p>
      <h2 id="supporting-oma-heading" className="mt-6 font-display text-5xl sm:text-7xl">
        {mission.heading}
      </h2>
      <div className="mt-8 max-w-prose space-y-5 text-base sm:text-lg leading-relaxed">
        {mission.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <a
        href={event.ticketsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-block rounded-full bg-[var(--color-rust)] px-8 py-4 font-display text-base tracking-widest text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white"
      >
        BUY TICKETS →
      </a>
    </BloomSection>
  );
}
