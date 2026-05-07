import { BloomSection } from "./BloomSection";
import { intro } from "@/lib/content";

export function Intro() {
  return (
    <BloomSection
      id="intro"
      shape="lavender"
      textColor="text-[var(--color-bg-maroon)]"
    >
      <p className="font-display text-sm tracking-[0.3em]">{intro.eyebrow}</p>
      <h2 id="intro-heading" className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] sm:leading-[0.9]">
        A new era of energy, action &amp; impact.
      </h2>
      <div className="mt-8 max-w-prose space-y-5 text-base sm:text-lg leading-relaxed">
        {intro.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </BloomSection>
  );
}
