// src/app/ohjeet/veneen-talvisailytys/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veneen talvisäilytyksen ohjeet | Kelmutus",
  description:
    "Veneen talvisäilytyksen ohjeet: puhdistus, moottori, varusteet, suojaus ja turvallisuus.",
};

export default function VeneenTalvisailytysPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Sisältö (pt jättää tilaa läpinäkyvälle headerille) */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-28 md:pt-32">
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">
          Veneen talvisäilytyksen ohjeet
        </h1>

        <div className="mt-10 space-y-10 text-white/85">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              1. Puhdistus ja kuivaus
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">Puhdista pinnat:</span>{" "}
                Pese veneen sisätilat (kaapit, pinnat) miedolla saippua- tai
                etikkavedellä.
              </li>
              <li>
                <span className="font-medium text-white">Poista kosteus:</span>{" "}
                Tuuleta vene huolellisesti. Varmista, ettei letkuissa,
                jääkaapissa tai muissa syvennyksissä ole vettä.
              </li>
              <li>
                <span className="font-medium text-white">
                  Kuivaa perusteellisesti:
                </span>{" "}
                Anna kaikkien pintojen kuivua täysin, sillä kosteus edistää
                homeen kasvua.
              </li>
              <li>
                Laita kosteudenpoistajia esim. Motonetista Absodry
                kosteudenpoistaja.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              2. Moottori ja polttoaine
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">Täytä tankki:</span>{" "}
                Pidä polttoainesäiliö täynnä kondensaation ehkäisemiseksi.
              </li>
              <li>
                <span className="font-medium text-white">Suojaa moottori:</span>{" "}
                Käytä valmistajan ohjeiden mukaisesti glykolia tai muuta
                jäätymisenestoainetta.
              </li>
              <li>
                <span className="font-medium text-white">Huolto:</span> Vaihda
                öljyt ja suodattimet, tyhjennä tai vaihda vedenerottimen
                suodatin.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              3. Varusteet ja tarvikkeet
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">
                  Poista kosteudelle herkät materiaalit:
                </span>{" "}
                Vie pois tekstiilit, työkalut, elektroniikka ja muu irtaimisto.
              </li>
              <li>
                <span className="font-medium text-white">Säilytä akut oikein:</span>{" "}
                Irrota akut ja vie ne kuivaan, lämpimään paikkaan talven ajaksi.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              4. Säilytys ja suojaus
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">Pese köydet:</span>{" "}
                Huuhtele köydet makealla vedellä ja kuivaa hyvin ennen säilytystä.
              </li>
              <li>Kelmuta vene, Lisää tietoa www.kelmutus.fi</li>
              <li>
                <span className="font-medium text-white">Huolehdi ilmanvaihdosta:</span>{" "}
                Jätä luukut ja ovet hieman auki, sekä varmista tuuletusaukot
                kelmuun.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              5. Turvallisuus ja muut huomiot
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed md:text-base">
              <li>
                <span className="font-medium text-white">Tyhjennä pilssi:</span>{" "}
                Avaa perätulppa ja tarkista, ettei pilssiin jää vettä. Jos jää
                niin märkäimurilla loput pois. Tarkista myös pilssipumpun toiminta.
              </li>
              <li>
                <span className="font-medium text-white">Tyhjennä vesijärjestelmät:</span>{" "}
                Tyhjennä makeavesijärjestelmä ja kaada WC-pönttöön glykolia.
              </li>
              <li>
                Vene on nyt odottamassa kevättä ja voit huoletta alkaa
                suunnittelemaan tulevan kauden reittejä ☺
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
