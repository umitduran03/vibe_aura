import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Vibes",
  description: "View your past vibe check results and analysis history.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
