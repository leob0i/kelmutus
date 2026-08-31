const HOST = "https://www.kelmutus.fi";

export function LocalBusinessJsonLd({description}: {description: string}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${HOST}/#business`,
    name: "Kelmutus.fi",
    legalName: "ShrinkPro Finland Oy",
    url: HOST,
    telephone: "+358400283123",
    email: "jari@kelmutus.fi",
    image: `${HOST}/opengraph-image.png`,
    logo: `${HOST}/icon.png`,
    description,
    sameAs: ["https://www.facebook.com/profile.php?id=61580610997021"],
    areaServed: {
      "@type": "Country",
      name: "Finland"
    }
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}
