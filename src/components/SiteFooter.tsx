import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

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

// Kaikki alasivut footerin Sivut-listaan
const pages = [
  {key: "kutistepussit", href: "/kutistepussit"},
  {key: "veneenhuollot", href: "/veneenhuollot"},
  {key: "palvelut", href: "/palvelut"},
  {key: "teollisuuskelmutus", href: "/teollisuuskelmutus"},
  {key: "tyomme", href: "/tyomme"},
  {key: "meista", href: "/meista"},
  {key: "talvisailytys", href: "/talvisailytys"},
  {key: "kutistepussiVaiPressu", href: "/kutistepussi-vai-pressu"},
  {key: "talvikatos", href: "/veneen-talvikatos"},
  {key: "tietosuoja", href: "/tietosuoja"}
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#071a43] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-serif text-[22px] tracking-wide">KELMUTUS</div>

            <div className="mt-1 text-sm text-white/90">
              <span className="font-medium text-white">{t("companyName")}</span>
              <span className="mx-2 text-white/40">•</span>
              <span>
                {t("businessIdLabel")}: {t("businessIdValue")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:ml-auto">
            <a
              href="https://www.facebook.com/profile.php?id=61580610997021"
              aria-label="Facebook"
              className="text-white/90 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className="h-6 w-6" />
            </a>
          </div>

          <div className="text-sm text-white/90">
            <div>
              {t("phoneLabel")}:{" "}
              <a href="tel:+358400283123" className="hover:text-white">
                +358 400 283 123
              </a>
            </div>
            <div>
              {t("emailLabel")}:{" "}
              <a href="mailto:jari@kelmutus.fi" className="hover:text-white">
                jari@kelmutus.fi
              </a>
            </div>
          </div>
        </div>

        <nav aria-labelledby="footer-pages" className="mt-6 border-t border-white/15 pt-5">
          <p
            id="footer-pages"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
          >
            {t("pages.title")}
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm lg:grid-cols-5">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-white/80 transition hover:text-white">
                  {t(`pages.${page.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div>{t("copyright")}</div>
            <div>{t("vatNote")}</div>
          </div>

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <a
              href="https://www.leodigital.fi/"
              className="text-[10px] text-white/60 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {t("credit")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
