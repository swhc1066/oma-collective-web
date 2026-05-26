# Auction item photos

Drop auction item photos in this folder. Reference the filename from
`lib/auction.ts` as `photoFile` on the matching `AuctionItem`.

Guidelines:

- Format: JPG, PNG, or WebP.
- Aspect: 4:3 renders best (cards crop to `aspect-[4/3]`, `object-cover`).
- Size: target ~1200x900 max. `next/image` will resize down per viewport.
- Filename: lowercase, hyphenated (e.g. `kaneko-print-01.jpg`).

If `photoFile` is omitted on an item, the card renders a styled placeholder
block in its place.
