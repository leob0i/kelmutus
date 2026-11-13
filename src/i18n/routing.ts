import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fi", "en"],
  defaultLocale: "fi",

  // tärkeä: fi = ilman prefiksiä, en = /en
  localePrefix: "as-needed",

  // turvallinen: ei automaattisia redirectejä selaimen kielestä
  localeDetection: false,

  // hreflang-linkit tulevat vain sivun metadatasta (lib/seo.ts). Middlewaren oma
  // Link-header tekisi jokaiselle sivulle toisen hreflang-sarjan.
  alternateLinks: false
});

export type Locale = (typeof routing.locales)[number];
