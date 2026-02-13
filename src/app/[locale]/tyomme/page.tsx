import type { Metadata } from "next";
import Image from "next/image";
import TyommeHeroVideo from "@/components/TyommeHeroVideo";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tyomme" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const gallery = [
  { src: "/gallery/isovene.jpg", altKey: "gallery.isovene" },
  { src: "/gallery/isovene.sivu.jpg", altKey: "gallery.isoveneSivu" },
  { src: "/gallery/auto.kelmus.jpg", altKey: "gallery.autoKelmus" },
  { src: "/gallery/axopar28.png", altKey: "gallery.axopar28" },
  { src: "/gallery/rekka.kelmussa.jpg", altKey: "gallery.rekkaKelmussa" },
  { src: "/gallery/vene.ulkona.jpg", altKey: "gallery.veneUlkona" },
  { src: "/kelmutus.talo.jpg", altKey: "gallery.talo" },
  { src: "/gallery/vene.parkissa.jpg", altKey: "gallery.veneParkissa" },
  { src: "/gallery/saxdor.png", altKey: "gallery.saxdor" },
];

// Ennen / jälkeen
const beforeAfter = {
  before: { src: "/gallery/sar.musta.jpg", altKey: "beforeAfter.main.beforeAlt" },
  after: { src: "/gallery/sar.musta.kelmussa.jpg", altKey: "beforeAfter.main.afterAlt" },
};

function CardImage({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/10 bg-black/5">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {label ? (
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {label}
        </div>
      ) : null}
    </div>
  );
}

export default async function TyommePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tyomme" });

  return (
    <main className="bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-slate-950">
        {/* Video + overlay */}
        <div className="absolute inset-0">
          <TyommeHeroVideo />
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/65" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 md:pt-36 md:pb-24">
          <h1 className="font-serif text-5xl leading-tight text-white drop-shadow md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {t("hero.body")}
          </p>
        </div>
      </section>

      {/* Intro text under hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              {t("gallerySection.title")}
            </h2>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((img) => (
            <CardImage key={img.src} src={img.src} alt={t(img.altKey)} />
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="border-t border-black/10 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">
                {t("beforeAfter.title")}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <CardImage
              src={beforeAfter.before.src}
              alt={t(beforeAfter.before.altKey)}
              label={t("beforeAfter.labels.before")}
            />
            <CardImage
              src={beforeAfter.after.src}
              alt={t(beforeAfter.after.altKey)}
              label={t("beforeAfter.labels.after")}
            />
          </div>

          {/* UUSI RIVI 1 (aina 2 kuvaa samalla rivillä myös mobiilissa) */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <CardImage
              src="/gallery/saxdor.aloitus.jpg"
              alt={t("beforeAfter.row1.beforeAlt")}
              label={t("beforeAfter.labels.before")}
            />
            <CardImage
              src="/gallery/isovene.sivu.jpg"
              alt={t("beforeAfter.row1.afterAlt")}
              label={t("beforeAfter.labels.after")}
            />
          </div>

          {/* UUSI RIVI 2 (aina 2 kuvaa samalla rivillä myös mobiilissa) */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <CardImage
              src="/gallery/sar.jpg"
              alt={t("beforeAfter.row2.beforeAlt")}
              label={t("beforeAfter.labels.before")}
            />
            <CardImage
              src="/gallery/sar.kelmussa.jpg"
              alt={t("beforeAfter.row2.afterAlt")}
              label={t("beforeAfter.labels.after")}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
