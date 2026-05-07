import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collective '26 — Old Market Association of Omaha",
  description:
    "Join the Old Market Association on Saturday, June 6 at Kaneko for Collective '26, an evening supporting the arts and the Old Market.",
  metadataBase: new URL("https://example.com"), // TODO: replace with real domain
  openGraph: {
    title: "Collective '26 — Supporting the Arts",
    description:
      "Saturday, June 6 · Kaneko · Omaha. A fundraising dinner benefiting the Old Market Association.",
    url: "https://example.com",
    siteName: "Old Market Association of Omaha",
    locale: "en_US",
    type: "website",
    // TODO: add og-image.png at /public/og-image.png (1200x630)
  },
  twitter: {
    card: "summary_large_image",
    title: "Collective '26 — Supporting the Arts",
    description:
      "Saturday, June 6 · Kaneko · Omaha. A fundraising dinner benefiting the Old Market Association.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
