/**
 * Static copy + types for the auction page.
 *
 * Items themselves live in Vercel Blob (`auction/items.json`) and are managed
 * via the /admin area. See `lib/storage/blob.ts`.
 */

export type AuctionItem = {
  id: string;
  title: string;
  description: string;
  value: string;
  providedBy: string;
  photoUrl?: string;
};

export const auction = {
  eyebrow: "Collective '26",
  headline: "Silent Auction",
  intro:
    "Browse this evening's lots. Bidding details will be shared on site by the host.",
} as const;
