import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Palvelut | Kelmutus",
  description:
    "Kutistepussitus veneille ja teollisuuskohteille. Suojaus säältä, kuljetukselta ja varastoinnissa – nopeasti ja kestävästi.",
};

const services = [
  {
    title: "Veneiden kelmutus",
    desc: "Suoja talvisäilytykseen, kuljetuksiin ja varastointiin. Tiivis, kestävä ja siisti lopputulos.",
    img: "/gallery/isovene.jpg",
    bullets: [
      "Säänkestävä suojaus",
      "Ulko- ja sisäsäilytykseen",
      "Paikanpäällä kelmutus ",
    ],
  },
  {
    title: "Teollisuus kelmutus",
    desc: "Suojaukset koneille, laitteille ja muille projekteille",
    img: "/gallery/mitat.jpg",
    bullets: ["Kuljetussuojaukset", "Varastointisuojaus", "Pakkaus"],
  },
  {
    title: "Autojen kelmutus",
    desc: "Suojaus kuljetukseen ja varastointiin. Pitää auton maalipinnan suojassa pitkäaikaisessa säilytyksessä..",
    img: "/gallery/auto.kelmus.jpg", 
    bullets: ["Kuljetussuoja",  "Suositeltu pitkäaikaiseen säilytykseen"],
  },
  {
    title: "Me laitetaan kelmuun mitä vaan",
    desc: "Erikoiskohteet ja poikkeavat muodot onnistuu – kerro mitä pitää suojata, niin tehdään ratkaisu.",
    img: "/gallery/mitat.jpg", // tai vaihda jos haluat eri kuvan
    bullets: ["Erikoismitat", "Erikoiskohteet", ],
  },
];



export default function PalvelutPage() {
  return (
    <main className="bg-white text-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10 bg-slate-950">
        {/* Taustakuva + tumma overlay */}
        <div className="absolute inset-0">
          <Image
            src="/gallery/isovene.sivu.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        {/* Sisältö alemmas */}
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="flex flex-wrap items-center gap-4">

            <h1 className="font-serif text-5xl md:text-6xl text-white">Palvelut</h1>

            <a
              href="#yhteys"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-orange-600"
            >
              Pyydä tarjous
            </a>
          </div>

          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-white/85">
            Teemme kestävät kutistepussitukset veneille, teollisuuskohteille ja
            erilaisille laitteille. Lopputulos on tiivis, siisti ja suunniteltu
            suojaamaan kohdetta säältä, varastoinnilta ja kuljetuksen rasituksilta.
          </p>
        </div>
      </section>

     {/* PALVELUT */}
<section id="palvelut" className="mx-auto max-w-7xl px-4 pt-6 pb-16 md:pt-8 md:pb-20">

  {/* 4 korttia / sama rivi desktopissa + taustakuva tummalla overlayllä */}
  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
    {services.map((s) => (
      <div
        key={s.title}
        className="group relative overflow-hidden rounded-none shadow-lg ring-1 ring-black/10 min-h-[380px] sm:min-h-[420px] lg:min-h-[520px]"
      >
        {/* Taustakuva */}
        <div className="absolute inset-0">
          <Image
            src={s.img}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-950/70 transition-opacity duration-300 group-hover:bg-slate-950/60" />
        </div>

        {/* Sisältö */}
        <div className="relative flex h-full flex-col p-8">
          <h3 className="font-serif text-2xl md:text-3xl text-white">{s.title}</h3>

          <p className="mt-3 font-serif text-base md:text-lg leading-relaxed text-white/85">
            {s.desc}
          </p>

          <ul className="mt-5 space-y-2 text-sm md:text-base text-white/85">
            {s.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                <span className="font-serif">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* HINNAT + ALAOSA (sinun pyytämä loppu) */}
      <section id="hinnat" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
       
        {/* UUSI BLOKKI #1: vasen kuva + oikea teksti (ennen "Kestävä ratkaisu") */}
<div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
  <div className="relative w-full overflow-hidden bg-gray-200">
    <Image
      src="/gallery/axopar28.png"
      alt="Kelmutus paikan päällä"
      width={1200}
      height={800}
      className="h-auto w-full object-cover"
    />
  </div>

  <div>
    <h3 className="font-serif text-4xl md:text-5xl">Kelmutus paikanpäällä</h3>

    <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
      Ei kuljetuksia, ei säätöä! <br />
      Teemme kelmutukset puolestanne etelä-Suomen alueella.
    </p>

    <p className="mt-8 font-serif text-lg text-black/90">
      <span className="block">Kerro kohde, mitat ja aikataulu. Me kelmutamme puolestasi!</span>
   <span className="block">Kun kelmutuksella on kiire, soita meille: +358 400283123</span>
    </p>
  </div>
</div>


        {/* Alaosa: vasen kuva + oikea teksti */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div className="relative w-full overflow-hidden bg-gray-200">
            <Image
              src="/buster.l.jpg"
              alt="Vene kutistepussissa"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-serif text-4xl md:text-5xl">Kestävä ratkaisu</h3>

            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
              Tarjoamme korkealaatuisia ja kestäviä kelmuja. Palvelumme avulla
              voit suojata arvokasta tavaraasi säältä ja kuljetuksen
              aiheuttamilta vaurioilta. Luotettavat ja nopeat toimitukset
              takaavat korkean asiakastyytyväisyyden.
            </p>

            <p className="mt-8 font-serif text-lg text-black/90">
              <span className="block">
                Hinnat 45 € alv 0 % / m alle 10 m pulpettiveneet.
              </span>

              <span className="block mt-2">
                esim. <span className="whitespace-nowrap">Buster L 230,80 €</span>
              </span>
            </p>
          </div>
        </div>

        {/* UUSI INFO (Kestava ratkaisu) */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="font-serif text-lg leading-relaxed text-black/90 max-w-none">
              Hinnat sisältävät perustason suojauksen ja työn asiakkaan
              osoittamassa paikassa Pääkaupunkiseudulla. Mikäli tarvitset
              lisäpalveluita, kuten kuljetuksen tai erikoisratkaisut, otathan
              yhteyttä. Räätälöimme tarjouksen tarpeesi mukaan.
            </p>

            <p className="mt-3 font-serif text-lg leading-relaxed text-black/90 max-w-none">
              Kysy myös isommista veneistä ja useamman veneen kimppahinnoista!
            </p>
          </div>
        </div>
      </section>

      {/* Yhteydenottolomake */}
      <section id="yhteys" className="relative bg-slate-950 py-16 md:py-20">
        {/* Taustakuva */}
        <div className="absolute inset-0">
          <Image
            src="/kutistepussi.sivu.jpg"
            alt="Kutistepussit taustakuva"
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Pyydä tarjous tai kysy lisää kutistepusseista
            </h2>

            <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
              Kerro lyhyesti kohteesta (esim. vene tai teollisuuskohteesta) sekä
              toivotusta suojauksesta. Voit liittää mukaan kuvan, luonnoksen tai
              PDF-tiedoston mittojen ja kohteen hahmottamiseksi. Palaamme sinulle
              mahdollisimman pian.
            </p>
          </div>

          <form
            action="/api/contact"
            method="POST"
            encType="multipart/form-data"
            className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
          >
            <input type="hidden" name="source" value="toinen välilehti / yhteys" />
            <input type="hidden" name="redirect" value="/palvelut#yhteys" />

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="name"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  Nimi
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-orange-500"
                  placeholder="Etunimi Sukunimi"
                />
              </div>

              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="company"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  Yritys (valinnainen)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-orange-500"
                  placeholder="Yrityksen nimi"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  Sähköposti
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-orange-500"
                  placeholder="nimi@yritys.fi"
                />
              </div>

              <div className="space-y-1.5 text-sm">
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
                >
                  Puhelin
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-orange-500"
                  placeholder="Puhelinnumero"
                />
              </div>
            </div>

            {/* Tiedoston liittäminen */}
            <div className="space-y-1.5 text-sm">
              <label
                htmlFor="attachment"
                className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
              >
                Liitä tiedosto (valinnainen)
              </label>
              <input
                id="attachment"
                name="attachment"
                type="file"
                accept="image/*,application/pdf"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-slate-50 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-orange-600"
              />
              <p className="text-[11px] text-slate-400">
                Voit liittää kuvan tai pdf-tiedoston. (max 2MB)
              </p>
            </div>

            <div className="space-y-1.5 text-sm">
              <label
                htmlFor="message"
                className="block text-xs font-medium uppercase tracking-[0.18em] text-slate-300"
              >
                Kerro kohteesta ja mitoista
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none transition focus:border-amber-400"
                placeholder="Kuvaile kohdetta (vene/teollisuuskohde, mikä?), mitat, aikataulu ja mahdolliset lisätoiveet)."
              />
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-relaxed text-slate-400">
                Lähettämällä lomakkeen hyväksyt, että otamme sinuun yhteyttä
                tarjouksen ja lisäkysymysten kanssa.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-orange-600"
              >
                Lähetä tarjouspyyntö
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
