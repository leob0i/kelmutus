import {JsonLd} from "@/components/JsonLd";
import {faqSchema} from "@/lib/schema";

// Pehmeä avautuminen selaimissa, jotka tukevat ::details-content-animaatiota (muissa aukeaa heti)
const smoothOpen =
  "[interpolate-size:allow-keywords] [&::details-content]:[block-size:0] [&::details-content]:overflow-clip [&::details-content]:[transition:block-size_250ms_ease,content-visibility_250ms_allow-discrete] open:[&::details-content]:[block-size:auto]";

// Näkyvä UKK-osio + FAQPage-skeema samasta sisällöstä.
// Kysymykset ovat <details>-elementtejä: vain kysymys näkyy, vastaus aukeaa painamalla
// (ei JavaScriptiä, ja vastaukset ovat silti sivun HTML:ssä hakukoneille).
export function Faq({
  title,
  items
}: {
  title: string;
  items: {q: string; a: string}[];
}) {
  return (
    <section id="ukk" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-14">
      <JsonLd data={faqSchema(items)} />

      <h2 className="font-serif text-4xl md:text-5xl">{title}</h2>

      <div className="mt-8 max-w-3xl divide-y divide-black/10 border-y border-black/10">
        {items.map((item) => (
          <details key={item.q} className={`group ${smoothOpen}`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f08a00] [&::-webkit-details-marker]:hidden">
              <h3 className="font-serif text-xl font-medium text-black">{item.q}</h3>
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5 shrink-0 text-black/50 transition duration-200 group-open:rotate-180 group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </summary>
            <p className="-mt-3 pb-5 font-serif text-lg leading-relaxed text-black/90">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
