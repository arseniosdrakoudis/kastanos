import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kastanos Jewellery | Fine Jewellery & Custom Design - Kiti, Cyprus",
  description:
    "Family-owned jewellery boutique with 40 years of excellence. In-house manufacturing, custom design, repairs & restoration. Visit Kastanos Jewellery in Kiti, Larnaca.",
  keywords: [
    "fine jewellery",
    "custom jewellery design",
    "jewellery repairs",
    "wedding rings",
    "engagement rings",
    "baptism crosses",
    "gold jewellery",
    "silver jewellery",
    "diamond jewellery",
    "Kiti",
    "Larnaca",
    "Cyprus",
    "family jewellers",
  ],
  openGraph: {
    title: "Kastanos Jewellery | Fine Jewellery & Custom Design",
    description:
      "Family-owned jewellery boutique with 40 years of craftsmanship. In-house manufacturing, custom design, and expert repairs in Kiti, Cyprus.",
    type: "website",
    locale: "en_CY",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload hero AVIF clip for optimal LCP */}
        <link
          rel="preload"
          href="/hero-1.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        {/* Keep JPG as fallback preload for unsupported browsers */}
        <link
          rel="preload"
          href="/hero-poster.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
