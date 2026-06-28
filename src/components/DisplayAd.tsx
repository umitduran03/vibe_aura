"use client";

import { useEffect, useRef, useState } from "react";

/**
 * DisplayAd — Standart görüntülü (Display / Responsive) reklam bileşeni.
 *
 * Yükleme ekranları (AnalyzingScreen) gibi "in-article" formatının uygun olmadığı
 * yerlerde AdSense politikalarına 100% uyum sağlamak için kullanılır.
 */
export default function DisplayAd() {
  const insRef = useRef<HTMLModElement>(null);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    try {
      if (!insRef.current?.getAttribute("data-adsbygoogle-status")) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("DisplayAd AdSense error", e);
    }

    const observer = new MutationObserver(() => {
      const status = insRef.current?.getAttribute("data-ad-status");
      if (status === "unfilled") {
        if (insRef.current?.parentElement) {
          insRef.current.parentElement.style.display = "none";
        }
      } else if (status === "filled") {
        setIsFilled(true);
      }
    });

    if (insRef.current) {
      observer.observe(insRef.current, { attributes: true });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", overflow: "hidden" }}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-4394628220494584"
        data-ad-slot="5121721895"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
