import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Battle AI — Compare Your Vibes",
  description:
    "Who has the higher aura? Upload two photos and let our AI clash your auras. Settle the debate, find out who has main character energy, and roast the loser.",
  keywords: [
    "aura battle",
    "vibe savaşı",
    "vibe check ai",
    "aura rating",
    "who is cooler ai",
    "friend group roast",
    "vibe compatibility",
  ],
  alternates: {
    canonical: "https://thevibecheckr.vercel.app/aura-battle",
  },
  openGraph: {
    title: "Aura Battle AI — VibeCheckr",
    description:
      "Who has more main character energy? Upload both your photos and let the AI clash your auras. The winner takes the crown, the loser gets brutally roasted.",
    url: "https://thevibecheckr.vercel.app/aura-battle",
    type: "website",
  },
};

export default function AuraBattleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
