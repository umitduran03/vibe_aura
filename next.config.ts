import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Security Headers — Tüm sayfalara güvenlik başlıkları ekler.
   */
  async headers() {
    return [
      {
        // Firebase Auth iframe yollarını hariç tut — frame izni gerekli
        source: "/__/auth/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        // Diğer tüm sayfalar — SAMEORIGIN ile frame koruması
        source: "/((?!__/auth).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  /**
   * Vercel Reverse Proxy — Firebase Auth First-Party Domain
   *
   * Safari ITP, 3. parti çerezleri (cross-origin) engelliyor.
   * Bu rewrite kuralı, Firebase Auth'un /__/auth/* yollarını
   * kendi domain'imiz (thevibecheckr.vercel.app) üzerinden proxy'leyerek
   * "first-party" bağlamında çalışmasını sağlar.
   *
   * Sonuç: signInWithRedirect artık same-origin olarak değerlendirilir,
   * ITP çerez engellemesi devre dışı kalır.
   */
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://vibecheckr-9478f.firebaseapp.com/__/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
