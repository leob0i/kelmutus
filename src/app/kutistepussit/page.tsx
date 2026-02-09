// src/app/kutistepussit/page.tsx
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function KutistepussitPage() {
  return (
    <>
      <main className="bg-white text-black">
        {/* HERO */}
        <section className="relative min-h-[72vh] md:min-h-[78vh] overflow-hidden">
          {/* Hero taustakuva */}
          <Image
            src="/saxdor.png"
            alt="Kutistepussit"
            fill
            priority
            className="object-cover"
          />

          {/* Tumma/vaalea overlay kuten kuvassa */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Header */}
          <div className="absolute inset-x-0 top-0 z-20">
            <SiteHeader />
          </div>

          {/* Hero content */}
          <div className="relative z-10 mx-auto flex min-h-[72vh] md:min-h-[78vh] max-w-6xl flex-col items-start justify-center px-6 pt-28 md:pt-24">

            <h1 className="font-serif text-4xl leading-tight text-white md:text-6xl">
              kutistepussit mittojen mukaan
            </h1>

            <p className="mt-4 max-w-2xl font-serif text-lg text-white/90 md:text-2xl">
              Suojat veneille ja teollisuuteen – mitoitettu, nopea toimitus,
              siisti pinta.
            </p>

           <a
  href="#yhteys"
  className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-base font-medium text-white shadow-md transition hover:bg-orange-600"
>
  Pyydä tarjous - lähetä mitat
</a>

          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-6 py-14">
          {/* Yläosa: vasen tekstit + oikea kuva */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            {/* Vasen */}
            <div>
              <h2 className="font-serif text-4xl md:text-5xl">
                Mitä kutistepussit ovat?
              </h2>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                Valmiiksi mitoitetut kutistepussimme valmistetaan kestävästä
                UV-stabiloidusta polyeteenistä (PE/LDPE). Materiaalin paksuus on
                tyypillisesti 150–200 µm, mikä takaa siistin, jämäkän pinnan ja
                erinomaisen suojan talvisäilytykseen ja kuljetukseen. Pussi
                kutistetaan paikalleen lämpökäsittelyllä
                (kuumailmapuhallin/kaasupoltin), jolloin se kiristyy tiiviisti
                rungon muotoihin, ilman rypytystä ja ylimääräistä muovia.
              </p>

              {/* MOBIILISSA kuva heti tämän tekstin jälkeen */}
<div className="mt-8 md:hidden">
  <div className="relative w-full overflow-hidden bg-gray-200">
    <Image
      src="/gallery/isovene.sivu.jpg"
      alt="Kutistepussit kaavio"
      width={1200}
      height={900}
      className="h-auto w-full object-contain"
    />
  </div>
</div>


              <h3 className="mt-10 font-serif text-4xl md:text-5xl">
                Miksi tämä ratkaisu?
              </h3>

              <ul className="mt-6 max-w-xl list-disc space-y-2 pl-6 font-serif text-lg text-black/90">
                <li>Täsmämitoitus: tehdään veneen mallin tai mittojen mukaan</li>
                <li>
                  Kestävä &amp; siisti: UV-suoja, vahvistetut saumat, siisti
                  lopputulos
                </li>
                <li>
                  Sään- ja suolankestävä: suojaa lialta, sateelta, jäältä ja
                  merisuolalta
                </li>
                <li>Nopea asennus: pussi paikoilleen ja lämpökutistus – valmis</li>
                <li>
                  Lisävarusteet: tuuletusventtiilit, tarkistusikkuna,
                  merkintäteipit
                </li>
              </ul>
            </div>

            {/* Oikea kuva (kaavio) – vain desktop/tablet */}
<div className="hidden md:block md:pt-8">
  <div className="relative w-full overflow-hidden bg-gray-200">
    <Image
      src="/gallery/isovene.sivu.jpg"
      alt="Kutistepussit kaavio"
      width={1200}
      height={900}
      className="h-auto w-full object-contain"
    />
  </div>
</div>

          </div>

          {/* Alaosa: vasen kuva + oikea teksti */}
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div className="relative hidden w-full overflow-hidden bg-gray-200 md:block">
  <Image
    src="/gallery/targa.23.png"
    alt="Vene kutistepussissa"
    width={1200}
    height={800}
    className="h-auto w-full object-cover"
  />
</div>


            <div>
              <h3 className="font-serif text-4xl md:text-5xl">
                Kestävä ratkaisu
              </h3>

              <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-black/90">
                Tarjoamme korkealaatuisia ja kestäviä kelmuja. Palvelumme avulla
                voit suojata arvokasta tavaraasi säältä ja kuljetuksen
                aiheuttamilta vaurioilta. Luotettavat ja nopeat toimitukset
                takaavat korkean asiakastyytyväisyyden.
              </p>

{/* MOBIILISSA kuva tähän väliin */}
<div className="mt-8 md:hidden">
  <div className="relative w-full overflow-hidden bg-gray-200">
    <Image
      src="/gallery/targa.23.png"
      alt="Vene kutistepussissa"
      width={1200}
      height={800}
      className="h-auto w-full object-cover"
    />
  </div>
</div>


              <p className="mt-8 font-serif text-lg text-black/90">
  <span className="block">
    Hinnat 45 € alv 0 % / m alle 10 m pulpettiveneet.
  </span>
<br />
  <span className="block mt-2">
    esim. <span className="whitespace-pre">Targa 23.1       351 €</span>
  </span>
</p>

            </div>
          </div>

          {/* UUSI INFO (sama leveys kuin kuva+teksti -alue, EI koko sivun levyinen) */}
<div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
  <div className="md:col-span-2">
    <p className="font-serif text-lg leading-relaxed text-black/90 max-w-none">
  Hinnat sisältävät perustason suojauksen ja työn asiakkaan osoittamassa paikassa Pääkaupunkiseudulla. Mikäli tarvitset lisäpalveluita, kuten kuljetuksen tai erikoisratkaisut, otathan yhteyttä. Räätälöimme tarjouksen tarpeesi mukaan.
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
        mittojen ja kohteen hahmottamiseksi. Palaamme sinulle mahdollisimman
        pian.
      </p>
    </div>

    <form
  action="/api/contact"
  method="POST"
  encType="multipart/form-data"
  className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
>
  <input type="hidden" name="source" value="toinen välilehti / yhteys" />
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
          Lähettämällä lomakkeen hyväksyt, että otamme sinuun yhteyttä tarjouksen
          ja lisäkysymysten kanssa.
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
    </>
  );
}
