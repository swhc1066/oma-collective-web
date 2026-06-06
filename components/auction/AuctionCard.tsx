"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatValue, type AuctionItem } from "@/lib/auction";
import { AuctionDescription } from "@/components/auction/AuctionDescription";

interface AuctionCardProps {
  item: AuctionItem;
}

const placeholderClass =
  "flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-light-teal)_0%,var(--color-teal)_100%)] font-display text-sm tracking-[0.35em] text-white/85";

export function AuctionCard({ item }: AuctionCardProps) {
  return (
    <Dialog>
      <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white text-[var(--color-bg-maroon)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1">
        {/* The whole card is the trigger: an overlay button covering it, so
            clicking anywhere (not just the image) opens the modal. Keeping it a
            real <button> preserves keyboard focus, Enter/Space, and a label. */}
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`View details for ${item.title}`}
            className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-maroon)]"
          />
        </DialogTrigger>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-light-teal)]/40">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          ) : (
            <div aria-hidden="true" className={placeholderClass}>
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
            <span>{formatValue(item.value)}</span>
          </p>

          {item.description && (
            <AuctionDescription description={item.description} lineClamp={3} />
          )}

          {item.donor && (
            <p className="mt-auto font-display text-xs sm:text-sm !leading-[1.35] tracking-[0.3em] text-[var(--color-bg-maroon)]/70">
              Generously provided by {item.donor}
            </p>
          )}
        </div>
      </article>

      <DialogContent
        // No design-token layer in this project; supply brand surfaces here.
        className="overflow-hidden border-0 bg-white p-0 text-[var(--color-bg-maroon)] sm:max-w-xl [&_[data-slot=dialog-close]]:bg-white/80 [&_[data-slot=dialog-close]]:p-1.5 [&_[data-slot=dialog-close]]:opacity-100 [&_[data-slot=dialog-close]]:backdrop-blur-sm"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-light-teal)]/40">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="(min-width: 640px) 36rem, 100vw"
              className="object-cover"
            />
          ) : (
            <div aria-hidden="true" className={placeholderClass}>
              Photo
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <DialogTitle className="font-display text-3xl sm:text-4xl leading-[0.95] tracking-[0.01em] text-[var(--color-bg-maroon)]">
            {item.title}
          </DialogTitle>

          <p className="inline-flex w-max items-center gap-2 rounded-full bg-[var(--color-chartreuse)] px-3 py-1 font-display text-xs sm:text-sm tracking-[0.25em] text-[var(--color-bg-maroon)]">
            <span>Value</span>
            <span aria-hidden="true">·</span>
            <span>{formatValue(item.value)}</span>
          </p>

          <DialogDescription asChild>
            {item.description ? (
              <AuctionDescription description={item.description} />
            ) : (
              <p className="sr-only">
                {`Auction lot valued at ${formatValue(item.value)}.`}
              </p>
            )}
          </DialogDescription>

          {item.donor && (
            <p className="mt-2 font-display text-xs sm:text-sm !leading-[1.35] tracking-[0.3em] text-[var(--color-bg-maroon)]/70">
              Generously provided by {item.donor}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
