import type { Metadata } from "next";
import Image from "next/image";
import TyommeHeroVideo from "@/components/TyommeHeroVideo";

export const metadata: Metadata = {
  title: "Työmme | Kelmutus",
  description:
    "Esimerkkejä Kelmutus.fi toteutuksista – veneet, teollisuus, autot ja erikoiskohteet. Katso ennen/jälkeen ja kuvagalleria.",
};

const gallery = [
  { src: "/gallery/isovene.jpg", alt: "Vene kelmutettuna – valmis lopputulos" },
  { src: "/gallery/isovene.sivu.jpg", alt: "Vene kelmutettuna sivusta" },
  { src: "/gallery/auto.kelmus.jpg", alt: "Auto suojattuna kelmulla varastointiin" },
  { src: "/gallery/axopar28.png", alt: "Vene kelmutettuna hallissa" },
  { src: "/gallery/veneparkissa2.jpg", alt: "Kelmutus käynnissä veneen päällä" },
  { src: "/gallery/vene.ulkona.jpg", alt: "Iso kohde kelmutettuna kuljetusalustalla" },
  { src: "/kelmutus.talo.jpg", alt: "Rakennuskohteen suojaus kelmulla" },
  { src: "/gallery/vene.parkissa.jpg", alt: "Mitoitus/kaavio kutistepussille" },
  { src: "/gallery/saxdor.png", alt: "Vene ennen suojausta" },
];

// Ennen / jälkeen -pariksi valitsin “ennen”: /buster.l.jpg ja “jälkeen”: /gallery/isovene.sivu.jpg
const beforeAfter = {
  before: { src: "/gallery/saxdor.aloitus.jpg", alt: "Ennen: vene ilman suojausta" },
  after: { src: "/gallery/isovene.sivu.jpg", alt: "Jälkeen: vene suojattuna kutistepussilla" },
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

export default function TyommePage() {
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
            Työmme
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Esimerkkejä toteutuksista veneisiin, teollisuuskohteisiin, autoihin ja
            erikoismuotoihin. Tiivis suoja, siisti pinta ja varma lopputulos.
          </p>

          
        </div>
      </section>

      {/* Intro text under hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Kuvia toteutuksista
            </h2>
           
          </div>

          
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((img) => (
            <CardImage key={img.src} src={img.src} alt={img.alt} />
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="border-t border-black/10 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">Ennen & jälkeen</h2>
             
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <CardImage
              src={beforeAfter.before.src}
              alt={beforeAfter.before.alt}
              label="Ennen"
            />
            <CardImage
              src={beforeAfter.after.src}
              alt={beforeAfter.after.alt}
              label="Jälkeen"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
