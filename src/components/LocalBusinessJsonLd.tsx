import {getTranslations} from "next-intl/server";
import {JsonLd} from "@/components/JsonLd";
import {absoluteUrl} from "@/lib/schema";
import {host as HOST} from "@/lib/seo";

export async function LocalBusinessJsonLd({locale}: {locale: "fi" | "en"}) {
  const t = await getTranslations({locale});

  const services = [
    {name: t("kutistepussit.hero.title"), description: t("kutistepussit.meta.description"), href: "/kutistepussit"},
    {name: t("palvelut.services.0.title"), description: t("palvelut.services.0.desc"), href: "/palvelut"},
    {name: t("palvelut.services.1.title"), description: t("palvelut.services.1.desc"), href: "/palvelut"},
    {name: t("palvelut.services.2.title"), description: t("palvelut.services.2.desc"), href: "/palvelut"},
    {name: t("veneenhuollot.hero.title"), description: t("veneenhuollot.meta.description"), href: "/veneenhuollot"}
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${HOST}/#website`,
        url: HOST,
        name: "Kelmutus.fi",
        inLanguage: ["fi", "en"],
        publisher: {"@id": `${HOST}/#business`}
      },
      {
        "@type": "LocalBusiness",
        "@id": `${HOST}/#business`,
        name: "Kelmutus.fi",
        legalName: "ShrinkPro Finland Oy",
        taxID: "3578472-2",
        url: HOST,
        telephone: "+358400283123",
        email: "jari@kelmutus.fi",
        image: `${HOST}/opengraph-image.jpg`,
        logo: `${HOST}/logo.png`,
        description: t("home.meta.description"),
        slogan: t("home.hero.title"),
        sameAs: ["https://www.facebook.com/profile.php?id=61580610997021"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "FI"
        },
        // Pussit toimitetaan koko Suomeen, paikan päällä kelmutus pääkaupunkiseudulla
        areaServed: [
          {"@type": "Country", name: "Finland"},
          {"@type": "AdministrativeArea", name: t("schema.capitalRegion")},
          {"@type": "City", name: "Helsinki"},
          {"@type": "City", name: "Espoo"},
          {"@type": "City", name: "Vantaa"}
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+358400283123",
          email: "jari@kelmutus.fi",
          availableLanguage: ["fi", "en"]
        },
        employee: {
          "@type": "Person",
          name: t("meista.person.name"),
          jobTitle: t("meista.person.title")
        },
        knowsAbout: t.raw("schema.knowsAbout"),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("palvelut.hero.title"),
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              url: absoluteUrl(locale, s.href)
            }
          }))
        }
      }
    ]
  };

  return <JsonLd data={schema} />;
}
