# VibeCheckr - Proje Durumu Raporu

Bu dosya, projenin mevcut mimarisini, tamamlanan modülleri, aktif geliştirme süreçlerini ve gelecek yol haritasını özetlemektedir.

## 1. Proje Özeti ve Hedef Kitle
*   **Amaç:** Google Gemini AI ve Groq altyapılarını kullanarak kullanıcıların fotoğraflarından ve kişisel bilgilerinden (yaş, burç vb.) eğlenceli analizler, uyum testleri ve "Reality Check" sunan premium bir uygulama.
*   **Hedef Kitle:** Sosyal medyada içerik paylaşmayı seven, modern "vibe" kültürüne ilgi duyan Gen-Z ve mobil kullanıcılar.
*   **Temel Vizyon:** Apple tarzı minimalist ve premium bir görsel dille, akıcı, performanslı ve gizemli bir kullanıcı deneyimi sunmak.

## 2. Kullanılan Teknolojiler (Tech Stack)
*   **Core:** Next.js 16.2.3 (App Router), React 19.2.
*   **Stil/Animasyon:** Tailwind CSS v4, Framer Motion (akıcı geçişler), Lucide React & React Icons.
*   **AI/Backend Orkestrasyonu:** Google Generative AI (Gemini Pro Vision) & Groq Fallback (Llama 3.3 70B) destekli "Smart Waterfall" mimarisi. Firebase (Firestore v12 & Admin SDK v13).
*   **Ödeme/Monetizasyon:** Polar (Webhook entegrasyonlu token satışı), RevenueCat (Capacitor entegrasyonu).
*   **Mobil/PWA:** Capacitor.js v8 ekosistemi (@capacitor/camera, haptics, push-notifications), PWA Manifest Entegrasyonu.
*   **Performans/Medya:** `browser-image-compression` (İstemci tarafı 800px / 400KB sıkıştırma).
*   **Durum Yönetimi:** Zustand (`useAppStore`, `useStreakStore`).

## 3. Tamamlanan Modüller ve Temel Özellikler
*   **Akıllı Waterfall Orkestratörü (AI Mimari):** Fotoğraf yüklenen analizlerde ana model olarak Gemini kullanılırken, fotoğrafsız (text-only) Extras özelliklerinde (örn: Delulu Check, Mood Reset) hız ve maliyet avantajı sağlayan Groq (Llama 3.3 70B) birinci model olarak kullanılmaktadır. Hata anında sistem diğer sağlayıcıya otomatik fallback yapar.
*   **Görsel Sıkıştırma (Client-side Compression):** Kullanıcıların yüklediği büyük fotoğraflar, API'ye gönderilmeden hemen önce istemci tarafında maksimum 800px ve 400KB olacak şekilde Base64 formatına sıkıştırılır, bu sayede hem hız hem de API maliyet tasarrufu sağlanır.
*   **Token & Güvenlik Mimarisi:** Analiz sonuçlarına ve modlara göre güncel token ekonomisi uygulanır (Duo=3, Delulu=10, Situationship=5, Rizz=2 vb.). Güvenlik sebebiyle bakiye düşürme (deduction) işlemi istemci yerine, doğrudan Firebase Admin SDK ile `route.ts` içerisinde (API katmanında) yapılır.
*   **Oyunlaştırılmış Streak (Seri) Sistemi:** Firebase senkronizasyonlu streak yapısı (`useStreakStore`). Seriyi kurtarmak için token harcama (burn recovery), rütbe sistemi ve Streak Info/Recovery modalları eklendi.
*   **Gelişmiş UX ve Performans İyileştirmeleri:** Şeffaf "v-wave" global preloader ile First Paint hızlandırıldı. Kritik olmayan ağır bileşenler (ResultCard, Modallar vb.) `next/dynamic` ile lazy load edilir ve arka planda prefetch yöntemiyle yüklenir.
*   **Gelişmiş SEO & PWA Altyapısı:** `layout.tsx` üzerinde tam teşekküllü WebApplication JSON-LD şemaları, OpenGraph meta etiketleri, Vercel Speed Insights ve Google Search Console doğrulamaları tamamlanmıştır.

## 4. Gelecek Adımlar (To-Do Listesi)
1.  **Sosyal Paylaşım Çıktıları:** Analiz sonuçlarının Instagram/TikTok Stories formatında doğrudan yüksek kaliteli görsel (Export as Image) olarak indirilip paylaşılması (`html-to-image` entegrasyonunun cihaz uyumluluğu için stabilize edilmesi).
2.  **AdMob Entegrasyonu:** Ücretsiz kullanıcılar için analiz öncesi ödüllü reklam (Rewarded Ads) mekanizmasının tam entegrasyonu (SSR hydration sorunlarına dikkat edilerek).
3.  **Yerelleştirme (i18n):** Uygulamanın tam İngilizce desteği ile global pazara açılması.

## 5. Kod Standartları ve Özel Kurallar
*   **Aesthetics First:** Her yeni bileşen estetik standartlara uymalı, ham renkler yerine gradyanlar ve yumuşak gölgeler kullanılmalıdır.
*   **No Ad-hoc Utils:** Kullanıcı talimatı gereği `@/lib/utils` (cn function) gibi dosyalar mevcut değilse template literals kullanılmalıdır.
*   **Strict Case-Sensitivity:** React bileşen isimlerinde ve importlarda büyük/küçük harf duyarlılığına kesinlikle dikkat edilmelidir.

---
*Son Güncelleme: 7 Haziran 2026*
