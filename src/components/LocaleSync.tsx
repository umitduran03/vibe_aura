"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

/**
 * URL path'inden locale'yi okuyup Zustand store'a yazar.
 * [lang]/layout.tsx'e eklenerek tüm alt sayfalarda çalışır.
 */
export default function LocaleSync({ lang }: { lang: string }) {
  const setLocale = useAppStore((s) => s.setLocale);
  const validLocale = lang === "tr" ? "tr" : "en";

  if (useAppStore.getState().locale !== validLocale) {
    useAppStore.setState({ locale: validLocale });
  }

  useEffect(() => {
    setLocale(validLocale);
  }, [validLocale, setLocale]);

  return null;
}
