import { signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { auth, db } from "./firebase";

const INITIAL_TOKEN_BALANCE = 5;

/**
 * Anonim giriş yapar.
 * Başarılı olursa Firebase User döner.
 */
export async function signInAnon(): Promise<User> {
  const result = await signInAnonymously(auth);
  console.log("[Auth] Anonim giriş başarılı. UID:", result.user.uid);
  return result.user;
}

/**
 * Kullanıcı dökümanını kontrol eder.
 * - Yoksa: users/{uid} oluşturur ve 5 jeton verir.
 * - Varsa: mevcut token_balance'ı döner.
 */
export async function ensureUserDoc(uid: string): Promise<number> {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const data = snap.data();
    const balance = data.token_balance ?? INITIAL_TOKEN_BALANCE;
    console.log("[Auth] Mevcut kullanıcı bulundu. Token:", balance);
    return balance;
  }

  // İlk kez giriş — hoş geldin hediyesi
  await setDoc(userRef, {
    token_balance: INITIAL_TOKEN_BALANCE,
    createdAt: serverTimestamp(),
  });
  console.log("[Auth] Yeni kullanıcı oluşturuldu. Hoş geldin hediyesi:", INITIAL_TOKEN_BALANCE);
  return INITIAL_TOKEN_BALANCE;
}

/**
 * Firestore'daki users/{uid} dökümanını gerçek zamanlı dinler.
 * token_balance veya vipExpiry her değiştiğinde callback çağrılır.
 */
export function listenUserData(
  uid: string,
  callback: (data: { balance: number; vipExpiry: string | null }) => void
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
      
      callback({ balance, vipExpiry });
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
  console.log(`[Auth] ${amount} jeton düşüldü. UID:`, uid);
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
  console.log(`[Auth] ${amount} jeton eklendi. UID:`, uid);
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
  console.log(`[Auth] FCM Token saved to array. UID:`, uid);
}

