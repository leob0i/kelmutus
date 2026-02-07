import "./globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Kelmutus",
  description: "Kelmutus – veneiden ja laitteiden suojausratkaisut.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body className="bg-white text-slate-900">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
