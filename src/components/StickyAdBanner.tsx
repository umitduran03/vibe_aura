"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * StickyAdBanner — Sayfanın altında yapışık reklam bandı.
 *
 * Davranış:
 * - <ins> her zaman DOM'da ve görünür durumdadır (AdSense gizli elemente reklam doldurmaz).
 * - Wrapper height:0 / overflow:hidden olduğu için kullanıcı hiçbir şey görmez.
 * - AdSense "filled" döndüğünde wrapper açılır → banner aşağıdan kayarak belirir.
 * - "unfilled" veya cevap gelmezse → sessizce hiçbir şey olmaz.
 * - X'e basıldığında banner tamamen yok olur.
 * - Her sayfa/route değişiminde yeniden mount olur, yeni reklam varsa tekrar belirir.
 */

const BANNER_H = 96;
const TOTAL_OFFSET = BANNER_H + 8;

export default function StickyAdBanner() {
  const [filled,  setFilled]  = useState(false);
  const [closed,  setClosed]  = useState(false);
  const [desktop, setDesktop] = useState(false);
  const pathname = usePathname();

  const isSeoPage = ["/trends", "/faq", "/vibe-dictionary"].some((p) =>
    pathname?.includes(p)
  );

  const insRef = useRef<HTMLModElement>(null);

  /* Masaüstü tespiti */
  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* AdSense'i tetikle ve dolu/boş durumu dinle */
  useEffect(() => {
    if (desktop || isSeoPage || !insRef.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense banner error", e);
    }

    const observer = new MutationObserver(() => {
      const status = insRef.current?.getAttribute("data-ad-status");
      if (status === "filled") {
        setFilled(true); // → wrapper açılır, banner kayarak belirir
      }
      // "unfilled" → wrapper zaten height:0, hiçbir şey olmaz
    });

    observer.observe(insRef.current, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desktop, isSeoPage]);

  /* Body padding yönetimi */
  useEffect(() => {
    const show = filled && !closed && !desktop;
    document.body.style.paddingBottom = show ? `${TOTAL_OFFSET}px` : "";
    return () => { document.body.style.paddingBottom = ""; };
  }, [filled, closed, desktop]);

  const handleClose = () => {
    setClosed(true);
    document.body.style.paddingBottom = "";
  };

  if (desktop || isSeoPage) return null;

  return (
    <div
      role="complementary"
      aria-label="Reklam"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 45,
        display: "flex",
        justifyContent: "center",
        // Reklam dolana kadar sıfır yükseklik — kullanıcı hiçbir şey görmez
        height: filled && !closed ? `${BANNER_H}px` : 0,
        overflow: "hidden",
        transition: "height 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          height: `${BANNER_H}px`,
          background: "rgba(5,5,16,0.97)",
          borderTop: filled && !closed ? "1px solid rgba(255,255,255,0.09)" : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {filled && !closed && (
          <button
            onClick={handleClose}
            aria-label="Reklamı kapat"
            style={{
              position: "absolute",
              top: "5px",
              right: "6px",
              zIndex: 2,
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.45)",
              fontSize: "10px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}

        {filled && !closed && (
          <p style={{
            margin: "5px 28px 0 0",
            textAlign: "center",
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
          }}>
            Reklam
          </p>
        )}

        {/* <ins> her zaman görünür olmalı — AdSense gizli elemente reklam doldurmaz */}
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            height: "72px",
            // Reklam dolana kadar tamamen şeffaf — ama DOM'da ve görünür
            opacity: filled && !closed ? 1 : 0,
            pointerEvents: filled && !closed ? "auto" : "none",
          }}
          data-ad-client="ca-pub-4394628220494584"
          data-ad-slot="5121721895"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
