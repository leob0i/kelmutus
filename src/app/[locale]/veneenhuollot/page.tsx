import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "veneenhuollot" });

  return pageMetadata({
    locale: locale as "fi" | "en",
    href: "/veneenhuollot",
    title: t("meta.title"),
    description: t("meta.description"),
  });
}

export default async function VeneenhuollotPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "veneenhuollot" });
  const tAll = await getTranslations({ locale });

  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale as "fi" | "en", [
          { name: tAll("nav.home"), href: "/" },
          { name: t("hero.title"), href: "/veneenhuollot" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          locale: locale as "fi" | "en",
          href: "/veneenhuollot",
          name: t("hero.title"),
          description: t("intro.body1"),
          serviceType: tAll("schema.boatService"),
          areaServed: [tAll("schema.capitalRegion"), "Finland"],
        })}
      />

      <main className="bg-white text-black">
        {/* HERO */}
        <section className="relative min-h-[46vh] md:min-h-[52vh] overflow-hidden">
          <Image
            src="/gallery/whatsapp-vene-traileri.jpg"
            alt={t("hero.imageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 mx-auto flex min-h-[46vh] md:min-h-[52vh] max-w-6xl flex-col items-start justify-center px-6 pt-28 md:pt-24">
            <h1 className="font-serif text-4xl leading-tight text-white md:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="mt-4 max-w-2xl font-serif text-lg text-white/90 md:text-2xl">
              {t("hero.subtitle")}
            </p>

            <a
              href="#yhteys"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-base font-medium text-white shadow-md transition hover:bg-orange-600"
            >
              {t("hero.cta")}
            </a>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          {/* Intro */}
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl">{t("intro.title")}</h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-black/90">
              {t("intro.body1")}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-black/90">
              {t("intro.body2")}
            </p>
          </div>

          {/* Määräaikaishuollot: teksti vasen, kuva oikea */}
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl">
                {t("maintenance.title")}
              </h2>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("maintenance.body1")}
              </p>
              <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("maintenance.body2")}
              </p>

              <div className="mt-8 md:hidden">
                <div className="relative w-full overflow-hidden bg-gray-200">
                  <Image
                    src="/gallery/whatsapp-moottorin-huolto.jpg"
                    alt={t("maintenance.imageAlt")}
                    width={1050}
                    height={1400}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              <p className="mt-8 font-serif text-lg font-medium text-black">
                {t("maintenance.listTitle")}
              </p>
              <ul className="mt-4 max-w-xl list-disc space-y-2 pl-6 font-serif text-lg text-black/90">
                <li>{t("maintenance.items.0")}</li>
                <li>{t("maintenance.items.1")}</li>
                <li>{t("maintenance.items.2")}</li>
                <li>{t("maintenance.items.3")}</li>
                <li>{t("maintenance.items.4")}</li>
                <li>{t("maintenance.items.5")}</li>
                <li>{t("maintenance.items.6")}</li>
                <li>{t("maintenance.items.7")}</li>
              </ul>

              <p className="mt-6 font-serif text-base text-black/70">
                {t("maintenance.footnote")}
              </p>
            </div>

            <div className="hidden md:block">
              <div className="relative w-full overflow-hidden bg-gray-200">
                <Image
                  src="/gallery/whatsapp-moottorin-huolto.jpg"
                  alt={t("maintenance.imageAlt")}
                  width={1050}
                  height={1400}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Korjaukset: kuva vasen, teksti oikea */}
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div className="relative hidden w-full overflow-hidden bg-gray-200 md:block">
              <Image
                src="/gallery/whatsapp-rungon-korjaus.jpg"
                alt={t("repairs.gallery.hullAlt")}
                width={788}
                height={1400}
                className="h-auto w-full object-cover"
              />
            </div>

            <div>
              <h2 className="font-serif text-4xl md:text-5xl">{t("repairs.title")}</h2>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("repairs.body1")}
              </p>

              <div className="mt-8 md:hidden">
                <div className="relative w-full overflow-hidden bg-gray-200">
                  <Image
                    src="/gallery/whatsapp-rungon-korjaus.jpg"
                    alt={t("repairs.gallery.hullAlt")}
                    width={788}
                    height={1400}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("repairs.body2")}
              </p>

              <p className="mt-8 font-serif text-lg font-medium text-black">
                {t("repairs.listTitle")}
              </p>
              <ul className="mt-4 max-w-xl list-disc space-y-2 pl-6 font-serif text-lg text-black/90">
                <li>{t("repairs.items.0")}</li>
                <li>{t("repairs.items.1")}</li>
                <li>{t("repairs.items.2")}</li>
                <li>{t("repairs.items.3")}</li>
                <li>{t("repairs.items.4")}</li>
                <li>{t("repairs.items.5")}</li>
                <li>{t("repairs.items.6")}</li>
              </ul>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("repairs.helpText")}
              </p>
            </div>
          </div>

          {/* Korjausten kuvakollaasi */}
          <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              <Image
                src="/gallery/whatsapp-sahkojarjestelma.jpg"
                alt={t("repairs.gallery.electricAlt")}
                fill
                sizes="(min-width: 768px) 350px, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              <Image
                src="/gallery/whatsapp-vesipumppu.jpg"
                alt={t("repairs.gallery.waterAlt")}
                fill
                sizes="(min-width: 768px) 350px, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              <Image
                src="/gallery/whatsapp-potkuriakseli.jpg"
                alt={t("repairs.gallery.shaftAlt")}
                fill
                sizes="(min-width: 768px) 350px, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Keväthuolto */}
          <div className="mt-16 max-w-3xl">
            <h2 className="font-serif text-4xl md:text-5xl">{t("spring.title")}</h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-black/90">
              {t("spring.body1")}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-black/90">
              {t("spring.body2")}
            </p>
          </div>

          {/* Talvihuolto: teksti vasen, kuva oikea */}
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl">{t("winter.title")}</h2>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("winter.body1")}
              </p>

              <div className="mt-8 md:hidden">
                <div className="relative w-full overflow-hidden bg-gray-200">
                  <Image
                    src="/gallery/whatsapp-talvisailytys.jpg"
                    alt={t("winter.imageAlt")}
                    width={788}
                    height={1400}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("winter.body2")}
              </p>

              <div className="mt-6 flex flex-col items-start gap-3">
                <Link
                  href="/kutistepussit"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-gray-50"
                  aria-label={t("winter.linkAria")}
                >
                  {t("winter.linkBtn")} →
                </Link>

                <Link
                  href="/talvisailytys"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-gray-50"
                  aria-label={t("winter.tipsLinkAria")}
                >
                  {t("winter.tipsLinkBtn")} →
                </Link>
              </div>
            </div>

            <div className="relative hidden w-full overflow-hidden bg-gray-200 md:block">
              <Image
                src="/gallery/whatsapp-talvisailytys.jpg"
                alt={t("winter.imageAlt")}
                width={788}
                height={1400}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

        </section>

        <Faq title={t("faq.title")} items={faqItems} />

        {/* Alue: tumman sininen + oranssi väriteema (kontrasti muuhun sivuun) */}
        <section className="relative overflow-hidden bg-[#0b1a33]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.55]"
            style={{
              background:
                "radial-gradient(900px circle at 15% 0%, rgba(255,255,255,0.14), transparent 55%), radial-gradient(900px circle at 85% 65%, rgba(240,138,0,0.14), transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <h2 className="font-serif text-[28px] leading-tight text-white sm:text-[34px]">
                  {t("area.title")}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-[15px]">
                  {t("area.body1")}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-[15px]">
                  {t("area.body2")}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="border-l-2 border-[#f08a00] pl-5">
                  <p className="font-serif text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
                    {t("area.body3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Yhteydenottolomake */}
        <section id="yhteys" className="relative bg-slate-950 py-16 md:py-20">
          <div className="absolute inset-0">
            <Image
              src="/kutistepussi.sivu.jpg"
              alt={t("contact.bgAlt")}
              fill
              sizes="100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/85" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4">
            <div className="mx-auto max-w-2xl space-y-3 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t("contact.title")}
              </h2>

              <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
                {t("contact.eyebrow")}
              </p>

              <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
                {t("contact.body")}
              </p>

              {/* WhatsApp-nappi (ennen lomaketta) */}
              <div className="mt-6 flex justify-center">
                <a
                  href="https://wa.me/358400283123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("contact.whatsappAria")}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#25D366] px-5 shadow-lg shadow-black/30 ring-1 ring-white/10 transition hover:bg-[#1EBE5D] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {/* WhatsApp-logo */}
                  <svg
                    viewBox="0 0 32 32"
                    className="h-7 w-7 shrink-0 text-white"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      transform="translate(1.5 -0)"
                      d="M19.11 17.53c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.64.14-.18.28-.74.9-.9 1.08-.17.18-.33.2-.6.06-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.56-1.94-.17-.28-.02-.43.13-.57.13-.13.28-.33.42-.49.14-.17.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.64-1.55-.87-2.12-.23-.56-.46-.49-.64-.49h-.55c-.2 0-.49.07-.74.35-.26.28-.97.95-.97 2.32 0 1.37 1 2.69 1.14 2.88.14.18 1.97 3 4.77 4.2.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.64.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33z"
                    />
                    <path
                      fill="currentColor"
                      d="M16.01 3.2c-7.03 0-12.75 5.7-12.75 12.7 0 2.23.6 4.41 1.73 6.33L3.2 28.8l6.75-1.77a12.8 12.8 0 0 0 6.06 1.54c7.03 0 12.75-5.7 12.75-12.7S23.04 3.2 16.01 3.2zm0 23.12c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.01 1.05 1.07-3.9-.25-.4a10.51 10.51 0 0 1-1.61-5.57c0-5.8 4.75-10.52 10.66-10.52 5.9 0 10.66 4.72 10.66 10.52 0 5.8-4.76 10.55-10.66 10.55z"
                    />
                  </svg>

                  <span className="flex flex-col leading-[1.05]">
                    <span className="font-sans text-[15px] font-semibold tracking-tight text-white">
                      WhatsApp
                    </span>
                    <span className="font-sans text-[13px] font-semibold tracking-tight text-white/95 tabular-nums">
                      +358 400 283 123
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <ContactForm
              className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
            >
              <input type="hidden" name="source" value="veneenhuollot / yhteys" />

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Honeypot (2): hp_company */}
              <input
                type="text"
                name="hp_company"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                  >
                    {t("form.name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-orange-500"
                    placeholder={t("form.namePh")}
                  />
                </div>

                <div className="space-y-1.5 text-sm">
                  <label
                    htmlFor="company"
                    className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                  >
                    {t("form.company")}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-orange-500"
                    placeholder={t("form.companyPh")}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5 text-sm">
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                  >
                    {t("form.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-orange-500"
                    placeholder={t("form.emailPh")}
                  />
                </div>

                <div className="space-y-1.5 text-sm">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                  >
                    {t("form.phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-orange-500"
                    placeholder={t("form.phonePh")}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="message"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-amber-400"
                  placeholder={t("form.messagePh")}
                />
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {t("form.consent")}
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-orange-600"
                >
                  {t("form.submit")}
                </button>
              </div>
            </ContactForm>
          </div>
        </section>
      </main>
    </>
  );
}
