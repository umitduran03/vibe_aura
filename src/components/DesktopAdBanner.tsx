"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * DesktopAdBanner — Sadece masaüstünde görünür (≥1024px).
 * SEO sayfalarında (trends, faq, vibe-dictionary) gizlenir —
 * oralarda InArticleAd kullanılır.
 */
export default function DesktopAdBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // SEO sayfalarında gizle
  const isSeoPage = [
    "/trends", "/faq", "/vibe-dictionary",
    "/ai-roast-me", "/aura-battle", "/bff-vibe-check",
    "/crush-calculator", "/delulu-check", "/duo-compatibility",
    "/ex-compatibility", "/mood-reset", "/reply-guru",
    "/situationship-clarifier", "/soulmate-radar", "/toxic-ex-scanner",
    "/profile-autopsy"
  ].some((p) => pathname?.includes(p));

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!visible) return null;
  if (isSeoPage) return null;

  return (
    <>
      <AdColumn side="left" />
      <AdColumn side="right" />
    </>
  );
}

function AdColumn({ side }: { side: "left" | "right" }) {
  const positionStyle: React.CSSProperties =
    side === "left"
      ? { left: "calc(50% - 215px - 20px - 160px)" }
      : { right: "calc(50% - 215px - 20px - 160px)" };

  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Zaten başlatılmışsa tekrar push etme (Strict Mode / hot-reload koruması)
      if (!insRef.current?.getAttribute("data-adsbygoogle-status")) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "40px",
        bottom: "40px",
        width: "160px",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        ...positionStyle,
      }}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "160px", height: "100%" }}
        data-ad-client="ca-pub-4394628220494584"
        data-ad-slot="7073630645"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
