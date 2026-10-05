import "../globals.css";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";
import {setRequestLocale} from "next-intl/server";

import {routing} from "@/i18n/routing";
import {host, siteName} from "@/lib/seo";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";
import {LocalBusinessJsonLd} from "@/components/LocalBusinessJsonLd";

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({locale, namespace: "home.meta"});

  return {
    metadataBase: new URL(host),
    title: t("title"),
    description: t("description"),
    applicationName: siteName,
    formatDetection: {telephone: false}
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  // mahdollistaa staattisen renderöinnin (ei lueta kieltä pyynnön headereista)
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-white text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <LocalBusinessJsonLd locale={locale} />
          <SiteHeader />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
