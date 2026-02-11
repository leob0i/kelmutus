import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"; // ✅ lisää


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
    title: "Teollisuuskelmutus",
    desc: "Suojaukset koneille, laitteille ja muille projekteille. Teemme suojat mittojen mukaan tai tulemme paikan päälle kelmuttamaan. Suojaus on siisti, tiivis ja pitää laitteet sekä koneet turvassa säilytyksen ja kuljetuksen ajan.",
    img: "/gallery/rekka.kelmussa.jpg",
    bullets: ["Kuljetussuojaukset", "Varastointisuojaus", "Pakkaus"],
  },
  {
  title: "Autojen kelmutus",
  desc: "Vahva ja tiivis suoja kuljetukseen, varastointiin ja kausisäilytykseen. Auttaa pitämään pinnat siistinä ja suojassa pieniltä kolhuilta sekä likaantumiselta.",
  img: "/gallery/auto.kelmus.jpg",
  bullets: ["Kuljetussuoja", "Varastointi & kausisäilytys", "Suojaa likaantumiselta ja naarmuilta"],
}
,
  {
    title: "Laitamme kelmuun",
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
    <h3 className="font-serif text-4xl md:text-5xl">Kelmutus paikan päällä pääkaupunkiseudulla</h3>

    <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
      On kyseessä sitten vene, harrasteauto, laite taikka mikä vaan joka 
      pitää saada nopeasti ja turvallisesti suojattua varastointia tai 
      kuljetusta varten, me tulemme paikalle kelmuttamaan! <br />
      
    </p>

    <p className="mt-8 font-serif text-lg text-black/90">
      <span className="block"> Hinnat 45 € alv 0 % / m alle 10 m pulpettiveneet.</span>
  

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
              Kelmutamme myös pääkaupunkiseudun ulkopuolella lisähinnasta. Kysy lisää!
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
              Tarjoamme korkealaatuisia, kestäviä kelmuja arvokkaan tavaran suojaamiseen. Palvelumme auttaa ehkäisemään sään ja kuljetuksen aiheuttamia vaurioita, 
              ja luotettavat sekä nopeat toimitukset tukevat korkeaa asiakastyytyväisyyttä. 
              Valmiiksi mitoitetut kutistepussimme valmistetaan kestävästä UV-stabiloidusta polyeteenistä (PE/LDPE), ja materiaalin paksuus on tyypillisesti 150–200 µm.
            </p>

            <p className="mt-8 font-serif text-lg text-black/90">
              

              <span className="block mt-2">
                esim. <span className="whitespace-nowrap">Buster L 230,80 €</span>
              </span>
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

{/* WhatsApp-nappi (ennen lomaketta) */}
<div className="mt-6 flex justify-center">
  <Link
    href="https://wa.me/358400283123"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Avaa WhatsApp ja ota yhteyttä"
    className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#25D366] px-5 shadow-lg shadow-black/30 ring-1 ring-white/10 transition hover:bg-[#1EBE5D] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
  >
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7 shrink-0 text-white"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        transform="translate(1.5 -0)"
        d="M19.11 17.53c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.64.14-.18.28-.74.9-.9 1.08-.17.18-.33.2-.6.06-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.66-1.56-1.94-.17-.28-.02-.43.13-.57.13-.13.28-.33.42-.49.14-.17.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.64-1.55-.87-2.12-.23-.56-.46-.49-.64-.49h-.55c-.2 0-.49.07-.74.35-.26.28-.97.95-.97 2.32 0 1.37 1 2.69 1.14 2.88.14.18 1.97 3 4.77 4.2.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.64.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33z"
      />
      <path
        fill="currentColor"
        d="M16.01 3.2c-7.03 0-12.75 5.7-12.75 12.7 0 2.23.6 4.41 1.73 6.33L3.2 28.8l6.75-1.77a12.8 12.8 0 0 0 6.06 1.54c7.03 0 12.75-5.7 12.75-12.7S23.04 3.2 16.01 3.2zm0 23.12c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.01 1.05 1.07-3.9-.25-.4a10.51 10.51 0 0 1-1.61-5.57c0-5.8 4.75-10.52 10.66-10.52 5.9 0 10.66 4.72 10.66 10.52 0 5.8-4.76 10.55-10.66 10.55z"
      />
    </svg>

    <span className="flex flex-col leading-[1.05]">
      <span className="font-sans text-[15px] font-semibold tracking-tight text-white">
        WhatsApp
      </span>
      <span className="font-sans text-[13px] font-semibold tracking-tight text-white/95 tabular-nums">
        +358 400 283 123
      </span>
    </span>
  </Link>
</div>


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
