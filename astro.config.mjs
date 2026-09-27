import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://calan.app",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404/") && !page.endsWith("/404"),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          fr: "fr",
          es: "es",
          de: "de",
          zh: "zh-CN",
          ja: "ja",
          ar: "ar",
          it: "it",
        },
      },
      serialize(item) {
        const defaultLink = item.links?.find((link) => link.lang === "en");

        if (!defaultLink) return item;

        return {
          ...item,
          links: [...item.links, { lang: "x-default", url: defaultLink.url }],
        };
      },
    }),
  ],
  build: {
    format: "directory",
  },
});
