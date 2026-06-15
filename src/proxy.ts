import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "tr"] as const;
const DEFAULT_LOCALE = "en";

type Locale = (typeof SUPPORTED_LOCALES)[number];

function getLocale(request: NextRequest): Locale {
  // Accept-Language header'dan dil tespit et
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  // "tr-TR,tr;q=0.9,en-US;q=0.8" → ["tr", "en"] gibi parse et
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase())
    .find((lang): lang is Locale =>
      SUPPORTED_LOCALES.includes(lang as Locale)
    );

  return preferred ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Hariç tutulan yollar (Firebase Auth, API'ler, statik dosyalar) ───
  // Bu yollar dil yönlendirmesinden TAMAMEN muaftır.
  if (
    pathname.startsWith("/__/auth") || // Firebase Auth reverse proxy
    pathname.startsWith("/api/") ||    // Backend API route'ları
    pathname.startsWith("/_next/") ||  // Next.js dahili
    pathname.startsWith("/favicon") || // Favicon
    pathname.startsWith("/v-wave") ||  // Statik görseller
    pathname.startsWith("/opengraph") ||
    pathname.startsWith("/vibecheckr") ||
    pathname.startsWith("/icons/") ||
    pathname.includes(".") // Uzantılı dosyalar (.png, .ico, .json vb.)
  ) {
    return NextResponse.next();
  }

  // Pathname'de zaten desteklenen bir locale var mı?
  const pathnameLocale = SUPPORTED_LOCALES.find(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameLocale) {
    // Zaten doğru locale'de, devam et
    return NextResponse.next();
  }

  // Locale yok → tespit et ve yönlendir
  const locale = getLocale(request);
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(newUrl, { status: 307 });
}

export const config = {
  matcher: [
    /*
     * Eşleştir: API route'ları, _next, statik dosyalar HARİÇ her şey.
     * Firebase Auth yolları (/__/auth) middleware içinde manuel olarak hariç tutuldu.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
