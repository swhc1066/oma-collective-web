  /**
  Types and copy for the auction catalog page.
 */

  export type AuctionItem = {
    id: string;
    title: string;
    description: string | null;
    value: number | null;      // null displays as "Priceless"
    donor: string | null;      // displayed as "Generously provided by {donor}"
    image_url: string | null;
    display_order: number;
    status: "draft" | "published";
  };

export const auction = {
  eyebrow: "Collective '26",
  headline: "Live Auction",
  intro:
    "Browse this evening's lots. Bidding details will be shared on site by the host.",
} as const;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Format a lot's value as USD, or "Priceless" when null. */
export function formatValue(value: number | null): string {
  return value == null ? "Priceless" : usd.format(value);
}
