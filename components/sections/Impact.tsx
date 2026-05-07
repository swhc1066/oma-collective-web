import { BloomSection } from "./BloomSection";
import { impact } from "@/lib/content";

export function Impact() {
  return (
    <BloomSection id="impact" shape="maroon" textColor="text-white">
      <p className="font-display text-sm tracking-[0.3em] text-[var(--color-yellow)]">
        {impact.eyebrow}
      </p>
      <h2 id="impact-heading" className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl leading-[0.95] sm:leading-[0.9] max-w-2xl">
        {impact.headline}
      </h2>
      <ul className="mt-10 sm:mt-12 grid gap-8 sm:gap-12">
        {impact.items.map((item, i) => (
          <li key={item.title} className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 gap-y-2 items-baseline">
            <span className="font-display text-3xl sm:text-4xl text-[var(--color-yellow)] tabular-nums">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl">{item.title}</h3>
              <p className="mt-2 text-base sm:text-lg text-white/85 leading-relaxed max-w-prose">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </BloomSection>
  );
}
