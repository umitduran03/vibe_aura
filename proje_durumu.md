# VibeCheckr - Proje Durumu Raporu

Bu dosya, projenin mevcut mimarisini, tamamlanan modülleri, aktif geliştirme süreçlerini ve gelecek yol haritasını özetlemektedir.

## 1. Proje Özeti ve Hedef Kitle
*   **Amaç:** Google Gemini AI altyapısını kullanarak kullanıcıların fotoğraflarından ve kişisel bilgilerinden (yaş, burç vb.) "Vibe Check & Personality Roast" analizi yapan premium bir eğlence uygulamasıdır.
*   **Hedef Kitle:** Sosyal medya etkileşimini seven, modern "vibe" kültürüne ilgi duyan Gen-Z ve mobil kullanıcılar.
*   **Temel Vizyon:** Apple tarzı minimalist ve premium bir görsel dille, gizemli ve eğlenceli bir kullanıcı deneyimi sunmak.

## 2. Kullanılan Teknolojiler (Tech Stack)
*   **Core:** Next.js 15+ (App Router), React 19.
*   **Stil/Animasyon:** Tailwind CSS 4, Framer Motion (akıcı geçişler), Lucide React (ikonlar).
*   **AI/Backend:** Google Generative AI (Gemini Pro Vision), Firebase (Firestore & Auth).
*   **Ödeme/Monetizasyon:** RevenueCat (Capacitor entegrasyonu — iOS & Android).
*   **Mobil:** Capacitor.js (Camera, Haptics, AdMob, Push Notifications).
*   **Durum Yönetimi:** Zustand.

## 3. Tamamlanan Modüller ve Temel Özellikler
*   **Wizard Flow:** Kullanıcıyı onboarding'den analiz sonucuna götüren çok adımlı interaktif akış (`WizardFlow.tsx`).
*   **AI Analiz Motoru:** Bireysel (Solo) ve İkili (Duo Match) analizleri gerçekleştiren, hata payı düşük ve retry mekanizmalı AI entegrasyonu.
*   **Görsel İşleme:** `browser-image-compression` ile optimize edilmiş fotoğraf yükleme ve Base64 işleme süreçleri.
*   **Premium UI Sistemi:** Glassmorphism, dinamik renk geçişleri ve dairesel maskeleme (Logo/Profil) ile oluşturulmuş arayüz.
*   **Geçmiş ve Kayıt:** Analiz sonuçlarının Firestore üzerine kaydedilmesi ve 15 günlük geçmişin listelenmesi.
*   **Token Sistemi:** Kullanıcıların analiz yapmasını sağlayan kredi/token mimarisi ve RevenueCat entegrasyonu.

## 4. Gelecek Adımlar (To-Do Listesi)
1.  **Sosyal Paylaşım:** Analiz sonuçlarının Instagram/TikTok formatında yüksek kaliteli görsel çıktı (Export as Image) olarak paylaşılması.
2.  **AdMob Entegrasyonu:** Ücretsiz kullanıcılar için analiz öncesi ödüllü reklam (Rewarded Ads) mekanizmasının aktifleştirilmesi.
3.  **Performans:** AI yanıt sürelerinin optimize edilmesi ve loading ekranlarındaki mikro-animasyonların zenginleştirilmesi.
4.  **Yerelleştirme:** Uygulamanın tam İngilizce desteği ile global pazara açılması.

## 5. Kod Standartları ve Özel Kurallar
*   **Aesthetics First:** Her yeni bileşen "Apple-like" estetik standartlarına uymalı, ham renkler yerine gradyanlar ve yumuşak gölgeler kullanılmalıdır.
*   **No Ad-hoc Utils:** Kullanıcı talimatı gereği `@/lib/utils` (cn function) gibi dosyalar mevcut değilse template literals kullanılmalıdır.
*   **Case Sensitivity:** React bileşen isimlerinde ve importlarda büyük/küçük harf duyarlılığına (Strict Case-Sensitivity) kesinlikle dikkat edilmelidir.

---
*Son Güncelleme: 19 Mayıs 2026*
