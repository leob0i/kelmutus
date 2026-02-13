"use client";

import {useEffect, useRef, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link, usePathname} from "@/i18n/navigation";

const navItems = [
  {key: "kutistepussit", href: "/kutistepussit"},
  {key: "palvelut", href: "/palvelut"},
  {key: "tyomme", href: "/tyomme"},
  {key: "meista", href: "/meista"}
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const btn = toggleRef.current;
      if (btn && btn.contains(e.target as Node)) return;

      const el = panelRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

const langLinkClass = (l: string) =>
  [
    "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[12px] leading-none transition",
    l === locale
      ? "bg-white/15 text-white font-semibold shadow-sm"
      : "text-white/75 hover:text-white hover:bg-white/10"
  ].join(" ");


  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="border-b border-white/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 relative">
          <Link
            href="/"
            className="font-serif text-[22px] tracking-wide text-white drop-shadow"
            aria-label={t("homeAria")}
            onClick={() => setOpen(false)}
          >
            KELMUTUS
          </Link>

          {/* DESKTOP: NAV + CTA + LANG */}
          <div className="hidden md:flex items-center gap-6 md:-mr-6">
            <nav className="block">
              <ul className="flex items-center gap-4 whitespace-nowrap font-serif text-[15px] text-white/95 drop-shadow sm:gap-6 sm:text-[16px]">
                {navItems.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="hover:text-white">
                      {t(i.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              href="/#yhteys"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#f08a00] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#e27f00]"
              onClick={() => setOpen(false)}
            >
              {t("cta")}
            </Link>

            {/* Kielenvaihdin */}
<div className="inline-flex items-center rounded-full border border-white/25 bg-black/20 p-0.5">
  <Link
    href={pathname || "/"}
    locale="fi"
    className={langLinkClass("fi")}
    aria-current={locale === "fi" ? "page" : undefined}
  >
    <span aria-hidden="true">🇫🇮</span>
    <span>FI</span>
  </Link>

  <Link
    href={pathname || "/"}
    locale="en"
    className={langLinkClass("en")}
    aria-current={locale === "en" ? "page" : undefined}
  >
    <span aria-hidden="true">🇬🇧</span>
    <span>EN</span>
  </Link>
</div>

          </div>

          {/* MOBILE HAMBURGER */}
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/95 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>

          {/* MOBILE DROPDOWN */}
          <div
            id="mobile-nav"
            ref={panelRef}
            className={[
              "md:hidden absolute right-4 top-full mt-2 w-[min(88vw,300px)]",
              "rounded-xl border border-white/20 bg-black/55 backdrop-blur-md shadow-xl",
              "overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out",
open
  ? "max-h-[70vh] opacity-100 translate-y-0 pointer-events-auto"
  : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"

            ].join(" ")}
          >
            <ul className="p-2 font-serif text-[16px] text-white/95">
              {/* MOBILE: kielenvaihdin */}
<li className="mt-1 px-2 pb-2">
  <div className="flex items-center justify-end">
    <div className="inline-flex items-center rounded-full border border-white/25 bg-black/20 p-0.5">
      <Link
        href={pathname || "/"}
        locale="fi"
        className={langLinkClass("fi")}
        aria-current={locale === "fi" ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden="true">🇫🇮</span>
        <span>FI</span>
      </Link>

      <Link
        href={pathname || "/"}
        locale="en"
        className={langLinkClass("en")}
        aria-current={locale === "en" ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        <span aria-hidden="true">🇬🇧</span>
        <span>EN</span>
      </Link>
    </div>
  </div>
</li>

              {navItems.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="block rounded-lg px-4 py-3 hover:bg-white/10 hover:text-white transition"
                    onClick={() => setOpen(false)}
                  >
                    {t(i.key)}
                  </Link>
                </li>
              ))}

              <li className="mt-1">
                <Link
                  href="/#yhteys"
                  className="block rounded-lg px-4 py-3 font-semibold text-white bg-[#f08a00] hover:bg-[#e27f00] transition"
                  onClick={() => setOpen(false)}
                >
                  {t("cta")}
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
