import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Collective '26 — Old Market Association of Omaha",
  description:
    "Saturday, June 6, 2026 at Kaneko. A fundraising dinner supporting the Old Market Association of Omaha.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Collective '26 — Supporting the Arts",
    description:
      "Saturday, June 6 · Kaneko · Omaha. A fundraising dinner benefiting the Old Market Association.",
    url: "https://example.com",
    siteName: "Old Market Association of Omaha",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collective '26 — Supporting the Arts",
    description:
      "Saturday, June 6 · Kaneko · Omaha.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bug3big.css" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
