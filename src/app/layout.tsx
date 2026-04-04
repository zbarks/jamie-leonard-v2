import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: "Jamie Leonard Magic | Award-Winning Magician in Edinburgh",
    template: "%s | Jamie Leonard Magic",
  },
  description:
    "Jamie Leonard is one of the UK's top rising stars in magic. Five-star reviews, sell-out Edinburgh Fringe shows, and unforgettable close-up magic for weddings, corporate events, and private parties.",
  keywords: [
    "Jamie Leonard",
    "Jamie Leonard Magic",
    "Edinburgh magician",
    "close-up magician Edinburgh",
    "wedding magician Scotland",
    "corporate magician UK",
    "Edinburgh Fringe magician",
    "Blink of an Eye magic show",
    "hire a magician Edinburgh",
    "best magician Scotland",
  ],
  openGraph: {
    title: "Jamie Leonard Magic | Award-Winning Magician in Edinburgh",
    description:
      "One of the UK's top rising stars in magic. Five-star Fringe reviews, sell-out shows, and world-class close-up magic for any event.",
    url: "https://jamieleonardmagic.com",
    siteName: "Jamie Leonard Magic",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamie Leonard Magic",
    description:
      "Award-winning Edinburgh magician. Five-star Fringe shows, unforgettable close-up magic.",
  },
  metadataBase: new URL("https://jamieleonardmagic.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jamie Leonard",
              url: "https://jamieleonardmagic.com",
              jobTitle: "Magician",
              description:
                "One of the UK's top rising stars in magic. Five-star Edinburgh Fringe reviews, sell-out shows, and world-class close-up magic.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Edinburgh",
                addressCountry: "GB",
              },
              sameAs: [
                "https://www.instagram.com/jamieleonardmagic/",
              ],
              performerIn: {
                "@type": "Event",
                name: "Blink of an Eye",
                description:
                  "A sharp, story-driven hour of comedy and close-up magic from Jamie Leonard at the Edinburgh Fringe 2026.",
                startDate: "2026-08-08",
                endDate: "2026-08-30",
                location: {
                  "@type": "Place",
                  name: "Liquid Rooms (Warehouse)",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Edinburgh",
                    addressCountry: "GB",
                  },
                },
                offers: {
                  "@type": "Offer",
                  url: "https://edinburghfestival.datathistle.com/event/2980097-jamie-leonard-blink-of-an-eye/",
                },
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
