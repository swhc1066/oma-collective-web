import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { ticketTiers } from "@/lib/content";

export function Tickets() {
  return (
    <section
      id="tickets"
      className="bg-chartreuse py-24 md:py-32"
      aria-labelledby="tickets-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <SectionHeader eyebrow="Join Us" heading="Tickets & Sponsorships" />

        <div className="grid gap-6 md:grid-cols-3">
          {ticketTiers.map((tier, i) => (
            <FadeUp key={tier.name} delay={i * 0.06}>
              <div
                className={`flex h-full flex-col rounded-2xl border-2 p-8 transition-transform hover:-translate-y-1 ${
                  tier.featured
                    ? "border-maroon bg-cream"
                    : "border-maroon/30 bg-cream/70"
                }`}
              >
                <h3 className="font-display text-maroon text-3xl mb-2">
                  {tier.name}
                </h3>
                <p className="font-display text-rust text-4xl mb-4">
                  {tier.price}
                </p>
                <p className="text-ink/80 mb-6 flex-grow">
                  {tier.description}
                </p>
                <a
                  href={tier.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 font-display text-cream transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2 focus:ring-offset-chartreuse"
                >
                  Reserve →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <p className="mt-10 text-center text-sm text-maroon/70">
            Tickets processed via{" "}
            <span className="italic">[ticketing platform TBD]</span>. A portion
            of each ticket is tax-deductible to the extent allowed by law.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
