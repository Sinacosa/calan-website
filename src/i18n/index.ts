import type { Locale } from "./config";
import type { SiteCopy } from "./types";
import { ar } from "./locales/ar";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { it } from "./locales/it";
import { ja } from "./locales/ja";
import { zh } from "./locales/zh";

export const translations: Record<Locale, SiteCopy> = { en, fr, es, de, zh, ja, ar, it };
