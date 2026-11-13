import {getTranslations} from "next-intl/server";
import {JsonLd} from "@/components/JsonLd";
import {BUSINESS_ID, EMAIL, FACEBOOK_URL, PHONE, organizationRef} from "@/lib/schema";
import {host as HOST} from "@/lib/seo";

// Koko sivuston Organization + WebSite. Yrityksellä ei ole käyntiosoitetta, joten osoitetta ei merkitä.
export async function OrganizationJsonLd({locale}: {locale: "fi" | "en"}) {
  const t = await getTranslations({locale});

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${HOST}/#website`,
        url: HOST,
        name: "Kelmutus.fi",
        inLanguage: ["fi", "en"],
        publisher: organizationRef
      },
      {
        "@type": "Organization",
        ...organizationRef,
        name: "Kelmutus.fi",
        legalName: t("footer.companyName"),
        url: HOST,
        logo: {
          "@type": "ImageObject",
          url: `${HOST}/logo.png`,
          width: 512,
          height: 512
        },
        image: `${HOST}/opengraph-image.jpg`,
        description: t("home.meta.description"),
        telephone: PHONE,
        email: EMAIL,
        taxID: BUSINESS_ID,
        identifier: {
          "@type": "PropertyValue",
          propertyID: t("schema.businessId"),
          value: BUSINESS_ID
        },
        sameAs: [FACEBOOK_URL],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: PHONE,
          email: EMAIL,
          availableLanguage: ["fi", "en"]
        },
        employee: {
          "@type": "Person",
          name: t("meista.person.name"),
          jobTitle: t("meista.person.title")
        },
        knowsAbout: t.raw("schema.knowsAbout")
      }
    ]
  };

  return <JsonLd data={schema} />;
}
