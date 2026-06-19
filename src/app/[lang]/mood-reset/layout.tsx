import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mood Reset AI — Brutally Honest Wake-up Call",
  description:
    "Having a bad day? Get a brutally honest wake-up call from our AI to fix your mood, stop complaining, and recharge your vibe instantly.",
  keywords: [
    "mood reset",
    "ai motivation",
    "bad day fix",
    "wake up call ai",
    "stop complaining app",
    "vibe check reset",
  ],
  alternates: {
    canonical: "https://thevibecheckr.com/mood-reset",
  },
  openGraph: {
    title: "Mood Reset AI — VibeCheckr",
    description:
      "Bad day? Get a brutally honest wake-up call to fix your mood and recharge your vibe. Upload a photo and let the AI roast the negativity out of you.",
    url: "https://thevibecheckr.com/mood-reset",
    type: "website",
  },
};

export default function MoodResetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
