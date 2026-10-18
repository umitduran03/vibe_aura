import type { NextConfig } from "next";

const isMobileBuild = process.env.MOBILE_BUILD === 'true';

const nextConfig: NextConfig = {
  output: isMobileBuild ? 'export' : undefined,
  trailingSlash: isMobileBuild,
  images: {
    unoptimized: isMobileBuild,
  },

  // Büyük paketlerde otomatik tree-shaking — bundle boyutunu küçültür
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Production build'de console.log'ları kaldır — TBT iyileştirmesi
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  ...(isMobileBuild ? {} : {
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
     * kendi domain'imiz (thevibecheckr.com) üzerinden proxy'leyerek
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
    async redirects() {
      return [
        {
          source: "/:lang(en|tr)/trends/what-is-the-ick",
          destination: "/:lang/trends/what-is-an-ick",
          permanent: true,
        },
      ];
    },
  })
};

export default nextConfig;
