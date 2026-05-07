import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { mission } from "@/lib/content";

export function OmaMission() {
  return (
    <section
      id="mission"
      className="bg-maroon py-24 text-cream md:py-32"
      aria-labelledby="mission-heading"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        {/*
          NOTE: SectionHeader uses text-maroon by default. On the maroon
          background we override locally rather than parameterizing — keeps
          the API simple. UI/UX skill may want to refactor this when it
          unifies design tokens.
        */}
        <FadeUp>
          <p className="font-display text-chartreuse text-sm tracking-widest mb-3">
            Why We Gather
          </p>
          <h2 className="font-display text-cream text-[clamp(2rem,5vw,4rem)] mb-10">
            {mission.heading}
          </h2>
        </FadeUp>

        {mission.paragraphs.map((p, i) => (
          <FadeUp key={i} delay={i * 0.05}>
            <p className="text-cream/90 text-lg leading-relaxed md:text-xl mb-6 last:mb-0">
              {p}
            </p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
