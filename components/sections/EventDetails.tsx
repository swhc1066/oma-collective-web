import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { event } from "@/lib/content";

export function EventDetails() {
  return (
    <section
      id="details"
      className="bg-cream py-24 md:py-32"
      aria-labelledby="details-heading"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <SectionHeader eyebrow="Details" heading="Event Information" />

        <div className="grid gap-12 md:grid-cols-2">
          <FadeUp>
            <h3 className="font-display text-maroon text-2xl mb-4">
              When
            </h3>
            <p className="text-ink/90 text-lg">{event.date.full}</p>
            <ul className="mt-4 space-y-1 text-ink/80">
              <li>Doors {event.time.doors}</li>
              <li>Dinner {event.time.dinner}</li>
              <li>Program {event.time.program}</li>
            </ul>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h3 className="font-display text-maroon text-2xl mb-4">
              Where
            </h3>
            <p className="text-ink/90 text-lg">{event.venue.name}</p>
            <p className="text-ink/80">{event.venue.addressLine1}</p>
            <p className="text-ink/80">{event.venue.addressLine2}</p>
            <a
              href={event.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-rust underline underline-offset-4 hover:text-maroon"
            >
              Get directions →
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
