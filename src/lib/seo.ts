import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";

export const host = "https://www.kelmutus.fi";
export const siteName = "Kelmutus.fi";

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

// Jakokuva (src/app/opengraph-image.jpg). Määritetään tässä erikseen, koska sivukohtainen
// openGraph korvaa juuritason tiedostosta tulevan kuvan.
const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
};

const shareImageAlt = {
  fi: "Kutistepussilla suojattu vene kuljetusalustalla – Kelmutus.fi",
  en: "Boat protected with a shrink wrap cover on a transport flatbed – Kelmutus.fi",
};

// Sivun metatiedot: title, description, canonical/hreflang sekä Open Graph ja Twitter.
export async function pageMetadata({
  locale,
  href,
  title,
  description,
}: {
  locale: "fi" | "en";
  href: string;
  title: string;
  description: string;
}): Promise<Metadata> {
  const alternates = await localizedAlternates(locale, href);
  const images = [{ ...shareImage, alt: shareImageAlt[locale] }];

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: "website",
      siteName,
      locale: locale === "en" ? "en_GB" : "fi_FI",
      alternateLocale: locale === "en" ? "fi_FI" : "en_GB",
      url: alternates.canonical,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
