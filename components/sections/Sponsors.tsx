import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";

export function Sponsors() {
  return (
    <section
      id="sponsors"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="sponsors-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <SectionHeader eyebrow="With Gratitude" heading="Our Sponsors" />

        <FadeUp>
          {/*
            PLACEHOLDER. Replace with real sponsor logos as they're confirmed.
            Recommend exporting logos as monochrome SVG for crisp display
            and consistent visual weight on the cream background.
          */}
          <p className="text-ink/60 italic">
            Sponsor logos will appear here as commitments are confirmed.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
