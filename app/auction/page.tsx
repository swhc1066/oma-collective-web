import type { Metadata } from "next";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { auction } from "@/lib/auction";

export const metadata: Metadata = {
  title: "Silent Auction — Collective '26",
  description: "Auction items for Collective '26 at Kaneko.",
  robots: { index: false, follow: false },
};

export default function AuctionPage() {
  const items = auction.items;
  const hasItems = items.length > 0;

  return (
    <main className="min-h-dvh bg-[var(--color-bg-maroon)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
        <header className="text-center">
          <p className="font-display text-xs sm:text-sm tracking-[0.35em] uppercase text-[var(--color-yellow)]">
            {auction.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] text-white">
            {auction.headline}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-white/85">
            {auction.intro}
          </p>
        </header>

        {hasItems ? (
          <section
            aria-label="Auction items"
            className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <section
            aria-label="Auction items"
            className="mt-20 rounded-2xl border border-white/15 px-8 py-16 text-center"
          >
            <p className="font-display text-2xl sm:text-3xl tracking-wide text-white">
              No items yet
            </p>
            <p className="mx-auto mt-4 max-w-md text-base text-white/75">
              Check back closer to the event — lots will be posted here as they are confirmed.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
