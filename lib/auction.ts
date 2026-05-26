/**
 * Auction items shown on the standalone /auction page.
 *
 * Single source of truth until the admin backend lands. Photos live in
 * `public/auction/`. `value` stays a pre-formatted string so we don't lock the
 * future backend into a numeric schema before it exists.
 */

export type AuctionItem = {
  id: string;
  title: string;
  description: string;
  value: string;
  providedBy: string;
  photoFile?: string;
};

export const auction = {
  eyebrow: "Collective '26",
  headline: "Silent Auction",
  intro:
    "Browse this evening's lots. Bidding details will be shared on site by the host.",
  items: [
    // TODO: replace placeholders before launch.
    {
      id: "placeholder-1",
      title: "Placeholder Lot 01",
      description:
        "Sample auction item. Replace this entry in lib/auction.ts with real lot copy and a photo in public/auction/.",
      value: "$0",
      providedBy: "Donor Name",
    },
    {
      id: "placeholder-2",
      title: "Placeholder Lot 02",
      description:
        "Sample auction item. Replace this entry in lib/auction.ts with real lot copy and a photo in public/auction/.",
      value: "$0",
      providedBy: "Donor Name",
    },
  ] satisfies readonly AuctionItem[],
} as const;
