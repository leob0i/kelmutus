// src/app/tietosuoja/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tietosuojaseloste | Kelmutus",
  description:
    "Kelmutuksen tietosuojaseloste: mitä henkilötietoja kerätään, mihin niitä käytetään ja mitkä ovat oikeutesi.",
};

export default function TietosuojaselostePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <p className="text-sm font-medium text-slate-600">Kelmutus</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Tietosuojaseloste
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Viimeksi päivitetty: <span className="font-medium">8.2.2026</span>
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-10">
          <Block title="1) Rekisterinpitäjä">
            <p className="text-slate-700">
              Kelmutus (kelmutus.com / Kelmutus.fi)
              <br />
              Sähköposti:{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:jari@kelmutus.fi"
              >
                jari@kelmutus.fi
              </a>
              <br />
              Puhelin:{" "}
              <a
                className="underline underline-offset-4"
                href="tel:+358400283123"
              >
                +358 400 283123
              </a>
            </p>
          </Block>

          <Block title="2) Mitä henkilötietoja keräämme?">
            <p className="text-slate-700">
              Keräämme tietoja, kun lähetät meille tarjouspyynnön tai otat
              yhteyttä:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>Nimi</li>
              <li>Yritys (valinnainen)</li>
              <li>Sähköposti</li>
              <li>Puhelin</li>
              <li>Viestin sisältö (esim. kohteen tiedot ja mitat)</li>
              <li>Mahdollinen liitetiedosto (esim. kuva/PDF)</li>
            </ul>
            <p className="mt-4 text-slate-700">
              Lisäksi verkkosivun käytöstä voi syntyä teknisiä lokitietoja (esim.
              IP-osoite, selaintiedot, ajankohta), joita tarvitaan sivuston
              toiminnan ja tietoturvan varmistamiseen.
            </p>
          </Block>

          <Block title="3) Miksi käsittelemme tietoja?">
            <p className="text-slate-700">Käsittelemme tietoja, jotta voimme:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>vastata viestiisi ja tehdä tarjouksen</li>
              <li>
                kysyä lisätietoja ja hoitaa yhteydenpitoa tarjous- tai
                asiakasasioissa
              </li>
            </ul>
          </Block>

          <Block title="4) Käsittelyn oikeusperuste">
            <p className="text-slate-700">
              Käsittelemme tietoja ensisijaisesti:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>
                <span className="font-medium">
                  sopimuksen tekemiseksi / sopimusta edeltävien toimenpiteiden
                  toteuttamiseksi
                </span>{" "}
                (esim. tarjouksen laatiminen), ja/tai
              </li>
              <li>
                <span className="font-medium">oikeutetun edun perusteella</span>{" "}
                (asiakasviestintä ja toiminnan ylläpito).
              </li>
            </ul>
          </Block>

          <Block title="5) Luovutetaanko tietoja muille?">
            <p className="text-slate-700">
              Emme myy henkilötietoja.
            </p>
            <p className="mt-4 text-slate-700">
              Voimme käyttää luotettavia palveluntarjoajia (esim. hosting,
              sähköposti/IT), jotka käsittelevät tietoja puolestamme vain
              palvelun tuottamiseksi. Tietoja luovutetaan viranomaisille vain,
              jos laki sitä edellyttää.
            </p>
          </Block>

          <Block title="6) Kuinka kauan säilytämme tietoja?">
            <p className="text-slate-700">
              Säilytämme yhteydenottoihin ja tarjouspyyntöihin liittyviä tietoja
              niin kauan kuin asian hoitaminen sitä edellyttää, ja poistamme ne
              kohtuullisessa ajassa, ellei:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>asiakassuhde ala, tai</li>
              <li>
                laki velvoita säilyttämään tietoja pidempään (esim. kirjanpitoon
                liittyvät tiedot).
              </li>
            </ul>
          </Block>

          <Block title="7) Sinun oikeutesi">
            <p className="text-slate-700">Sinulla on oikeus:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>saada tietoa henkilötietojen käsittelystä</li>
              <li>tarkastaa tietosi</li>
              <li>pyytää tietojen oikaisua</li>
              <li>pyytää tietojen poistoa tietyissä tilanteissa</li>
              <li>rajoittaa käsittelyä tietyissä tilanteissa</li>
              <li>vastustaa käsittelyä tietyissä tilanteissa</li>
            </ul>
            <p className="mt-4 text-slate-700">
              Voit käyttää oikeuksiasi ottamalla yhteyttä:{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:jari@kelmutus.fi"
              >
                jari@kelmutus.fi
              </a>
              .
            </p>
          </Block>

          <Block title="8) Valitusoikeus">
            <p className="text-slate-700">
              Jos koet, että henkilötietojasi on käsitelty lainvastaisesti,
              sinulla on oikeus tehdä valitus valvontaviranomaiselle:
            </p>
            <p className="mt-4 text-slate-700">
              Tietosuojavaltuutetun toimisto (tietosuoja.fi){" "}
              <a
                className="underline underline-offset-4"
                href="https://tietosuoja.fi/yhteystiedot"
                target="_blank"
                rel="noreferrer"
              >
                Yhteystiedot
              </a>
            </p>
          </Block>

          <Block title="9) Tietoturva">
            <p className="text-slate-700">
              Suojaamme tiedot asianmukaisilla teknisillä ja organisatorisilla
              keinoilla ja rajaamme pääsyn tietoihin vain niille, joilla on
              työnsä puolesta tarve käsitellä niitä.
            </p>
          </Block>

          {/* Optional note */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-700">
              Huom: Jos sivustolla otetaan käyttöön analytiikka- tai
              markkinointievästeitä (esim. Google Analytics / Meta Pixel),
              sivustolle lisätään erillinen evästeilmoitus ja
              suostumusasetukset.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Kelmutus
        </div>
      </footer>
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="leading-relaxed">{children}</div>
    </section>
  );
}
