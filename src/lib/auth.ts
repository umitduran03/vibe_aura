import { 
  onAuthStateChanged, 
  type User, 
  GoogleAuthProvider, 
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { auth, db } from "./firebase";

const INITIAL_TOKEN_BALANCE = 5;

/**
 * Google ile giriş yapar.
 *
 * DEV ortamında (localhost): signInWithPopup kullanır.
 *   → Vercel reverse proxy localhost'ta çalışmadığı için redirect başarısız olur.
 *
 * PROD ortamında: signInWithRedirect kullanır.
 *   → Reverse Proxy sayesinde first-party olarak çalışır, Safari ITP bypass.
 */
export async function signInWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();

  if (process.env.NODE_ENV === "development") {
    // Localhost'ta popup kullan — redirect proxy gerektirdiği için çalışmaz
    await signInWithPopup(auth, provider);
    return;
  }

  await signInWithRedirect(auth, provider);
  // signInWithRedirect sayfayı yeniden yükler, bu satıra ulaşılmaz
}

/**
 * Sayfa yüklendiğinde redirect sonucunu kontrol eder.
 * AuthProvider tarafından initAuth() içinde await ile çağrılır.
 * Redirect sonucu varsa kullanıcıyı döner, yoksa null.
 *
 * 5 saniyelik timeout ile Safari'nin getRedirectResult'ı askıda
 * bırakma durumuna karşı koruma sağlar.
 */
export async function handleRedirectResult(): Promise<User | null> {
  try {
    const redirectPromise = getRedirectResult(auth);
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 5000)
    );

    const result = await Promise.race([redirectPromise, timeoutPromise]);

    if (result && "user" in result && result.user) {
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
  callback: (data: { balance: number; vipExpiry: string | null; gender: string | null; preference: string | null; hasAcceptedTerms: boolean }) => void
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
        preference: data.preference || null,
        hasAcceptedTerms: !!data.hasAcceptedTerms,
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

/**
 * Kullanıcının sözleşme onayını Firestore'a yazar.
 * Bu, hesap bazlı (account-level) bir guard'dır — localStorage değil.
 */
export async function acceptTerms(uid: string): Promise<void> {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { hasAcceptedTerms: true, termsAcceptedAt: serverTimestamp() }, { merge: true });
}
