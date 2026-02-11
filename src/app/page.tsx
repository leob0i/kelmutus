import Image from "next/image";
import Link from "next/link";
import { ClickToPlayVideo } from "@/components/ClickToPlayVideo";

type Promo = { title: string; body: string };

async function getPromo(): Promise<Promo | null> {
  const url = process.env.SHEETS_PROMO_GVIZ_URL;
  if (!url) return null;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); // päivittyy ~60s välein
    if (!res.ok) return null;

    const raw = await res.text();

    // GVIZ palauttaa: google.visualization.Query.setResponse({...});
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) return null;

    const data = JSON.parse(raw.slice(start, end + 1));
    const row = data?.table?.rows?.[0]?.c ?? [];



   const getCell = (cell: any) => cell?.v ?? cell?.f ?? "";
const title = getCell(row?.[0]);
const body  = getCell(row?.[1]);


    if (!title && !body) return null;

    return { title: String(title), body: String(body) };
  } catch {
    return null;
  }
}


export default async function HomePage() {
  const promo =
    (await getPromo()) ?? {
      title: "Kevätkauden kelmut nopeasti kotiin koko Suomeen!",
      body: "Tilaa mittojen mukaan tehty kutistepussi – toimitus nopeasti. Kysy myös asennus paikan päällä.",
    };



    
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
             {/* VAIN mobiili: ei vie tilaa (h-0), nappi oikealle tekstin alle */}
  <div className="relative h-0 sm:hidden">
    <Link
      href="/#yhteys"
      className="absolute right-0 -top-1 z-20 inline-flex h-8 items-center justify-center rounded-md bg-[#f08a00] px-4 text-[12px] font-semibold text-white shadow hover:bg-[#e27f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      Ota yhteyttä
    </Link>
  </div>
          </div>
        </div>
      </section>

      {/* Valmiit kutistepussit */}
     <section className="group relative overflow-hidden border-b border-black/10 transition hover:ring-1 hover:ring-white/20">

       <Image
  src="/saxdor.png"
  alt=""
  fill
  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
/>

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
   <div className="group relative min-h-[260px] overflow-hidden transition hover:ring-1 hover:ring-white/20">


      <Image
  src="/gallery/rekka.kelmussa.jpg"
  alt=""
  fill
  className="object-cover object-[50%_23%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
/>

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative p-6 text-white">
        <h3 className="font-serif text-[28px]">Teollisuus &amp; laitteet</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
          Kelmutamme teollisuuden laitteet, koneet ja valmiit laitekokonaisuudet niin, että ne ovat hyvin suojattuja kuljetuksen, varastoinnin ja työmaan aikana. Teemme suojat mittojen mukaan tai tulemme paikan päälle kelmuttamaan. Suojaus on siisti, tiivis ja pitää laitteet ja koneet hyvässä kunnossa säilytyksen tai kuljetuksen ajan.
          
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
    <div className="group relative min-h-[260px] overflow-hidden transition hover:ring-1 hover:ring-white/20">

      <Image
  src="/kelmutetaan.jpg"
  alt=""
  fill
  className="object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
/>

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative p-6 text-white">
        <h3 className="font-serif text-[28px]">Kelmutus paikan päällä</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
          Pelkkä valmis pussi ei aina riitä, vaan joskus vene pitää suojata siellä missä se on.
          <br />
          Tulemme tarvittaessa paikan päälle (eteläinen Suomi) ja kelmutamme veneen säilytystä tai kuljetusta varten.
        </p>

        <Link
          href="/palvelut#hinnat"
          className="mt-6 inline-flex rounded-md bg-[#f08a00] px-5 py-2.5 font-semibold text-white shadow hover:bg-[#e27f00]"
        >
          Lue lisää palveluistamme
        </Link>
      </div>
    </div>

  </div>
</section>


{/* Pehmeä siirtymä (tumma → vaalea) */}
<div
  aria-hidden
  className="h-16 bg-gradient-to-b from-slate-950/55 via-slate-950/15 to-slate-50"
/>


      {/* Nopea asennus... + video */}
<section className="bg-slate-50">
  <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-serif text-[38px] leading-tight text-slate-900 sm:text-[44px]">
        Nopea asennus, jämäkkä lopputulos.
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
        Katso video kun Axopar 28 menee ketterästi kelmuun. Kahden henkilön asennusaika 45 minuuttia!
        <br></br>Pussin hinta vain 358,80€ 
      </p>
    </div>

    <div className="mx-auto mt-10 max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-black shadow-[0_24px_70px_-40px_rgba(0,0,0,0.45)]">
        <ClickToPlayVideo src="/axopar38.mp4" poster="/axopar38-poster.jpg" />
      </div>
    </div>

    <div className="mt-10 flex justify-center">
      <Link
        href="/tyomme"
        className="inline-flex items-center justify-center rounded-full bg-[#f08a00] px-8 py-3 font-semibold text-white shadow hover:bg-[#e27f00]"
      >
        Katso lisää töitämme
      </Link>
    </div>
  </div>
</section>


{/* Promo + lupaus yhtenäisenä bandina (ei valkoisia pyöreitä kortteja) */}
<section className="relative overflow-hidden bg-[#0b1a33]">
  {/* kevyt “valo”-fiilis ilman kortteja */}
  <div
    aria-hidden
    className="absolute inset-0 opacity-[0.55]"
    style={{
      background:
        "radial-gradient(900px circle at 15% 0%, rgba(255,255,255,0.14), transparent 55%), radial-gradient(900px circle at 85% 65%, rgba(240,138,0,0.14), transparent 55%)",
    }}
  />
  <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-16">
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      {/* Promo vasen */}
      <div className="lg:col-span-7">
        <h2 className="font-serif text-[28px] leading-tight text-white sm:text-[34px]">
          {promo.title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-[15px] whitespace-pre-line">
          {promo.body}
        </p>
        
      </div>

      {/* Lupaus oikea: callout-tyyli (ei pyöreä laatikko) */}
      <div className="lg:col-span-5">
        <div className="border-l-2 border-[#f08a00] pl-5">
          <p className="font-serif text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
            Tarjoamme kestäviä, huipputason kelmuja ja mittojen mukaan tilattavia valmiita
            kutistepusseja kuljetus-, logistiikka-, ja varastointitarpeisiin. Ratkaisumme
            suojaavat arvokkaan tuotteesi sääolosuhteilta ja kuljetuksen rasituksilta, jättäen
            pinnan siistiksi ja ryhdikkääksi. Nopea toimitus ja tarvittaessa asennus paikan
            päällä varmistavat sujuvan toteutuksen ja korkean asiakastytyväisyyden.
          </p>
        </div>
      </div>
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
        mittojen ja kohteen hahmottamiseksi. Vastaamme sinulle mahdollisimman pian!
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
   {/* WhatsApp-logo (isompi) */}
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


    {/* Teksti isompi mutta nappi ei kasva (h-12) */}
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
