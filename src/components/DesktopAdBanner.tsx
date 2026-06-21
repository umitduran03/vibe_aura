"use client";

import { useEffect, useState } from "react";

/**
 * DesktopAdBanner — Sadece masaüstünde görünür (≥1024px).
 *
 * Her iki yana 160px genişliğinde, ekranın tamamına yayılan
 * bir alan verilir. Google AdSense data-ad-format="auto" ile
 * bu alana ne sığarsa kendisi doldurur.
 */
export default function DesktopAdBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!visible) return null;

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

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
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
