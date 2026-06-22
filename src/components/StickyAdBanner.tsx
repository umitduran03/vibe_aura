"use client";

import { useEffect, useState } from "react";

/**
 * StickyAdBanner — Sayfanın altında yapışık reklam bandı.
 *
 * Davranış:
 * - Sayfa açıldıktan 3 saniye sonra aşağıdan kayarak gelir.
 * - X'e basıldığında banner tamamen yok olur, boşluk kalmaz.
 *   Oturum boyunca (tab kapanana kadar) bir daha çıkmaz.
 * - Banner görünürken altındaki butonlar tıklanamaz sorunu:
 *   Banner'ın yüksekliği kadar <body>'e padding-bottom eklenir,
 *   böylece sayfa içeriği banner'ın üstüne sığar.
 * - Masaüstünde (≥1024px) sidebar reklamlar var, bu gizlenir.
 *
 * AdSense bağlanınca: Eğer Google o an için uygun reklam
 * bulamazsa <ins> tag'i kendiliğinden 0 yüksekliğe çöker,
 * useEffect içindeki yükseklik de buna göre güncellenir.
 */

const BANNER_H = 96;       // banner yüksekliği (px)
const PADDING = 8;         // banner üstü boşluk
const TOTAL_OFFSET = BANNER_H + PADDING;
const DELAY_MS = 3000;     // kaç ms sonra belirsin

export default function StickyAdBanner() {
  const [visible, setVisible]   = useState(false); // 3sn doldu mu
  const [closed,  setClosed]    = useState(false); // kullanıcı kapattı mı
  const [desktop, setDesktop]   = useState(false); // ≥1024px mi

  /* Masaüstü tespiti */
  useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Oturum hafızası — kullanıcı kapattıysa bir daha açma */
  useEffect(() => {
    if (sessionStorage.getItem("stickyAdClosed") === "1") {
      setClosed(true);
    }
  }, []);

  /* 3 saniye sonra göster */
  useEffect(() => {
    if (closed || desktop) return;
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, [closed, desktop]);

  /* Banner görünürken body'e padding ekle → alt butonlar tıklanabilir */
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
    sessionStorage.setItem("stickyAdClosed", "1");
    // padding'i anında temizle
    document.body.style.paddingBottom = "";
  };

  /* Masaüstünde sidebar var → gösterme */
  if (desktop)  return null;
  /* Kullanıcı kapattı → tamamen yok ol, boşluk yok */
  if (closed)   return null;
  /* Henüz 3sn dolmadı */
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
        zIndex: 45,          /* toast'lar (z-999+) üstünde değil, içeriğin üstünde */
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
          maxWidth: "430px",        /* uygulama genişliğiyle hizalı */
          height: `${BANNER_H}px`,
          background: "rgba(5,5,16,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Kapat butonu ── */}
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

        {/* ── Reklam etiketi ── */}
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

        {/*
          ── GOOGLE ADSENSE ─────────────────────────────────────────
          Aşağıdaki placeholder div'i silip bu kodu aç:

          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "72px" }}
            data-ad-client="ca-pub-4394628220494584"
            data-ad-slot="XXXXXXXXXX"   ← Mobil Banner Ad Unit slot ID
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
            }}
          />

          NOT: Eğer Google o an uygun reklam bulamazsa <ins> kendi
          kendine 0 yüksekliğe çöker. padding-bottom de gereksiz
          kalır ama sayfa bozulmaz.
          ───────────────────────────────────────────────────────────
        */}

        {/* Placeholder — AdSense aktif olunca bu div'i sil */}
        <div style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.1)",
          fontSize: "11px",
        }}>
          <span>📢</span>
          <span>Mobil Reklam Alanı — 320 × 72</span>
        </div>
      </div>
    </div>
  );
}
