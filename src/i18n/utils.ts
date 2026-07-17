import { defaultLocale, locales, type Locale } from "./config";
import { translations } from "./translations";
import { withBase } from "../utils/url";

export function getLangFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split("/");
  if (locales.includes(maybeLocale as Locale)) return maybeLocale as Locale;
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return translations[lang];
}

export function localizePath(path: string, lang: Locale): string {
  const cleanPath = path === "/" ? "" : path;
  const localized = lang === defaultLocale ? path : `/${lang}${cleanPath}`;
  return withBase(localized);
}
