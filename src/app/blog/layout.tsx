import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — News & Behind the Scenes",
  description:
    "Behind-the-scenes stories, show announcements, and thoughts on the craft of magic from Jamie Leonard.",
  openGraph: {
    title: "Blog — Jamie Leonard Magic",
    description:
      "News, show updates, and behind-the-scenes stories from Jamie Leonard.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
