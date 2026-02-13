// src/app/tietosuoja/page.tsx
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "tietosuoja" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TietosuojaselostePage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "tietosuoja" });

  return (
    <main className="min-h-screen bg-[#06142F] text-slate-100 pt-24 md:pt-28">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <p className="text-sm font-medium text-slate-300">{t("brand")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">
            {t("pageTitle")}
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            {t("lastUpdated.label")}{" "}
            <span className="font-medium">{t("lastUpdated.date")}</span>
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="space-y-10">
          <Block title={t("sections.1.title")}>
            <p className="text-slate-200">
              {t("sections.1.controller.name")}
              <br />
              {t("sections.1.controller.emailLabel")}{" "}
              <a
                className="underline underline-offset-4 text-slate-100 decoration-slate-400/70 hover:decoration-slate-200"
                href="mailto:jari@kelmutus.fi"
              >
                {t("sections.1.controller.email")}
              </a>
              <br />
              {t("sections.1.controller.phoneLabel")}{" "}
              <a
                className="underline underline-offset-4 text-slate-100 decoration-slate-400/70 hover:decoration-slate-200"
                href="tel:+358400283123"
              >
                {t("sections.1.controller.phone")}
              </a>
            </p>
          </Block>

          <Block title={t("sections.2.title")}>
            <p className="text-slate-200">{t("sections.2.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
              <li>{t("sections.2.list.name")}</li>
              <li>{t("sections.2.list.company")}</li>
              <li>{t("sections.2.list.email")}</li>
              <li>{t("sections.2.list.phone")}</li>
              <li>{t("sections.2.list.message")}</li>
              <li>{t("sections.2.list.attachment")}</li>
            </ul>
            <p className="mt-4 text-slate-200">{t("sections.2.extra")}</p>
          </Block>

          <Block title={t("sections.3.title")}>
            <p className="text-slate-200">{t("sections.3.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
              <li>{t("sections.3.list.reply")}</li>
              <li>{t("sections.3.list.followup")}</li>
            </ul>
          </Block>

          <Block title={t("sections.4.title")}>
            <p className="text-slate-200">{t("sections.4.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
              <li>
                <span className="font-medium text-slate-50">
                  {t("sections.4.list.contract.bold")}
                </span>{" "}
                {t("sections.4.list.contract.rest")}
              </li>
              <li>
                <span className="font-medium text-slate-50">
                  {t("sections.4.list.legitimate.bold")}
                </span>{" "}
                {t("sections.4.list.legitimate.rest")}
              </li>
            </ul>
          </Block>

          <Block title={t("sections.5.title")}>
            <p className="text-slate-200">{t("sections.5.noSell")}</p>
            <p className="mt-4 text-slate-200">{t("sections.5.providers")}</p>
          </Block>

          <Block title={t("sections.6.title")}>
            <p className="text-slate-200">{t("sections.6.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
              <li>{t("sections.6.list.relationship")}</li>
              <li>{t("sections.6.list.law")}</li>
            </ul>
          </Block>

          <Block title={t("sections.7.title")}>
            <p className="text-slate-200">{t("sections.7.intro")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-200">
              <li>{t("sections.7.list.info")}</li>
              <li>{t("sections.7.list.access")}</li>
              <li>{t("sections.7.list.rectify")}</li>
              <li>{t("sections.7.list.erase")}</li>
              <li>{t("sections.7.list.restrict")}</li>
              <li>{t("sections.7.list.object")}</li>
            </ul>
            <p className="mt-4 text-slate-200">
              {t("sections.7.contactPrefix")}{" "}
              <a
                className="underline underline-offset-4 text-slate-100 decoration-slate-400/70 hover:decoration-slate-200"
                href="mailto:jari@kelmutus.fi"
              >
                {t("sections.7.contactEmail")}
              </a>
              .
            </p>
          </Block>

          <Block title={t("sections.8.title")}>
            <p className="text-slate-200">{t("sections.8.intro")}</p>
            <p className="mt-4 text-slate-200">
              {t("sections.8.authority.name")}{" "}
              <a
                className="underline underline-offset-4 text-slate-100 decoration-slate-400/70 hover:decoration-slate-200"
                href="https://tietosuoja.fi/yhteystiedot"
                target="_blank"
                rel="noreferrer"
              >
                {t("sections.8.authority.linkText")}
              </a>
            </p>
          </Block>

          <Block title={t("sections.9.title")}>
            <p className="text-slate-200">{t("sections.9.text")}</p>
          </Block>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-2xl px-4 py-6 text-sm text-slate-400">
          © {new Date().getFullYear()} {t("brand")}
        </div>
      </footer>
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-slate-50">
        {title}
      </h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
