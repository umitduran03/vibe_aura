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
  
  try {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (siteKey) {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        
        // TODO (Faz 3 - Mobile Launch): 
        // Capacitor ile iOS ve Android native çıktıları alındığında,
        // aşağıdaki uygun provider'ları da eklemeliyiz:
        // iOS için: AppAttestProvider
        // Android için: PlayIntegrityProvider
        
        isTokenAutoRefreshEnabled: true,
      });

    } else {
      console.warn("[Firebase] App Check bypassed: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is missing. Safe-fail active.");
    }
  } catch (e) {
    console.warn("[Firebase] App Check error:", e);
  }
}

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Safari ITP: Force local persistence so auth sessions survive page reloads
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("[Firebase] setPersistence error:", err);
  });
}

export { app, storage, db, auth };
