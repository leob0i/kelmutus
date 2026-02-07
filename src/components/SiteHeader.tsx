"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const nav = [
  { label: "Meistä", href: "/meista" },
  { label: "Työmme", href: "/tyomme" },
  { label: "Palvelut", href: "/palvelut" },
  { label: "Kutistepussit", href: "/kutistepussit" },
  { label: "Yhteystiedot", href: "/yhteystiedot" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!open) return;
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

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="border-b border-white/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 relative">
          <Link
            href="/"
            className="font-serif text-[22px] tracking-wide text-white drop-shadow"
            aria-label="Kelmutus etusivu"
            onClick={() => setOpen(false)}
          >
            KELMUTUS
          </Link>

          {/* DESKTOP NAV (ennallaan) */}
          <nav className="no-scrollbar max-w-[70%] overflow-x-auto hidden md:block">
            <ul className="flex items-center gap-4 whitespace-nowrap font-serif text-[15px] text-white/95 drop-shadow sm:gap-6 sm:text-[16px]">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="hover:text-white">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/95 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={open ? "Sulje valikko" : "Avaa valikko"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              // X icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {/* MOBILE DROPDOWN (oikea reuna + animaatio) */}
          <div
            id="mobile-nav"
            ref={panelRef}
            className={[
              "md:hidden absolute right-4 top-full mt-2 w-[min(88vw,300px)]",
              "rounded-xl border border-white/20 bg-black/55 backdrop-blur-md shadow-xl",
              "origin-top-right transition-all duration-200 ease-out",
              open
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 -translate-y-2 scale-[0.98] pointer-events-none",
            ].join(" ")}
          >
            <ul className="p-2 font-serif text-[16px] text-white/95">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="block rounded-lg px-4 py-3 hover:bg-white/10 hover:text-white transition"
                    onClick={() => setOpen(false)}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
