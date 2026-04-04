import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blink of an Eye — Jamie Leonard's Edinburgh Fringe Show",
  description:
    "Blink of an Eye: a five-star, story-driven hour of comedy and close-up magic from Jamie Leonard. Edinburgh Fringe 2026 at Liquid Rooms. Book now.",
  openGraph: {
    title: "Blink of an Eye — Jamie Leonard Magic",
    description:
      "Five-star comedy magic at the Edinburgh Fringe. A sharp, story-driven hour that will leave heads spinning.",
  },
};

export default function TheShowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
