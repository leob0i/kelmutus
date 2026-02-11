// src/app/meista/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"; 

export const metadata: Metadata = {
  title: "Meistä | Kelmutus",
  description:
    "Kelmutus.fi – ShrinkPro Finland oy. Tarina, tekemisen tapa ja kaksi selkeää ratkaisua veneille ja teollisuuteen.",
};

export default function MeistaPage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="relative isolate overflow-hidden">
        {/* TAUSTAKUVA */}
        <Image
          src="/gallery/vene.merella.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        {/* TUMMA OVERLAY + ALAS TUMMENEVA GRADIENT */}
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/35 to-slate-950/85" />

        {/* SISÄLTÖ */}
        <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-14 md:pt-44 md:pb-20">
          <h1 className="text-center font-serif text-6xl tracking-[0.08em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.75)] md:text-8xl">
            KELMUTUS
          </h1>

          <p className="mt-5 text-center font-serif text-lg text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.75)] md:text-xl">
  ShrinkPro Finland Oy
  <span className="hidden md:inline">
    <span className="mx-2 text-white/50">•</span>
  </span>
  <span className="md:hidden">
    <br />
  </span>
  Y-tunnus 3578472-2
</p>



          <div className="mx-auto mt-10 max-w-5xl text-center font-serif text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] md:text-xl md:leading-relaxed">
            

            <p>
              Kelmutus.fi syntyi yhdestä käytännön tarpeesta: veneet ja laitteet tarvitsivat suojan, joka olisi nopea
              asentaa, siisti ja kestävä. Perinteinen kutistemuovirulla painaa 50kg, asentaminen on työlästä ja jää paljon hukkapaloja. 
            </p>

            <p className="mt-3">Siitä tuli idea mittojen mukaan tehtyihin kutistepusseihin. Valmiiksi mitoitetut kutistepussimme valmistetaan kestävästä UV-stabiloidusta polyeteenistä (PE/LDPE). Materiaalin paksuus on tyypillisesti 150–200 µm, mikä takaa siistin, jämäkän pinnan ja erinomaisen suojan talvisäilytykseen ja kuljetukseen.</p>

            <p className="mt-10">
              Meille tärkeintä on täsmällinen mitoitus, siisti lopputulos ja toimiva arki asiakkaalle. Pidämme kiinni aikatauluista ja huolehdimme, että suoja kestää
              talven, kuljetuksen ja varastoinnin. 
              <br /><br />

              Lähetä veneen malli tai mitat, me teemme niistä valmiin, huolettoman
              ratkaisun!
            </p>
          </div>

          {/* JAKOVIIVA */}
          <div className="mx-auto mt-16 h-px w-full max-w-6xl bg-white/25" />

          {/* HENKILÖPALLO (vain Jari) */}
          <div className="mx-auto mt-10 flex flex-col items-center pb-2 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-white/25 md:h-28 md:w-28">
              <Image src="/gallery/jari.png" alt="Jari Esimerkki" fill sizes="112px" className="object-cover" />
            </div>

            <p className="mt-4 font-serif text-lg text-white/90 md:text-xl">Jari Äyhö</p>
<p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/60 md:text-sm">
  Toimitusjohtaja
</p>


            {/* Yhteystiedot Jarin alle */}
            <div className="mt-3 space-y-1 text-sm text-white/80 md:text-base">
              <p>
                Puhelin:{" "}
                <a
                  href="tel:+358400283123"
                  className="text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  +358 400283123
                </a>
              </p>
              <p>
                Sähköposti:{" "}
                <a
                  href="mailto:jari@kelmutus.fi"
                  className="text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  jari@kelmutus.fi
                </a>
              </p>
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
  Ota yhteyttä
</h2>

      <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
        Kiireellisissä asioissa voit soittaa numeroon: +358 400283123. <br />Vastaamme sinulle mahdollisimman pian!
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
    {/* WhatsApp-logo */}
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
 <input type="hidden" name="source" value="meista / yhteys" />
<input type="hidden" name="redirect" value="/meista#yhteys" />


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
