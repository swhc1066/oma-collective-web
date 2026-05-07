import { event, oma } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-maroon)] text-white/85 px-6 sm:px-10 py-16">
      <div className="mx-auto max-w-3xl grid gap-10 sm:grid-cols-2">
        <div>
          <p className="font-display text-2xl text-white">
            {event.name} &middot; {event.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            {event.date.full}<br />
            {event.venue.name} &middot; {event.venue.addressLine1}, {event.venue.addressLine2}
          </p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="font-display tracking-widest text-white">
            {oma.legalName}
          </p>
          <p className="mt-3">
            <a className="underline underline-offset-4 hover:text-white" href={`mailto:${oma.email}`}>
              {oma.email}
            </a>
          </p>
          <div className="mt-3 flex gap-5">
            <a className="underline underline-offset-4 hover:text-white" href={oma.socials.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a className="underline underline-offset-4 hover:text-white" href={oma.socials.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
