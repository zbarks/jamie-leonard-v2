import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Shows — Archive",
  description:
    "Explore Jamie Leonard's past magic shows including Wonder Boy and previous Edinburgh Fringe sell-out runs.",
  openGraph: {
    title: "Past Shows — Jamie Leonard Magic",
    description:
      "The archive of Jamie Leonard's previous magic productions and Fringe runs.",
  },
};

export default function PastShowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
