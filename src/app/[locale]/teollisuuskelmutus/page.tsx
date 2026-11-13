import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

// Sama rakenne ja tyylit kuin /veneen-talvikatos ja /talvisailytys
const h2Class = "text-xl font-semibold tracking-tight text-white md:text-2xl";
const textClass = "mt-4 text-[15px] leading-relaxed md:text-base";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teollisuuskelmutus" });

  return pageMetadata({
    locale: locale as "fi" | "en",
    href: "/teollisuuskelmutus",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function TeollisuuskelmutusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "teollisuuskelmutus" });
  const tAll = await getTranslations({ locale });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={breadcrumbSchema(locale as "fi" | "en", [
          { name: tAll("nav.home"), href: "/" },
          { name: t("title"), href: "/teollisuuskelmutus" },
        ])}
      />
      <JsonLd data={serviceSchema(locale as "fi" | "en", tAll, "industrial")} />

      {/* Sisältö (pt jättää tilaa läpinäkyvälle headerille) */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">{t("title")}</h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-base">
          {t("intro")}
        </p>

        <Image
          src="/gallery/kelmutus.kelmut1.jpeg"
          alt={t("imageAlt")}
          width={1920}
          height={1080}
          sizes="(min-width: 896px) 848px, calc(100vw - 48px)"
          className="mt-10 h-auto w-full rounded-2xl"
        />

        <div className="mt-10 space-y-10 text-white/85">
          <div>
            <h2 className={h2Class}>{t("transport.title")}</h2>
            <p className={textClass}>{t("transport.body")}</p>
            <p className={textClass}>
              <span className="font-medium text-white">{t("transport.exampleLabel")}</span>{" "}
              {t("transport.example")}
            </p>
          </div>

          <div>
            <h2 className={h2Class}>{t("items.title")}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              {(t.raw("items.list") as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={h2Class}>{t("onsite.title")}</h2>
            <p className={textClass}>{t("onsite.body")}</p>
          </div>

          <div>
            <h2 className={h2Class}>{t("enclosure.title")}</h2>
            <p className={textClass}>{t("enclosure.body")}</p>
          </div>

          <div id="tarjous" className="scroll-mt-24">
            <p className={textClass}>{t("cta.body")}</p>
            <Link
              href="/#yhteys"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
