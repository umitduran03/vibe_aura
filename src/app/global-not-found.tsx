// Global 404 for URLs that don't match any route (root layout lives under app/[lang]).
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  title: "404 — Page Not Found | VibeCheckr",
  description: "This page ghosted you. Head back to VibeCheckr for a free AI vibe check.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-dvh bg-[#050510] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-4 tracking-tight">
          You failed the vibe check.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
          Looks like this page ghosted you. It&apos;s not here anymore, or maybe it never was.
        </p>
        <div className="flex gap-3">
          <Link href="/en" className="px-8 py-4 rounded-full bg-white text-black font-bold">
            Take Me Home
          </Link>
          <Link href="/tr" className="px-8 py-4 rounded-full border border-white/20 text-white font-bold">
            Ana Sayfa
          </Link>
        </div>
      </body>
    </html>
  );
}
