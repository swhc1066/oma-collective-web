"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { donationCard } from "@/lib/auction";
import { AuctionDescription } from "@/components/auction/AuctionDescription";

const modalDescription = `${donationCard.subtitle}\n\n${donationCard.body}`;
const cardPreview = modalDescription;

export function DonationCard() {
  return (
    <Dialog>
      <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white text-[var(--color-bg-maroon)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1">
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`View details for ${donationCard.title}`}
            className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-maroon)]"
          />
        </DialogTrigger>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-light-teal)]/40">
          <Image
            src={donationCard.image}
            alt="Old Market street at night"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <h2 className="font-display text-2xl sm:text-3xl leading-[0.95] text-[var(--color-bg-maroon)]">
            {donationCard.title}
          </h2>

          <AuctionDescription description={cardPreview} lineClamp={3} />

          <p className="mt-auto font-display text-xs sm:text-sm !leading-[1.35] tracking-[0.3em] text-[var(--color-bg-maroon)]/70">
            {donationCard.footer}
          </p>
        </div>
      </article>

      <DialogContent className="overflow-hidden border-0 bg-white p-0 text-[var(--color-bg-maroon)] sm:max-w-xl [&_[data-slot=dialog-close]]:bg-white/80 [&_[data-slot=dialog-close]]:p-1.5 [&_[data-slot=dialog-close]]:opacity-100 [&_[data-slot=dialog-close]]:backdrop-blur-sm">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-light-teal)]/40">
          <Image
            src={donationCard.image}
            alt="Old Market street at night"
            fill
            sizes="(min-width: 640px) 36rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <DialogTitle className="font-display text-3xl sm:text-4xl leading-[0.95] tracking-[0.01em] text-[var(--color-bg-maroon)]">
            {donationCard.title}
          </DialogTitle>

          <DialogDescription asChild>
            <AuctionDescription description={modalDescription} />
          </DialogDescription>

          <p className="font-display text-xs sm:text-sm !leading-[1.35] tracking-[0.3em] text-[var(--color-bg-maroon)]/70">
            {donationCard.footer}
          </p>

          <a
            href={donationCard.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-bg-maroon)] px-8 py-4 font-display text-base tracking-widest text-white transition hover:bg-[var(--color-inner-maroon)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg-maroon)]"
          >
            Donate
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
