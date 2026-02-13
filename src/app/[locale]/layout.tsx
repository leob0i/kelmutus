import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {setRequestLocale} from "next-intl/server";

import {routing} from "@/i18n/routing";
import {SiteHeader} from "@/components/SiteHeader";
import {SiteFooter} from "@/components/SiteFooter";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.kelmutus.fi"),

  title: "Kelmutus",
  description: "Kelmutus – veneiden ja laitteiden suojausratkaisut."
};

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

  if (!routing.locales.includes(locale as any)) notFound();

  // auttaa tekemään tästä staattisemman kun mahdollista
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </NextIntlClientProvider>
  );
}
