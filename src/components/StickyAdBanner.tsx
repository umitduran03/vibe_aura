"use client";

import { useEffect, useState, useRef } from "react";

/**
 * StickyAdBanner — Sayfanın altında yapışık reklam bandı.
 *
 * Davranış:
 * - Sayfa açıldıktan 3 saniye sonra aşağıdan kayarak gelir.
 * - AdSense'den reklam istenilir. Eğer Google o an "reklam yok"
 *   (unfilled) yanıtı verirse, banner saniyesinde tamamen kendini imha eder.
 * - X'e basıldığında banner tamamen yok olur, boşluk kalmaz.
 * - Banner görünürken <body>'e padding-bottom eklenir.
 */

const BANNER_H = 96;
const TOTAL_OFFSET = BANNER_H + 8;
const DELAY_MS = 3000;

export default function StickyAdBanner() {
  const [visible, setVisible]   = useState(false);
  const [closed,  setClosed]    = useState(false);
  const [desktop, setDesktop]   = useState(false);
  
  const insRef = useRef<HTMLModElement>(null);

  /* Masaüstü tespiti */
  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* 30 dk bekleme mantığı — süre dolduysa yeniden göster */
  useEffect(() => {
    const closedAt = localStorage.getItem("stickyAdClosedAt");
    if (closedAt) {
      const elapsed = Date.now() - parseInt(closedAt, 10);
      if (elapsed < 10 * 60 * 1000) {
        // 30 dakika henüz dolmadı, gizle
        setClosed(true);
      } else {
        // 30 dakika geçti, eski kaydı sil ve tekrar göster
        localStorage.removeItem("stickyAdClosedAt");
      }
    }
  }, []);

  /* 3 saniye sonra göster ve AdSense'i tetikle */
  useEffect(() => {
    if (closed || desktop) return;
    
    const t = setTimeout(() => {
      setVisible(true);
      // Reklam kodunu pushla
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense banner error", e);
      }
    }, DELAY_MS);
    
    return () => clearTimeout(t);
  }, [closed, desktop]);

  /* Reklamın dolup dolmadığını (unfilled) dinle */
  useEffect(() => {
    if (!visible || closed || desktop || !insRef.current) return;

    // MutationObserver ile data-ad-status özniteliğini izleyelim
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
          const status = insRef.current?.getAttribute("data-ad-status");
          if (status === "unfilled") {
            // Google reklam bulamadı! Banner'ı hemen yok et.
            setClosed(true);
            document.body.style.paddingBottom = "";
          }
        }
      });
    });

    observer.observe(insRef.current, { attributes: true });
    return () => observer.disconnect();
  }, [visible, closed, desktop]);

  /* Body padding yönetimi */
  useEffect(() => {
    const show = visible && !closed && !desktop;
    if (show) {
      document.body.style.paddingBottom = `${TOTAL_OFFSET}px`;
    } else {
      document.body.style.paddingBottom = "";
    }
    return () => { document.body.style.paddingBottom = ""; };
  }, [visible, closed, desktop]);

  const handleClose = () => {
    setClosed(true);
    // Kapanma zamanını kaydet — 30 dk sonra yeniden açılacak
    localStorage.setItem("stickyAdClosedAt", String(Date.now()));
    document.body.style.paddingBottom = "";
  };

  if (desktop)  return null;
  if (closed)   return null;
  if (!visible) return null;

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
        animation: "adSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <style>{`
        @keyframes adSlideUp {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          height: `${BANNER_H}px`,
          background: "rgba(5,5,16,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          position: "relative",
          overflow: "hidden",
        }}
      >
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

        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "72px" }}
          data-ad-client="ca-pub-4394628220494584"
          data-ad-slot="5121721895"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
