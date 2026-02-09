// src/app/meista/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

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
            MEISTÄ
          </h1>

          <p className="mt-5 text-center font-serif text-lg text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.75)] md:text-xl">
  ShrinkPro Finland oy
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
              asentaa, siisti ja kestävä. Perinteinen suojapussi isoille veneille painaa jopa 50kg ja sen asentaminenkin vie useamman tunnin. 
            </p>

            <p className="mt-3">Siitä tuli idea Kelmutukseen!</p>

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
