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
  signInAnonymously,
  linkWithPopup,
  linkWithRedirect,
  signInWithCredential,
  updateProfile,
  type AuthCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc, increment, arrayUnion, deleteDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { getApiUrl } from "./api";

const INITIAL_TOKEN_BALANCE = 5;

// ─── Misafir (Guest) Hesap Sabitleri ───
// Redirect ile hesap bağlama sonrası ödülün tamamlanması için kullanılan bayrak
const PENDING_LINK_KEY = "pending_link_reward";
// Redirect sonrası kullanıcıya gösterilecek bağlama sonucu (toast için)
export const LINK_NOTICE_KEY = "guest_link_notice";

export type LinkProvider = "google" | "apple";

export type LinkResult =
  | { status: "linked"; awarded: number }
  | { status: "switched" }
  | { status: "redirecting" };

/**
 * Rastgele misafir kullanıcı adı üretir: "Guest" + 10 haneli sayı (örn. Guest4275585745).
 * İlk hane 1-9 arası seçilir, böylece ad her zaman 10 hanelidir.
 */
export function generateGuestName(): string {
  const digits = new Uint8Array(10);
  crypto.getRandomValues(digits);
  let num = String((digits[0] % 9) + 1);
  for (let i = 1; i < 10; i++) num += String(digits[i] % 10);
  return `Guest${num}`;
}

/**
 * Misafir olarak (Firebase Anonymous Auth) giriş yapar.
 * Kullanıcı adı ve Firestore dökümanı, onAuthStateChanged → ensureUserDoc içinde oluşturulur.
 */
export async function signInAsGuest(): Promise<void> {
  await signInAnonymously(auth);
}

function buildLinkProvider(type: LinkProvider) {
  if (type === "apple") {
    const p = new OAuthProvider("apple.com");
    p.addScope("email");
    p.addScope("name");
    return p;
  }
  return new GoogleAuthProvider();
}

function credentialFromLinkError(err: any): AuthCredential | null {
  return (
    GoogleAuthProvider.credentialFromError(err) ||
    OAuthProvider.credentialFromError(err) ||
    null
  );
}

/**
 * Misafir hesabı Google/Apple hesabına bağlar (aynı UID korunur → jetonlar, geçmiş, seri kaybolmaz).
 *
 * DEV: linkWithPopup → sonuç anında döner.
 * PROD: linkWithRedirect (Safari ITP uyumlu) → sayfa yenilenir, ödül AuthProvider'da tamamlanır.
 *
 * Seçilen hesap zaten kayıtlıysa (credential-already-in-use) iki hesap birleştirilemez;
 * kullanıcı mevcut hesaba geçirilir ve bağlama ödülü verilmez.
 */
export async function linkGuestAccount(type: LinkProvider): Promise<LinkResult> {
  const user = auth.currentUser;
  if (!user || !user.isAnonymous) throw new Error("Current user is not a guest.");

  const provider = buildLinkProvider(type);

  if (process.env.NODE_ENV === "development") {
    try {
      const credRes = await linkWithPopup(user, provider);
      await credRes.user.reload().catch(() => {});
    } catch (err: any) {
      if (err?.code === "auth/credential-already-in-use" || err?.code === "auth/email-already-in-use") {
        const cred = credentialFromLinkError(err);
        if (cred) {
          await signInWithCredential(auth, cred);
          return { status: "switched" };
        }
      }
      throw err;
    }
    const awarded = await finalizeGuestLink();
    return { status: "linked", awarded };
  }

  localStorage.setItem(PENDING_LINK_KEY, "true");
  await linkWithRedirect(user, provider);
  return { status: "redirecting" }; // Sayfa yeniden yüklenir
}

/**
 * Bağlama sonrası: Auth profilini Google/Apple bilgileriyle günceller ve
 * sunucudan tek seferlik bağlama ödülünü talep eder. Verilen jeton miktarını döner.
 */
export async function finalizeGuestLink(): Promise<number> {
  const user = auth.currentUser;
  if (!user || user.isAnonymous) return 0;

  const linked = user.providerData.find(
    (p) => p.providerId === "google.com" || p.providerId === "apple.com"
  );

  try {
    await updateProfile(user, {
      displayName: linked?.displayName || user.displayName,
      photoURL: linked?.photoURL || user.photoURL,
    });
  } catch (err) {
    console.warn("[finalizeGuestLink] updateProfile failed (non-blocking):", err);
  }

  const idToken = await user.getIdToken(true);
  const res = await fetch(getApiUrl("/api/guest/claim-link-reward"), {
    method: "POST",
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) {
    console.error("[finalizeGuestLink] claim failed:", res.status);
    return 0;
  }
  const data = await res.json().catch(() => ({}));
  return typeof data.awarded === "number" ? data.awarded : 0;
}

/**
 * Redirect ile bağlama sonrası bekleyen ödül varsa tamamlar.
 * AuthProvider tarafından, kullanıcı (artık anonim olmayan) yüklendikten sonra çağrılır.
 */
export async function completePendingGuestLink(): Promise<void> {
  if (localStorage.getItem(PENDING_LINK_KEY) !== "true") return;
  const user = auth.currentUser;
  if (!user) return;
  if (user.isAnonymous) {
    // Bağlama tamamlanmadı (iptal / hata) — bayrağı temizle
    localStorage.removeItem(PENDING_LINK_KEY);
    return;
  }
  localStorage.removeItem(PENDING_LINK_KEY);
  const awarded = await finalizeGuestLink();
  localStorage.setItem(LINK_NOTICE_KEY, JSON.stringify({ status: "linked", awarded }));
}

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

  // Misafir (anonim) kullanıcılar için OAuth re-authentication gerekmez / yapılamaz
  if (user.isAnonymous || user.providerData.length === 0) {
    await _executeAccountDeletion(user);
    return;
  }

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
      console.info("[Auth] Redirect sign-in successful:", result.user.email || result.user.uid);
      return result.user;
    }
    return null;
  } catch (err: any) {
    console.error("[Auth] Redirect result error:", err?.code, err?.message);
    // Misafir hesabı bağlanırken seçilen Google/Apple hesabı zaten kayıtlıysa,
    // mevcut hesaba geçiş yap ve kullanıcıyı bilgilendir.
    if (err?.code === "auth/credential-already-in-use" || err?.code === "auth/email-already-in-use") {
      try {
        localStorage.removeItem(PENDING_LINK_KEY);
        const cred = credentialFromLinkError(err);
        if (cred) {
          const switched = await signInWithCredential(auth, cred);
          localStorage.setItem(LINK_NOTICE_KEY, JSON.stringify({ status: "switched" }));
          return switched.user;
        }
      } catch (switchErr) {
        console.error("[Auth] Credential switch failed:", switchErr);
      }
    }
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

  // ─── Misafir (Anonim) Kullanıcı Akışı ───
  if (user.isAnonymous) {
    if (snap.exists()) {
      const data = snap.data();
      let guestName = data.displayName || user.displayName;
      if (!guestName) {
        guestName = generateGuestName();
      }
      if (user.displayName !== guestName) {
        updateProfile(user, { displayName: guestName }).catch(() => {});
      }
      await setDoc(
        userRef,
        {
          displayName: guestName,
          isGuest: true,
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
      return data.token_balance ?? INITIAL_TOKEN_BALANCE;
    }

    const guestName = user.displayName || generateGuestName();
    try {
      await updateProfile(user, { displayName: guestName });
    } catch (_) {
      // non-blocking
    }

    await setDoc(userRef, {
      displayName: guestName,
      email: null,
      photoURL: null,
      isGuest: true,
      token_balance: INITIAL_TOKEN_BALANCE,
      streakCount: 0,
      lastAnalysisDate: null,
      lostStreakCount: 0,
      lastLoginAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    return INITIAL_TOKEN_BALANCE;
  }

  // ─── Kalıcı (Google / Apple) Kullanıcı Akışı ───
  const linkedProvider = user.providerData.find(
    (p) => p.providerId === "google.com" || p.providerId === "apple.com"
  ) || user.providerData[0];

  const profileData = {
    displayName: linkedProvider?.displayName || user.displayName || null,
    email: linkedProvider?.email || user.email || null,
    photoURL: linkedProvider?.photoURL || user.photoURL || null,
    isGuest: false,
    lastLoginAt: serverTimestamp(),
  };

  if (snap.exists()) {
    // Mevcut kullanıcı (veya misafirden Google'a bağlanan kullanıcı), profil bilgilerini güncelle
    await setDoc(userRef, profileData, { merge: true });
    const data = snap.data();
    return data.token_balance ?? INITIAL_TOKEN_BALANCE;
  }

  // Yeni kullanıcı — daha önce hesap açıp silmiş mi kontrol et.
  // Silmişse kalan token bakiyesiyle başlatılır (token farming önlemi).
  let startingBalance = INITIAL_TOKEN_BALANCE;
  if (profileData.email) {
    try {
      const emailKey = profileData.email.replace(/\./g, "_dot_").replace(/@/g, "_at_");
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
    displayName: string | null;
    photoURL: string | null;
    isGuest: boolean;
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
        displayName: data.displayName || null,
        photoURL: data.photoURL || null,
        isGuest: !!data.isGuest,
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
