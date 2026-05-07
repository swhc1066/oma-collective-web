import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { about } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <SectionHeader eyebrow="The Evening" heading="About Collective '26" />
        <FadeUp>
          <p className="text-ink/90 text-lg leading-relaxed md:text-xl">
            {about.paragraph}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
