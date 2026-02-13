import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kutistepussit" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function KutistepussitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kutistepussit" });

  return (
    <>
      <main className="bg-white text-black">
        {/* HERO */}
        <section className="relative min-h-[72vh] md:min-h-[78vh] overflow-hidden">
          {/* Hero taustakuva */}
          <Image
            src="/saxdor.png"
            alt={t("hero.imageAlt")}
            fill
            priority
            className="object-cover"
          />

          {/* Tumma/vaalea overlay kuten kuvassa */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Hero content */}
          <div className="relative z-10 mx-auto flex min-h-[72vh] md:min-h-[78vh] max-w-6xl flex-col items-start justify-center px-6 pt-28 md:pt-24">
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
          {/* Yläosa: vasen tekstit + oikea kuva */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            {/* Vasen */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl">
                {t("whatAre.title")}
              </h2>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("whatAre.body")}
              </p>

              {/* MOBIILISSA kuva heti tämän tekstin jälkeen */}
              <div className="mt-8 md:hidden">
                <div className="relative w-full overflow-hidden bg-gray-200">
                  <Image
                    src="/gallery/isovene.sivu.jpg"
                    alt={t("diagramAlt")}
                    width={1200}
                    height={900}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>

              <h3 className="mt-10 font-serif text-4xl md:text-5xl">
                {t("why.title")}
              </h3>

              <ul className="mt-6 max-w-xl list-disc space-y-2 pl-6 font-serif text-lg text-black/90">
                <li>{t("why.items.0")}</li>
                <li>{t("why.items.1")}</li>
                <li>{t("why.items.2")}</li>
                <li>{t("why.items.3")}</li>
                <li>{t("why.items.4")}</li>
              </ul>
            </div>

            {/* Oikea kuva (kaavio) – vain desktop/tablet */}
            <div className="hidden md:block md:pt-8">
              <div className="relative w-full overflow-hidden bg-gray-200">
                <Image
                  src="/gallery/isovene.sivu.jpg"
                  alt={t("diagramAlt")}
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Alaosa: vasen kuva + oikea teksti */}
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div className="relative hidden w-full overflow-hidden bg-gray-200 md:block">
              <Image
                src="/gallery/targa23.1.jpg"
                alt="Targa 23.1 "
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-serif text-4xl md:text-5xl">
                {t("durable.title")}
              </h3>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                {t("durable.body")}
              </p>

              {/* MOBIILISSA kuva tähän väliin */}
              <div className="mt-8 md:hidden">
                <div className="relative w-full overflow-hidden bg-gray-200">
                  <Image
                    src="/gallery/targa23.1.jpg"
                    alt="targa 23.1"
                    width={1200}
                    height={800}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              <p className="mt-8 font-serif text-lg text-black/90">
                <span className="block mt-2">
                  {t("priceExamplePrefix")}{" "}
                  <span className="whitespace-pre">Targa 23.1       351 €</span>
                </span>
              </p>
            </div>
          </div>

          {/* UUSI INFO (sama leveys kuin kuva+teksti -alue, EI koko sivun levyinen) */}
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="mt-3 font-serif text-lg leading-relaxed text-black/90 max-w-none">
                {t("askBiggerBoats")}
              </p>
            </div>
          </div>
        </section>

        {/* Pieni ohjenappi ennen yhteydenottolomaketta (oikeaan kulmaan) */}
        <div className="relative -top-6 z-10 mx-auto max-w-6xl px-6">
          <div className="flex justify-end">
            <Link
              href="/talvisailytys"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-gray-50"
              aria-label={t("winterStorageAria")}
            >
              {t("winterStorageBtn")} →
            </Link>
          </div>
        </div>

        {/* Yhteydenottolomake */}
        <section id="yhteys" className="relative bg-slate-950 py-16 md:py-20">
          {/* Taustakuva */}
          <div className="absolute inset-0">
            <Image
              src="/kutistepussi.sivu.jpg"
              alt={t("contact.bgAlt")}
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4">
            <div className="mx-auto max-w-2xl space-y-3 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t("contact.title")}
              </h2>

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

            <form
              action="/api/contact"
              method="POST"
              encType="multipart/form-data"
              className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
            >
              <input type="hidden" name="source" value="toinen välilehti / yhteys" />
              <input type="hidden" name="redirect" value="/#yhteys" />

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

              {/* Tiedoston liittäminen */}
              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="attachment"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  {t("form.attachment")}
                </label>
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  accept="image/*,application/pdf"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-slate-50 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-orange-600"
                />
                <p className="text-[11px] text-slate-400">{t("form.attachmentHelp")}</p>
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
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
