"use client";

import { useEffect, useState } from "react";

/**
 * StickyAdBanner — Sayfanın altında yapışık reklam bandı.
 *
 * - 3 saniye sonra belirir (kullanıcı önce içerikle ilgilensin)
 * - X butonu ile kapatılabilir (session süresince tekrar çıkmaz)
 * - Mobilde 320×100, masaüstünde tam genişlik banner
 * - Masaüstünde zaten sidebar reklam var; isteğe bağlı olarak
 *   SHOW_ON_DESKTOP false yapılarak masaüstünde gizlenebilir.
 *
 * Google AdSense entegrasyonu:
 * Placeholder div'i <ins> tag'iyle değiştir, data-ad-slot gir.
 */

const SHOW_ON_DESKTOP = false; // masaüstünde sidebar var, gerek yok
const DELAY_MS = 3000;         // kaç ms sonra belirsin

export default function StickyAdBanner() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Masaüstünde gizle (sidebar var)
  if (!SHOW_ON_DESKTOP && isDesktop) return null;
  // Kullanıcı kapattıysa gizle
  if (closed) return null;
  // Henüz süre dolmadıysa gizle
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "728px",             // leaderboard genişliği (büyük ekranlar)
          background: "rgba(5,5,16,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          pointerEvents: "auto",
          animation: "slideUp 0.4s ease-out",
        }}
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
        `}</style>

        {/* Kapat butonu */}
        <button
          onClick={() => setClosed(true)}
          aria-label="Reklamı kapat"
          style={{
            position: "absolute",
            top: "4px",
            right: "6px",
            background: "rgba(255,255,255,0.07)",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
            color: "rgba(255,255,255,0.4)",
            fontSize: "11px",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Reklam etiketi */}
        <p style={{
          textAlign: "center",
          fontSize: "8px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
          margin: "4px 0 0",
          padding: 0,
        }}>
          Reklam
        </p>

        {/*
          ── GOOGLE ADSENSE ──────────────────────────────────────────
          Aşağıdaki placeholder div'i kaldırıp bu <ins> tag'ini aç:

          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "90px" }}
            data-ad-client="ca-pub-4394628220494584"
            data-ad-slot="XXXXXXXXXX"   ← Yeni bir "Banner" Ad Unit oluştur
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          ────────────────────────────────────────────────────────────
        */}

        {/* Placeholder */}
        <div style={{
          height: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.12)",
          fontSize: "11px",
        }}>
          <span style={{ opacity: 0.4 }}>📢</span>
          <span>Banner Reklam Alanı — 728 × 90</span>
        </div>
      </div>
    </div>
  );
}
