import { getPathname } from "@/i18n/navigation";
import { host } from "@/lib/seo";

// Yrityksen @id, johon sivukohtaiset skeemat viittaavat (ks. LocalBusinessJsonLd)
export const businessRef = { "@id": `${host}/#business` };

export function absoluteUrl(locale: "fi" | "en", href: string) {
  return host + getPathname({ locale, href });
}

export function breadcrumbSchema(
  locale: "fi" | "en",
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.href),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceSchema({
  locale,
  href,
  name,
  description,
  serviceType,
  areaServed,
  offers,
}: {
  locale: "fi" | "en";
  href: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed: string[];
  offers?: object[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(locale, href),
    inLanguage: locale,
    provider: businessRef,
    areaServed: areaServed.map((area) => ({ "@type": "Place", name: area })),
    ...(offers ? { offers } : {}),
  };
}

// Esimerkkihinta (sama luku kuin sivulla näkyvä hinta)
export function priceOffer(name: string, price: string) {
  return {
    "@type": "Offer",
    name,
    price,
    priceCurrency: "EUR",
    seller: businessRef,
  };
}
