import { BloomSection } from "./BloomSection";
import { about, event } from "@/lib/content";

export function AboutWordmark() {
  return (
    <BloomSection id="about" shape="maroon" textColor="text-white">
      <h2 id="about-heading" className="font-display text-[14vw] leading-[0.85] tracking-tight sm:text-[12vw]">
        COLLECTIVE&nbsp;&apos;26
      </h2>
      <p className="mt-2 font-display text-2xl tracking-widest sm:text-3xl">
        {event.tagline.toUpperCase()}
      </p>
      <p className="mt-10 max-w-prose text-base sm:text-lg leading-relaxed">
        {about.paragraph}
      </p>
    </BloomSection>
  );
}
