import "server-only";

const dictionaries = {
  en: () =>
    import("../../dictionaries/en.json").then((mod) => mod.default),
  tr: () =>
    import("../../dictionaries/tr.json").then((mod) => mod.default),
};

export type Locale = keyof typeof dictionaries;

export const SUPPORTED_LOCALES: Locale[] = ["en", "tr"];
export const DEFAULT_LOCALE: Locale = "en";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
