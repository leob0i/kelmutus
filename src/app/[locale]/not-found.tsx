import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <main className="min-h-[70vh] bg-slate-950 text-white">
      {/* Sisältö (pt jättää tilaa läpinäkyvälle headerille) */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">{t("title")}</h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/85 md:text-base">
          {t("body")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
          >
            {t("home")}
          </Link>
          <Link
            href="/kutistepussit"
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            {t("bags")}
          </Link>
          <Link
            href="/veneenhuollot"
            className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-2.5 font-semibold text-white hover:bg-white/10"
          >
            {t("service")}
          </Link>
        </div>
      </section>
    </main>
  );
}
