import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fi", "en"],
  defaultLocale: "fi",

  // tärkeä: fi = ilman prefiksiä, en = /en
  localePrefix: "as-needed",

  // turvallinen: ei automaattisia redirectejä selaimen kielestä
  localeDetection: false
});

export type Locale = (typeof routing.locales)[number];
