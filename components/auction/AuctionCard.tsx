import Image from "next/image";
import type { AuctionItem } from "@/lib/auction";

interface AuctionCardProps {
  item: AuctionItem;
}

export function AuctionCard({ item }: AuctionCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white text-[var(--color-bg-maroon)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-light-teal)]/40">
        {item.photoUrl ? (
          <Image
            src={item.photoUrl}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-light-teal)_0%,var(--color-teal)_100%)] font-display text-sm tracking-[0.35em] text-white/85"
          >
            Photo
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <h2 className="font-display text-2xl sm:text-3xl leading-[0.95] text-[var(--color-bg-maroon)]">
          {item.title}
        </h2>

        <p className="inline-flex w-max items-center gap-2 rounded-full bg-[var(--color-chartreuse)] px-3 py-1 font-display text-xs sm:text-sm tracking-[0.25em] text-[var(--color-bg-maroon)]">
          <span>Value</span>
          <span aria-hidden="true">·</span>
          <span>{item.value}</span>
        </p>

        <p className="text-base leading-relaxed text-[var(--color-bg-maroon)]/80">
          {item.description}
        </p>

        <p className="mt-auto font-display text-xs sm:text-sm tracking-[0.3em] text-[var(--color-bg-maroon)]/70">
          Provided by {item.providedBy}
        </p>
      </div>
    </article>
  );
}
