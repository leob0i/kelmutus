import "./globals.css";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kelmutus.fi"),
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  let locale = "fi";
  try {
    locale = await getLocale();
  } catch {
    // fallback ok
  }

  return (
    <html lang={locale}>
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  );
}
