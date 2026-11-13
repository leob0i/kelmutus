import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Faq, type FaqItem } from "@/components/Faq";
import { GuideTable } from "@/components/GuideTable";
import { JsonLd } from "@/components/JsonLd";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

// Sama rakenne ja tyylit kuin /talvisailytys
const h2Class = "text-xl font-semibold tracking-tight text-white md:text-2xl";
const listClass = "mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kutistepussiVaiPressu" });

  return pageMetadata({
    locale: locale as "fi" | "en",
    href: "/kutistepussi-vai-pressu",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function KutistepussiVaiPressuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "kutistepussiVaiPressu" });
  const tAll = await getTranslations({ locale });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <JsonLd
        data={breadcrumbSchema(locale as "fi" | "en", [
          { name: tAll("nav.home"), href: "/" },
          { name: t("title"), href: "/kutistepussi-vai-pressu" },
        ])}
      />

      {/* Sisältö (pt jättää tilaa läpinäkyvälle headerille) */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">{t("title")}</h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-base">
          {t("intro")}
        </p>

        <Image
          src="/gallery/isovene.sivu.jpg"
          alt={tAll("images.isoveneSivu")}
          width={2048}
          height={1152}
          sizes="(min-width: 896px) 848px, calc(100vw - 48px)"
          className="mt-10 h-auto w-full rounded-2xl"
        />

        <div className="mt-10 space-y-10 text-white/85">
          <div id="vertailu" className="scroll-mt-24">
            <h2 className={h2Class}>{t("compare.title")}</h2>
            <GuideTable
              headers={t.raw("compare.headers") as string[]}
              rows={t.raw("compare.rows") as string[][]}
            />
          </div>

          <div>
            <h2 className={h2Class}>{t("whenBag.title")}</h2>
            <ul className={listClass}>
              {(t.raw("whenBag.items") as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={h2Class}>{t("whenTarp.title")}</h2>
            <ul className={listClass}>
              {(t.raw("whenTarp.items") as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div id="hinta" className="scroll-mt-24">
            <h2 className={h2Class}>{t("price.title")}</h2>
            <p className="mt-4 text-[15px] leading-relaxed md:text-base">{t("price.body")}</p>
            <Link
              href="/#yhteys"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
            >
              {t("quoteCta")}
            </Link>
          </div>
        </div>

        <Faq title={t("faq.title")} items={t.raw("faq.items") as FaqItem[]} variant="dark" />
      </section>
    </main>
  );
}
