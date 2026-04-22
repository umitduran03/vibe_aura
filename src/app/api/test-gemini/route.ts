import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    let geminiOk = false;
    let geminiErr = "";
    try {
      await ai.models.generateContent({ model: "gemini-2.5-flash", contents: [{"text": "Hello"}], config: { }});
      geminiOk = true;
    } catch (e: any) {
      geminiErr = e?.message || String(e);
    }

    let fbOk = false;
    let fbErr = "";
    if (adminDb) {
      try {
        await adminDb.collection("users").limit(1).get();
        fbOk = true;
      } catch (e: any) {
        fbErr = e?.message || String(e);
      }
    }

    return NextResponse.json({ geminiOk, geminiErr, fbOk, fbErr });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
