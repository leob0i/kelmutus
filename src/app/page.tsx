import Image from "next/image";
import Link from "next/link";
import { ClickToPlayVideo } from "@/components/ClickToPlayVideo";

export default function HomePage() {
  return (
    <main className="pt-0">
      {/* HERO (looppaava video taustalla) */}
      <section className="relative min-h-[78vh] overflow-hidden border-b border-black/10">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* sinertävä overlay kuten kuvassa */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4f90b4]/60 via-[#5aa0c0]/35 to-transparent" />


        {/* header on absolute; varataan tilaa */}
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-24">
          

          <div className="mt-50 max-w-3xl">
            <h1 className="font-serif text-[44px] leading-[1.05] text-white drop-shadow sm:text-[56px]">
              Veneesi ansaitsee talven parhaat vaatteet
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/95 drop-shadow sm:text-[18px]">
              Hyvin suojattu vene säilyttää arvonsa, pintansa ja edustavuutensa.
              Kelmutus tehdään veneesi mukaan eikä toisinpäin. Meiltä saat kelmut myös autoihin, taloihin sekä koneisiin.
            </p>
          </div>
        </div>
      </section>

      {/* Valmiit kutistepussit */}
      <section className="relative overflow-hidden border-b border-black/10">
        <Image src="/saxdor.png" alt="" fill className="object-cover" />
<div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />


        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h2 className="font-serif text-[40px] leading-tight text-white drop-shadow">
              Valmiit kutistepussit mittojen mukaan
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90">
              Mittojen mukaan tehdyt kutistepussit istuvat täydellisesti, suojaavat varmasti
              ja näyttävät siistiltä. 
              Vähemmän muovia, nopeampi asennus, nopea toimitus.<br /><br /> Lähetä mitat tai veneen piirrustukset!
              Me hoidamme loput!
            </p>
           
          </div>

          <Link
            href="/kutistepussit"
            className="inline-flex items-center justify-center rounded-md bg-[#f08a00] px-5 py-3 font-semibold text-white shadow hover:bg-[#e27f00]"
          >
            Lue lisää kutistepusseista
          </Link>
        </div>
      </section>

      {/* 2 korttia */ }
<section className="border-b border-black/10">
  <div className="grid w-full grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x sm:divide-white/10">



    {/* ENSIN: Teollisuus & laitteet (oli ennen oikealla) */}
    <div className="relative min-h-[260px] overflow-hidden">
      <Image src="/kelmutus.talo.jpg" alt="" fill className="object-cover object-[50%_23%]" />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative p-6 text-white">
        <h3 className="font-serif text-[28px]">Teollisuus &amp; laitteet</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
          Kelmutamme myös teollisuuslaitteet, koneet ja laitekokoonpanot turvallisesti kuljetusta,
          varastointia ja työmaaolosuhteita varten. Valmistamme mittojen mukaan tehdyt
          kutistepussit tai teemme asennuksen paikan päällä, jolloin pinnat on siisti ja suoja
          tiivis.
        </p>

        <Link
          href="/palvelut"
          className="mt-6 inline-flex rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
        >
          Lue lisää palveluistamme
        </Link>
      </div>
    </div>

    {/* TOISENA: Kelmutus paikan päällä (oli ennen vasemmalla) */}
    <div className="relative min-h-[260px] overflow-hidden">
      <Image src="/kelmutetaan.jpg" alt="" fill className="object-cover object-[50%_20%]" />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative p-6 text-white">
        <h3 className="font-serif text-[28px]">Kelmutus paikan päällä</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
          Pelkkä valmis pussi ei aina riitä, vaan joskus vene pitää suojata siellä missä se on.
          <br />
          Tulemme tarvittaessa paikan päälle (eteläinen Suomi) ja kelmutamme veneen säilytystä tai kuljetusta varten.
        </p>

        <Link
          href="/palvelut"
          className="mt-6 inline-flex rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
        >
          Lue lisää palveluistamme
        </Link>
      </div>
    </div>

  </div>
</section>


      {/* Nopea asennus... + video */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h2 className="font-serif text-[44px] leading-tight text-slate-900">
            Nopea asennus, jämäkkä lopputulos.
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Katso video kun Axopar 28 menee ketterästi kelmuun. Kahden henkilön asennusaika 45 minuuttia! Hinta vain 358,80€
          </p>

          <div className="mx-auto mt-8 max-w-4xl">
            <ClickToPlayVideo src="/axopar38.mp4" poster="/axopar38-poster.jpg" />
          </div>

          <div className="mt-8">
            <Link
              href="/tyomme"
              className="inline-flex items-center justify-center rounded-md bg-[#6f79ff] px-8 py-3 font-semibold text-white shadow hover:brightness-95"
            >
              Katso lisää töitämme
            </Link>
          </div>
        </div>
      </section>

     

      {/* Loppu-CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <p className="mx-auto font-serif text-[20px] leading-relaxed text-slate-900">
            Tarjoamme kestäviä, huipputason kelmuja ja mittojen mukaan tilattavia valmiita
            kutistepusseja kuljetus-, logistiikka-, ja varastointitarpeisiin. Ratkaisumme
            suojaavat arvokkaan tuotteesi sääolosuhteilta ja kuljetuksen rasituksilta, jättäen
            pinnan siistiksi ja ryhdikkääksi. Nopea toimitus ja tarvittaessa asennus paikan
            päällä varmistavat sujuvan toteutuksen ja korkean asiakastytyväisyyden.
          </p>

          
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
        Kerro lyhyesti kohteesta (esim. vene tai teollisuuskohde) sekä toivotusta
        suojauksesta. Voit liittää mukaan kuvan, luonnoksen tai PDF-tiedoston
        mittojen ja kohteen hahmottamiseksi. Vastaamme sinulle mahdollisimman pian!
      </p>
    </div>

   <form
  action="/api/contact"
  method="POST"
  encType="multipart/form-data"
  className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
>
  <input type="hidden" name="source" value="etusivu / yhteys" />
  <input type="hidden" name="redirect" value="/#yhteys" />

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
          Lähettämällä lomakkeen hyväksyt, että otamme sinuun yhteyttä.
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
