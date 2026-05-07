import { oma } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-maroon py-16 text-cream">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between md:px-12">
        <div className="text-center md:text-left">
          <p className="font-display text-xl">{oma.legalName}</p>
          <p className="text-cream/70 text-sm mt-1">
            A 501(c)(3) nonprofit · EIN {oma.ein}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 text-sm md:items-end">
          <a
            href={`mailto:${oma.email}`}
            className="text-cream/90 hover:text-cream"
          >
            {oma.email}
          </a>
          <div className="flex gap-4 mt-2">
            <a
              href={oma.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 hover:text-cream"
            >
              Instagram
            </a>
            <a
              href={oma.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 hover:text-cream"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
