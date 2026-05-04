import { 
  onAuthStateChanged, 
  type User, 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { auth, db } from "./firebase";

const INITIAL_TOKEN_BALANCE = 5;

/**
 * Firebase error codes that indicate popup was blocked or closed.
 * These trigger the seamless redirect fallback.
 */
const POPUP_FALLBACK_ERRORS = new Set([
  "auth/popup-blocked",
  "auth/popup-closed-by-user",
  "auth/cancelled-popup-request",
  "auth/network-request-failed",
]);

/**
 * Callback to notify UI when redirect fallback is triggered.
 * Set by OnboardingScreen to show a toast.
 */
let _onRedirectFallback: (() => void) | null = null;

export function setOnRedirectFallback(cb: (() => void) | null) {
  _onRedirectFallback = cb;
}

/**
 * Google ile giriş yapar.
 * Strateji: Popup → başarısızsa Redirect fallback.
 * In-app tarayıcılar (Instagram, TikTok vb.) popup'ları engeller;
 * bu durumda sessizce signInWithRedirect'e geçer.
 */
export async function signInWithGoogle(): Promise<User | null> {
  const provider = new GoogleAuthProvider();

  try {
    // 1️⃣ Önce popup'ı dene
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err: any) {
    const errorCode: string = err?.code || "";
    console.warn("[Auth] Popup failed:", errorCode, err?.message);

    // 2️⃣ Popup engellendi — sessizce redirect'e geç
    if (POPUP_FALLBACK_ERRORS.has(errorCode)) {
      console.info("[Auth] Popup blocked → falling back to redirect...");
      _onRedirectFallback?.();

      // Kısa bir bekleme ile toast'un görünmesini sağla
      await new Promise((r) => setTimeout(r, 800));
      await signInWithRedirect(auth, provider);

      // signInWithRedirect sayfayı yeniden yükler,
      // bu satıra asla ulaşılmaz
      return null;
    }

    // 3️⃣ Diğer hatalar (unauthorized-domain vb.) — yukarı fırlat
    throw err;
  }
}

/**
 * Sayfa yüklendiğinde redirect sonucunu kontrol eder.
 * AuthProvider tarafından useEffect içinde çağrılmalıdır.
 * Eğer bir redirect sonucu varsa kullanıcıyı döner.
 */
export async function handleRedirectResult(): Promise<User | null> {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      console.info("[Auth] Redirect sign-in successful:", result.user.email);
      return result.user;
    }
    return null;
  } catch (err: any) {
    console.error("[Auth] Redirect result error:", err?.code, err?.message);
    return null;
  }
}

/**
 * Çıkış yapar.
 */
export async function logOut(): Promise<void> {
  await signOut(auth);

}

/**
 * Kullanıcı dökümanını kontrol eder ve profil verilerini günceller.
 * - Yoksa: users/{uid} oluşturur, profil bilgilerini yazar ve 5 jeton verir.
 * - Varsa: profil bilgilerini günceller ve mevcut token_balance'ı döner.
 */
export async function ensureUserDoc(user: User): Promise<number> {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  const profileData = {
    displayName: user.displayName || null,
    email: user.email || null,
    photoURL: user.photoURL || null,
    lastLoginAt: serverTimestamp(),
  };

  if (snap.exists()) {
    // Mevcut kullanıcı, profil bilgilerini güncelle
    await setDoc(userRef, profileData, { merge: true });
    
    const data = snap.data();
    const balance = data.token_balance ?? INITIAL_TOKEN_BALANCE;

    return balance;
  }

  // İlk kez giriş — hoş geldin hediyesi ve profil bilgileri
  await setDoc(userRef, {
    ...profileData,
    token_balance: INITIAL_TOKEN_BALANCE,
    createdAt: serverTimestamp(),
  });

  return INITIAL_TOKEN_BALANCE;
}

/**
 * Firestore'daki users/{uid} dökümanını gerçek zamanlı dinler.
 * token_balance veya vipExpiry her değiştiğinde callback çağrılır.
 */
export function listenUserData(
  uid: string,
  callback: (data: { balance: number; vipExpiry: string | null; gender: string | null; preference: string | null }) => void
): () => void {
  const userRef = doc(db, "users", uid);

  const unsubscribe = onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      const data = snap.data();
      const balance = data.token_balance ?? 0;
      let vipExpiry = null;
      
      // Handle Firebase Timestamp or string
      if (data.vipExpiry) {
        if (typeof data.vipExpiry.toDate === "function") {
          vipExpiry = data.vipExpiry.toDate().toISOString();
        } else {
          vipExpiry = String(data.vipExpiry);
        }
      }
      
      callback({ 
        balance, 
        vipExpiry,
        gender: data.gender || null,
        preference: data.preference || null
      });
    }
  }, (error) => {
    console.error("[Auth] User data dinleme hatası:", error);
  });

  return unsubscribe;
}

/**
 * Auth state değişikliğini dinler.
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Kullanıcının jeton bakiyesini atomik olarak düşürür.
 * @param uid Kullanıcı ID
 * @param amount Düşülecek miktar (solo=1, duo=2)
 */
export async function deductToken(uid: string, amount: number = 1): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    token_balance: increment(-amount),
  });

}

/**
 * Kullanıcının jeton bakiyesini atomik olarak artırır (satın alma / ödül).
 * @param uid Kullanıcı ID
 * @param amount Eklenecek jeton miktarı
 */
export async function addTokens(uid: string, amount: number): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    token_balance: increment(amount),
  });

}

/**
 * FCM Token'ı kullanıcı belgesindeki fcmTokens dizisine ekler.
 * arrayUnion sayesinde aynı token tekrar eklenmez, farklı cihaz token'ları birikir.
 */
export async function saveFcmToken(uid: string, token: string): Promise<void> {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    fcmTokens: arrayUnion(token),
  });

}

/**
 * Kullanıcının gender ve preference verilerini kaydeder.
 */
export async function saveUserPreferences(uid: string, gender: string, preference: string): Promise<void> {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { gender, preference }, { merge: true });
}
