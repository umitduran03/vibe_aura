import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Duo Compatibility Test — Check Your Chemistry",
  description:
    "Upload two photos and let our AI calculate your exact relationship chemistry, aura blend, and romantic compatibility. Free, instant, and brutally honest.",
  keywords: [
    "ai compatibility test",
    "duo compatibility check",
    "relationship chemistry ai",
    "soulmate test ai",
    "photo compatibility analysis",
    "zodiac compatibility test",
    "crush compatibility check",
  ],
  alternates: {
    canonical: "https://thevibecheckr.com/duo-compatibility",
  },
  openGraph: {
    title: "AI Duo Compatibility Test — VibeCheckr",
    description:
      "Are you soulmates or a walking disaster? Upload two selfies and our AI will decode your chemistry with savage honesty.",
    url: "https://thevibecheckr.com/duo-compatibility",
    type: "website",
  },
};

export default function DuoCompatibilityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
