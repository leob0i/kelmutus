import { getPathname } from "@/i18n/navigation";
import { host } from "@/lib/seo";

type Locale = "fi" | "en";
// next-intl:n kääntäjäfunktio (getTranslations ilman namespacea)
type Translator = (key: string, values?: Record<string, string>) => string;

// Organisaation @id, johon sivukohtaiset skeemat viittaavat (ks. OrganizationJsonLd)
export const organizationRef = { "@id": `${host}/#organization` };

export const PHONE = "+358400283123";
export const EMAIL = "jari@kelmutus.fi";
export const BUSINESS_ID = "3578472-2";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61580610997021";

export function absoluteUrl(locale: Locale, href: string) {
  return host + getPathname({ locale, href });
}

export function breadcrumbSchema(
  locale: Locale,
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

// Palvelualue kaikille palveluille
const AREA_CITIES = [
  "Turku",
  "Uusikaupunki",
  "Rauma",
  "Pori",
  "Kristiinankaupunki",
  "Vaasa",
  "Pietarsaari",
  "Kokkola",
  "Helsinki",
  "Espoo",
  "Vantaa",
];

function areaServed(t: Translator) {
  return [
    ...AREA_CITIES.map((name) => ({ "@type": "City", name })),
    { "@type": "Country", name: t("schema.country") },
    { "@type": "Continent", name: t("schema.continent") },
  ];
}

// Neljä palvelua: nimi käännöksistä, kuvaus sivulla näkyvästä tekstistä
const services = {
  onsite: { href: "/palvelut", descriptionKey: "palvelut.onsite.body" },
  bags: { href: "/kutistepussit", descriptionKey: "kutistepussit.whatAre.body" },
  industrial: { href: "/teollisuuskelmutus", descriptionKey: "teollisuuskelmutus.intro" },
  boatService: { href: "/veneenhuollot", descriptionKey: "veneenhuollot.intro.body1" },
  shelter: { href: "/veneen-talvikatos", descriptionKey: "talvikatos.intro" },
} as const;

export type ServiceKey = keyof typeof services;

export function serviceSchema(
  locale: Locale,
  t: Translator,
  key: ServiceKey,
  offers?: object[]
) {
  const service = services[key];
  const name = t(`schema.services.${key}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description: t(service.descriptionKey),
    url: absoluteUrl(locale, service.href),
    inLanguage: locale,
    provider: organizationRef,
    areaServed: areaServed(t),
    ...(offers ? { offers } : {}),
  };
}

// Kelmutus paikan päällä: sivulla näkyvä hinta 45 € / m, alv 0 %, alle 10 m pulpettiveneet
export function onsitePriceOffer(t: Translator) {
  return {
    "@type": "Offer",
    name: t("palvelut.onsite.title"),
    description: t("palvelut.onsite.priceLine"),
    seller: organizationRef,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "45.00",
      priceCurrency: "EUR",
      unitCode: "MTR",
      valueAddedTaxIncluded: false,
    },
  };
}

// Sivuilla näkyvät kutistepussien esimerkkihinnat (alv 0 %, ks. footer.vatNote)
const bagPrices = {
  busterL: { model: "Buster L", price: "230.80", image: "/buster.l.jpg" },
  // kutistepussilla suojattu moottorivene kuljetusalustalla (kutistepussit-sivun hero)
  targa231: { model: "Targa 23.1", price: "351.00", image: "/saxdor.jpg" },
  // sama vene ja pussi kuin etusivun asennusvideossa
  axopar28: { model: "Axopar 28", price: "358.80", image: "/gallery/axopar28.jpg" },
} as const;

export type BagProductKey = keyof typeof bagPrices;

export function bagProductSchema(locale: Locale, t: Translator, key: BagProductKey) {
  const bag = bagPrices[key];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t("schema.product.name", { model: bag.model }),
    description: t("schema.product.description", { model: bag.model }),
    image: host + bag.image,
    brand: { "@type": "Brand", name: "Kelmutus.fi" },
    category: t("schema.services.bags"),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(locale, "/kutistepussit"),
      price: bag.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/MadeToOrder",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: bag.price,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
      seller: organizationRef,
    },
  };
}

// Etusivun "Näin tilaat kutistepussin" -vaiheet: sama teksti kuin sivulla näkyvässä listassa
export function orderHowToSchema(
  locale: Locale,
  t: Translator,
  steps: { title: string; text: string }[]
) {
  const url = `${absoluteUrl(locale, "/")}#tilaus`;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("home.order.title"),
    inLanguage: locale,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title.replace(/\.$/, ""),
      text: `${step.title} ${step.text}`,
      url,
    })),
  };
}

// Etusivun asennusvideo (public/axopar38.mp4). uploadDate = päivä, jolloin video lisättiin
// sivustolle (git), kesto videotiedostosta (37,8 s).
export function installVideoSchema(locale: Locale, t: Translator) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: t("schema.video.name"),
    description: t("home.install.body1"),
    thumbnailUrl: `${host}/axopar38-poster.jpg`,
    contentUrl: `${host}/axopar38.mp4`,
    uploadDate: "2026-02-07T11:00:42+02:00",
    duration: "PT38S",
    inLanguage: locale,
    publisher: organizationRef,
  };
}
