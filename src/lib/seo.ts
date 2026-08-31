import { getPathname } from "@/i18n/navigation";

const host = "https://www.kelmutus.fi";

export async function localizedAlternates(locale: "fi" | "en", href: string) {
  const [fi, en] = await Promise.all([
    getPathname({ locale: "fi", href }),
    getPathname({ locale: "en", href }),
  ]);

  return {
    canonical: host + (locale === "en" ? en : fi),
    languages: {
      fi: host + fi,
      en: host + en,
      "x-default": host + fi,
    },
  };
}
