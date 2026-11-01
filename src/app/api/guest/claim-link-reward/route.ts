import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { verifyRequest } from "@/lib/api-auth";

const LINK_REWARD_TOKENS = 5;

export async function POST(req: NextRequest) {
  try {
    if (!adminDb || !adminAuth) {
      return NextResponse.json(
        { error: "Backend admin configuration is missing" },
        { status: 500 }
      );
    }

    const verifiedUser = await verifyRequest(req);
    if (!verifiedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uid = verifiedUser.uid;
    const userRecord = await adminAuth.getUser(uid);

    const linkedProvider = userRecord.providerData.find(
      (p) => p.providerId === "google.com" || p.providerId === "apple.com"
    );

    if (!linkedProvider) {
      return NextResponse.json(
        { error: "No linked Google or Apple provider found on this account" },
        { status: 400 }
      );
    }

    const resolvedDisplayName =
      linkedProvider.displayName || userRecord.displayName || null;
    const resolvedEmail = linkedProvider.email || userRecord.email || null;
    const resolvedPhotoURL =
      linkedProvider.photoURL || userRecord.photoURL || null;

    const userRef = adminDb.collection("users").doc(uid);

    const result = await adminDb.runTransaction(async (tx) => {
      const userSnap = await tx.get(userRef);
      const data = userSnap.exists ? userSnap.data() || {} : {};

      if (data.linkRewardClaimed === true) {
        tx.set(
          userRef,
          {
            displayName: resolvedDisplayName,
            email: resolvedEmail,
            photoURL: resolvedPhotoURL,
            isGuest: false,
          },
          { merge: true }
        );
        return { awarded: 0, alreadyClaimed: true };
      }

      // Daha önce silinmiş bir Google hesabı tekrar bağlanıyorsa +5 ödül suistimalini önle
      let isPreviouslyDeletedEmail = false;
      if (resolvedEmail) {
        const emailKey = resolvedEmail
          .replace(/\./g, "_dot_")
          .replace(/@/g, "_at_");
        const deletedRef = adminDb!.collection("deleted_accounts").doc(emailKey);
        const deletedSnap = await tx.get(deletedRef);
        if (deletedSnap.exists) {
          isPreviouslyDeletedEmail = true;
          tx.delete(deletedRef);
        }
      }

      const awarded = isPreviouslyDeletedEmail ? 0 : LINK_REWARD_TOKENS;
      const currentBalance =
        typeof data.token_balance === "number" ? data.token_balance : 5;

      tx.set(
        userRef,
        {
          displayName: resolvedDisplayName,
          email: resolvedEmail,
          photoURL: resolvedPhotoURL,
          isGuest: false,
          linkRewardClaimed: true,
          linkedAt: FieldValue.serverTimestamp(),
          token_balance: currentBalance + awarded,
        },
        { merge: true }
      );

      return { awarded, alreadyClaimed: false };
    });

    return NextResponse.json({
      success: true,
      awarded: result.awarded,
      alreadyClaimed: result.alreadyClaimed,
      displayName: resolvedDisplayName,
      photoURL: resolvedPhotoURL,
    });
  } catch (error) {
    console.error("[claim-link-reward] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
