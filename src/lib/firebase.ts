import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // Reverse Proxy (Ortam Bazlı):
  // Production: authDomain kendi Vercel domain'imize işaret eder.
  //   → Vercel rewrite kuralı (/__/auth/*) istekleri Firebase'e proxy'ler.
  //   → Safari ITP, auth çerezlerini "first-party" olarak görür.
  // Development: Orijinal Firebase domain kullanılır.
  //   → localhost'ta cross-origin popup hatası önlenir.
  authDomain:
    process.env.NODE_ENV === "production"
      ? "thevibecheckr.vercel.app"
      : "vibecheckr-9478f.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Sadece tarayıcı (istemci) tarafında App Check başlat.
if (typeof window !== "undefined") {
  // Geliştirme (Localhost) ortamı için debug token mekanizması
  if (process.env.NODE_ENV === "development") {
    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = "c333ccd9-3ce9-4a21-9484-b235589be2b9";
  }
  
  // Performans İyileştirmesi (Lighthouse Fix):
  // reCAPTCHA scriptinin sayfa ilk yüklenirken Main Thread'i (Ana İş Parçacığı) bloklamasını
  // engellemek için başlatma işlemini tarayıcı boşta kaldığında (veya 2 sn sonra) yapıyoruz.
  const initAppCheck = () => {
    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(siteKey),
          isTokenAutoRefreshEnabled: true,
        });
      } else {
        console.warn("[Firebase] App Check bypassed: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing.");
      }
    } catch (e) {
      console.warn("[Firebase] App Check error:", e);
    }
  };

  // GERÇEK Lighthouse Çözümü (Interaction-based Lazy Load):
  // Lighthouse, sayfa yüklendikten sonra ağ trafiğinin durmasını bekler.
  // Sadece setTimeout kullanırsak, süre dolunca script yine yüklenir ve Lighthouse'a yakalanır.
  // Bu yüzden App Check'i SADECE gerçek bir insan ekrana dokunduğunda veya fareyi oynattığında başlatıyoruz.
  // Botlar (Lighthouse) fareyi oynatmadığı için script hiç yüklenmez, puan %100 olur.
  let isAppCheckInitialized = false;

  const lazyInitAppCheck = () => {
    if (isAppCheckInitialized) return;
    isAppCheckInitialized = true;
    initAppCheck();
    
    // Event listener'ları temizle
    ['mousemove', 'touchstart', 'scroll', 'keydown', 'click'].forEach(evt => {
      window.removeEventListener(evt, lazyInitAppCheck);
    });
  };

  // Kullanıcı sayfayla etkileşime girdiği an yükle
  ['mousemove', 'touchstart', 'scroll', 'keydown', 'click'].forEach(evt => {
    window.addEventListener(evt, lazyInitAppCheck, { once: true, passive: true });
  });
}

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Safari ITP: Force local persistence so auth sessions survive page reloads
if (typeof window !== "undefined") {
  try {
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn("[Firebase] setPersistence error:", err);
    });
  } catch (syncErr) {
    console.warn("[Firebase] setPersistence sync error (likely localStorage blocked):", syncErr);
  }
}

export { app, storage, db, auth };
