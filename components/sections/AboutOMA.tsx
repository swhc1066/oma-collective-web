import { BloomSection } from "./BloomSection";
import { mission } from "@/lib/content";

export function AboutOMA() {
  return (
    <BloomSection id="about-oma" shape="innerMaroon" textColor="text-white">
      <p className="font-display text-sm tracking-[0.3em] text-[var(--color-rust)]">
        About the OMA
      </p>
      <h2 id="about-oma-heading" className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] sm:leading-[0.9]">
        {mission.heading}
      </h2>
      <div className="mt-8 max-w-prose space-y-5 text-base sm:text-lg leading-relaxed">
        {mission.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </BloomSection>
  );
}
