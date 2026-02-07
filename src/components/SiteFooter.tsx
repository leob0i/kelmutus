import Link from "next/link";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.3-1.6 1.6-1.6h1.8V4.8c-.3 0-1.5-.1-2.9-.1-2.9 0-4.9 1.8-4.9 5V11H6.5v3H9V22h4.5z"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#071a43] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-serif text-[22px] tracking-wide">KELMUTUS</div>

          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram" className="text-white/90 hover:text-white">
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-white/90 hover:text-white">
              <FacebookIcon className="h-6 w-6" />
            </Link>
          </div>

          <div className="text-sm text-white/90">
            <div>Puhelin: +358 12345678</div>
            <div>Sähköposti: esimerkki@esimerkki.fi</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2025 Kelmutus.fi. Kaikki oikeudet pidätetään.</div>
          <div className="flex gap-3">
            <Link href="#" className="hover:text-white">Tietosuojaseloste</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white">Evästeasetukset</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white">Käyttöehdot</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
