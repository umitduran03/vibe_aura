import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
    );

    if (Object.keys(serviceAccount).length > 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("[Firebase Admin] Başarıyla başlatıldı");
    } else {
      console.warn("[Firebase Admin] Service Account bilgileri bulunamadı. Backend yetkilendirme işlemleri çalışmayabilir.");
    }
  } catch (error) {
    console.error("[Firebase Admin] Başlatma Hatası:", error);
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;
