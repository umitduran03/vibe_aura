import { 
  onAuthStateChanged, 
  type User, 
  GoogleAuthProvider, 
  OAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut,
  deleteUser,
  reauthenticateWithPopup,
  reauthenticateWithRedirect,
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc, increment, arrayUnion, deleteDoc } from "firebase/firestore";
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
 * Apple ile giriş yapar.
 * Apple Sign In, üçüncü parti sosyal giriş sunan uygulamalarda App Store'da zorunludur.
 * DEV ortamında popup, PROD ortamında redirect kullanır.
 */
export async function signInWithApple(): Promise<void> {
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");

  if (process.env.NODE_ENV === "development") {
    await signInWithPopup(auth, provider);
    return;
  }

  await signInWithRedirect(auth, provider);
}

/**
 * Kullanıcı hesabını kalıcı olarak siler.
 * Apple App Store Guideline 5.1.1(v) uyarınca tüm uygulamalarda bulunması zorunludur.
 * Önce re-authentication yapar (Firebase güvenlik gereği), ardından Firestore dokümanını
 * ve Firebase Auth hesabını siler.
 */
export async function deleteAccount(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user.");

  // Re-authentication: Firebase, hassas işlemler için bunu zorunlu kılar.
  try {
    const providerId = user.providerData[0]?.providerId;

    if (providerId === "apple.com") {
      const appleProvider = new OAuthProvider("apple.com");
      if (process.env.NODE_ENV === "development") {
        await reauthenticateWithPopup(user, appleProvider);
      } else {
        // Redirect modunda: pending_delete'i kaydet, redirect sonrası
        // AuthProvider tarafından completePendingDelete çağrılır.
        localStorage.setItem("pending_delete", "true");
        await reauthenticateWithRedirect(user, appleProvider);
        return; // Sayfa yeniden yüklenir, buraya ulaşılmaz
      }
    } else {
      const googleProvider = new GoogleAuthProvider();
      if (process.env.NODE_ENV === "development") {
        await reauthenticateWithPopup(user, googleProvider);
      } else {
        localStorage.setItem("pending_delete", "true");
        await reauthenticateWithRedirect(user, googleProvider);
        return; // Sayfa yeniden yüklenir, buraya ulaşılmaz
      }
    }
  } catch (err: any) {
    localStorage.removeItem("pending_delete");
    console.error("[deleteAccount] Re-authentication failed:", err);
    throw err;
  }

  // Popup modu (dev / native): re-auth tamamlandı, direkt sil.
  await _executeAccountDeletion(user);
}

/**
 * Redirect sonrası bekleyen hesap silme işlemini tamamlar.
 * AuthProvider tarafından handleRedirectResult() sonrası çağrılır.
 * localStorage'da "pending_delete" varsa mevcut kullanıcıyı siler.
 */
export async function completePendingDelete(): Promise<boolean> {
  const pending = localStorage.getItem("pending_delete");
  if (!pending) return false;

  localStorage.removeItem("pending_delete");

  const user = auth.currentUser;
  if (!user) return false;

  await _executeAccountDeletion(user);
  return true;
}

/**
 * Hesap silme işleminin asıl mantığı: token kaydet, Firestore sil, Auth sil.
 * Hem popup hem redirect akışı tarafından kullanılır.
 */
async function _executeAccountDeletion(user: User): Promise<void> {
  // Kalan token bakıyesini oku ve deleted_accounts'a kaydet (token farming önlemi)
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const remainingBalance = userSnap.exists()
      ? (userSnap.data().token_balance ?? 0)
      : 0;

    if (user.email) {
      const emailKey = user.email.replace(/\./g, "_dot_").replace(/@/g, "_at_");
      const deletedRef = doc(db, "deleted_accounts", emailKey);
      await setDoc(deletedRef, {
        email: user.email,
        token_balance: remainingBalance,
        deletedAt: serverTimestamp(),
      });
    }

    await deleteDoc(userRef);
  } catch (err) {
    console.warn("[deleteAccount] Pre-deletion snapshot failed (non-blocking):", err);
  }

  // Firebase Auth hesabını sil
  await deleteUser(user);
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
    return data.token_balance ?? INITIAL_TOKEN_BALANCE;
  }

  // Yeni kullanıcı — daha önce hesap açıp silmiş mi kontrol et.
  // Silmişse kalan token bakiyesiyle başlatılır (token farming önlemi).
  let startingBalance = INITIAL_TOKEN_BALANCE;
  if (user.email) {
    try {
      const emailKey = user.email.replace(/\./g, "_dot_").replace(/@/g, "_at_");
      const deletedRef = doc(db, "deleted_accounts", emailKey);
      const deletedSnap = await getDoc(deletedRef);

      if (deletedSnap.exists()) {
        startingBalance = deletedSnap.data().token_balance ?? 0;
        // Kullanıldı, temizle
        await deleteDoc(deletedRef);
      }
    } catch (err) {
      console.warn("[ensureUserDoc] deleted_accounts check failed (non-blocking):", err);
    }
  }

  await setDoc(userRef, {
    ...profileData,
    token_balance: startingBalance,
    streakCount: 0,
    lastAnalysisDate: null,
    lostStreakCount: 0,
    createdAt: serverTimestamp(),
  });

  return startingBalance;
}

/**
 * Firestore'daki users/{uid} dökümanını gerçek zamanlı dinler.
 * token_balance veya vipExpiry her değiştiğinde callback çağrılır.
 */
export function listenUserData(
  uid: string,
  callback: (data: { 
    balance: number; 
    vipExpiry: string | null; 
    gender: string | null; 
    preference: string | null; 
    hasAcceptedTerms: boolean;
    streakCount?: number;
    lastAnalysisDate?: string | null;
    lostStreakCount?: number;
  }) => void
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
        streakCount: data.streakCount ?? 0,
        lastAnalysisDate: data.lastAnalysisDate || null,
        lostStreakCount: data.lostStreakCount ?? 0,
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
