import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Sadece tarayıcı (istemci) tarafında App Check başlat.
if (typeof window !== "undefined") {
  // Geliştirme (Localhost) ortamı için debug token mekanizması
  if (process.env.NODE_ENV !== "production") {
    (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
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
      console.log("[Firebase] App Check initialized.");
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

export { app, storage, db, auth };
