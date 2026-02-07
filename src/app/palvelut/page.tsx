import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PalvelutPage() {
  return (
    <main className="bg-white text-black">
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="font-serif text-[44px] leading-tight">Palvelut</h1>

          <p className="mt-6 max-w-3xl text-[16px] leading-relaxed text-black/80">
            Kelmutus.fi nettisivusto on keskeneräinen ja sivut valmistuvat tuota pikaa.
            Sen aikaa jos kysyttävää ilmenee voit ottaa yhteyttä yhteydenotto lomakkeen
            kautta tai sähköpostiste:{" "}
            <a className="underline" href="mailto:jari@kelmutus.fi">
              jari@kelmutus.fi
            </a>
            .
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#yhteys"
              className="inline-flex items-center justify-center rounded-md bg-[#f08a00] px-6 py-3 font-semibold text-white shadow hover:bg-[#e27f00]"
            >
              Avaa yhteydenottolomake
            </Link>

            <a
              href="mailto:jari@kelmutus.fi"
              className="inline-flex items-center justify-center rounded-md border border-black/15 bg-white px-6 py-3 font-semibold text-black hover:bg-black/5"
            >
              Lähetä sähköposti
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
