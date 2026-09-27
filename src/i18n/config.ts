export const locales = ["en", "fr", "es", "de", "zh", "ja", "ar", "it"] as const;
export const translatedLocales = ["fr", "es", "de", "zh", "ja", "ar", "it"] as const;

export type Locale = (typeof locales)[number];
export type LocalizedPage = "" | "privacy" | "terms";

export const localeConfig: Record<Locale, {
  htmlLang: string;
  ogLocale: string;
  label: string;
  shortLabel: string;
  dir: "ltr" | "rtl";
}> = {
  en: { htmlLang: "en", ogLocale: "en_US", label: "English", shortLabel: "EN", dir: "ltr" },
  fr: { htmlLang: "fr", ogLocale: "fr_FR", label: "Français", shortLabel: "FR", dir: "ltr" },
  es: { htmlLang: "es", ogLocale: "es_ES", label: "Español", shortLabel: "ES", dir: "ltr" },
  de: { htmlLang: "de", ogLocale: "de_DE", label: "Deutsch", shortLabel: "DE", dir: "ltr" },
  zh: { htmlLang: "zh-CN", ogLocale: "zh_CN", label: "简体中文", shortLabel: "中文", dir: "ltr" },
  ja: { htmlLang: "ja", ogLocale: "ja_JP", label: "日本語", shortLabel: "日本語", dir: "ltr" },
  ar: { htmlLang: "ar", ogLocale: "ar_AR", label: "العربية", shortLabel: "AR", dir: "rtl" },
  it: { htmlLang: "it", ogLocale: "it_IT", label: "Italiano", shortLabel: "IT", dir: "ltr" },
};

export function getLocalizedPath(locale: Locale, page: LocalizedPage = ""): string {
  const suffix = page ? `${page}/` : "";
  return locale === "en" ? `/${suffix}` : `/${locale}/${suffix}`;
}
