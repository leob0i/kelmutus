import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { host, pageMetadata } from "@/lib/seo";
import { absoluteUrl, breadcrumbSchema, businessRef } from "@/lib/schema";

// Ohjeen julkaisupäivä (git) ja viimeisin sisältöpäivitys – päivitä kun tekstiä muutetaan
const DATE_PUBLISHED = "2026-02-12";
const DATE_MODIFIED = "2026-10-05";

// Osiot ja kohdat samassa järjestyksessä kuin käännöstiedostossa (talvisailytys.sections)
const sections = [
  { key: "cleaning", items: ["cleanSurfaces", "removeMoisture", "dryThoroughly", "dehumidifier"] },
  { key: "engine", items: ["fillTank", "protectEngine", "service"] },
  { key: "gear", items: ["removeSensitive", "storeBatteries"] },
  { key: "storage", items: ["washRopes", "shrinkWrap", "ventilation"] },
  { key: "safety", items: ["emptyBilge", "drainWaterSystems", "finalNote"] },
];

type Item = string | { label: string; text: string; link?: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "talvisailytys" });

  return pageMetadata({
    locale: locale as "fi" | "en",
    href: "/talvisailytys",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function VeneenTalvisailytysPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "talvisailytys" });
  const tAll = await getTranslations({ locale });

  const url = absoluteUrl(locale as "fi" | "en", "/talvisailytys");
  const getItem = (section: string, item: string) =>
    t.raw(`sections.${section}.items.${item}`) as Item;

  const howToSteps = sections.map((section, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    // otsikko ilman numerointia ("1. Puhdistus ja kuivaus" -> "Puhdistus ja kuivaus")
    name: t(`sections.${section.key}.title`).replace(/^\d+\.\s*/, ""),
    text: section.items
      .filter((item) => item !== "finalNote")
      .map((item) => {
        const value = getItem(section.key, item);
        return typeof value === "string" ? value : `${value.label} ${value.text}`;
      })
      .join(" "),
    url: `${url}#${section.key}`,
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={breadcrumbSchema(locale as "fi" | "en", [
          { name: tAll("nav.home"), href: "/" },
          { name: t("title"), href: "/talvisailytys" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t("title"),
          description: t("meta.description"),
          inLanguage: locale,
          mainEntityOfPage: url,
          image: `${host}/opengraph-image.jpg`,
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          author: businessRef,
          publisher: businessRef,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t("title"),
          description: t("intro"),
          inLanguage: locale,
          step: howToSteps,
        }}
      />

      {/* Sisältö (pt jättää tilaa läpinäkyvälle headerille) */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-base">
          {t("intro")}
        </p>

        <div className="mt-10 space-y-10 text-white/85">
          {sections.map((section) => (
            <div key={section.key} id={section.key} className="scroll-mt-24">
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                {t(`sections.${section.key}.title`)}
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
                {section.items.map((item) => {
                  const value = getItem(section.key, item);

                  if (typeof value === "string") return <li key={item}>{value}</li>;

                  return (
                    <li key={item}>
                      <span className="font-medium text-white">{value.label}</span>{" "}
                      {value.text}
                      {value.link ? (
                        <>
                          {" "}
                          <Link
                            href="/kutistepussit"
                            className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                          >
                            {value.link} →
                          </Link>
                        </>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Linkit palveluihin */}
        <div className="mt-14 border-t border-white/15 pt-10">
          <h2 className="font-serif text-2xl text-white md:text-3xl">
            {t("cta.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-base">
            {t("cta.body")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/kutistepussit"
              className="inline-flex items-center justify-center rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
            >
              {t("cta.bags")}
            </Link>
            <Link
              href="/veneenhuollot"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              {t("cta.service")}
            </Link>
            <Link
              href="/#yhteys"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
            >
              {t("cta.contact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
