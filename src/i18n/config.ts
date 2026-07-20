export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const localeLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Valor do atributo <html lang>. */
export const htmlLangAttr: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

/** Valor de og:locale. */
export const ogLocaleAttr: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};
