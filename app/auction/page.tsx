import type { Metadata } from "next";
import { AuctionCard } from "@/components/auction/AuctionCard";
import { DonationCard } from "@/components/auction/DonationCard";
import { auction, type AuctionItem } from "@/lib/auction";
import { createStaticClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Live Auction — Collective '26",
  description: "Auction items for Collective '26 at Kaneko.",
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function AuctionPage() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("auction_lots")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  const items = (data ?? []) as AuctionItem[];

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

        <section
          aria-label="Auction items"
          className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <AuctionCard key={item.id} item={item} />
          ))}
          <DonationCard />
        </section>
      </div>
    </main>
  );
}
