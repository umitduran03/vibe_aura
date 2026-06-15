import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Reply Guru AI — Craft the Perfect Text",
  description:
    "Mind games? Won. Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply. Never stress about what to text back again.",
  keywords: [
    "what to text back",
    "ai text generator",
    "toxic text replies",
    "mind games text",
    "flirty text generator",
    "how to reply to my crush",
  ],
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/reply-guru",
  },
  openGraph: {
    title: "The Reply Guru AI — VibeCheckr",
    description:
      "Mind games? Won. Drop the screenshot and let our AI craft the perfect toxic, cool, or safe reply.",
    url: "https://thevibecheckr.vercel.app/reply-guru",
    type: "website",
  },
};

export default function ReplyGuruLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
