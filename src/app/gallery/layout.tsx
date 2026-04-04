import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Photos & Performances",
  description:
    "Photos from Jamie Leonard's live performances, Edinburgh Fringe shows, weddings, corporate events, and private parties.",
  openGraph: {
    title: "Gallery — Jamie Leonard Magic",
    description:
      "Live performance photos from Jamie Leonard's magic shows and events.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
