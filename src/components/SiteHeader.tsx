import Link from "next/link";

const nav = [
  { label: "Meistä", href: "/meista" },
  { label: "Työmme", href: "/tyomme" },
  { label: "Palvelut", href: "/palvelut" },
  { label: "Kutistepussit", href: "/kutistepussit" },
  { label: "Yhteystiedot", href: "/yhteystiedot" },
];

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="border-b border-white/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="font-serif text-[22px] tracking-wide text-white drop-shadow"
            aria-label="Kelmutus etusivu"
          >
            KELMUTUS
          </Link>

          <nav className="no-scrollbar max-w-[70%] overflow-x-auto">
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
        </div>
      </div>
    </header>
  );
}
