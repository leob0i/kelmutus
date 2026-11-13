import {JsonLd} from "@/components/JsonLd";
import {Link} from "@/i18n/navigation";
import {faqSchema} from "@/lib/schema";

// Pehmeä avautuminen selaimissa, jotka tukevat ::details-content-animaatiota (muissa aukeaa heti)
const smoothOpen =
  "[interpolate-size:allow-keywords] [&::details-content]:[block-size:0] [&::details-content]:overflow-clip [&::details-content]:[transition:block-size_250ms_ease,content-visibility_250ms_allow-discrete] open:[&::details-content]:[block-size:auto]";

export type FaqItem = {
  q: string;
  a: string;
  // Vastauksen osa, joka näytetään linkkinä (teksti on vastauksessa sellaisenaan,
  // joten näkyvä vastaus ja FAQPage-skeeman teksti ovat täsmälleen samat)
  link?: {text: string; href: string};
};

// light: vaaleat sivut (oma säiliö), dark: tummat ohjesivut (/talvisailytys ym.), sijoitetaan sivun säiliöön
const styles = {
  light: {
    section: "mx-auto max-w-6xl scroll-mt-24 px-6 pb-14",
    title: "font-serif text-4xl md:text-5xl",
    list: "mt-8 max-w-3xl divide-y divide-black/10 border-y border-black/10",
    question: "font-serif text-xl font-medium text-black",
    icon: "text-black/50 group-hover:text-black",
    answer: "-mt-3 pb-5 font-serif text-lg leading-relaxed text-black/90",
    link: "underline decoration-black/30 underline-offset-4 hover:decoration-black"
  },
  dark: {
    section: "mt-14 scroll-mt-24",
    title: "text-xl font-semibold tracking-tight text-white md:text-2xl",
    list: "mt-4 divide-y divide-white/15 border-y border-white/15",
    question: "text-base font-medium text-white md:text-lg",
    icon: "text-white/60 group-hover:text-white",
    answer: "-mt-2 pb-5 text-[15px] leading-relaxed text-white/85 md:text-base",
    link: "text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
  }
};

function Answer({item, className}: {item: FaqItem; className: string}) {
  const i = item.link ? item.a.indexOf(item.link.text) : -1;
  if (!item.link || i < 0) return <>{item.a}</>;

  return (
    <>
      {item.a.slice(0, i)}
      <Link href={item.link.href} className={className}>
        {item.link.text}
      </Link>
      {item.a.slice(i + item.link.text.length)}
    </>
  );
}

// Näkyvä UKK-osio + FAQPage-skeema samasta sisällöstä.
// Kysymykset ovat <details>-elementtejä: vain kysymys näkyy, vastaus aukeaa painamalla
// (ei JavaScriptiä, ja vastaukset ovat silti sivun HTML:ssä hakukoneille).
export function Faq({
  title,
  items,
  variant = "light"
}: {
  title: string;
  items: FaqItem[];
  variant?: "light" | "dark";
}) {
  const s = styles[variant];

  return (
    <section id="ukk" className={s.section}>
      <JsonLd data={faqSchema(items)} />

      <h2 className={s.title}>{title}</h2>

      <div className={s.list}>
        {items.map((item) => (
          <details key={item.q} className={`group ${smoothOpen}`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f08a00] [&::-webkit-details-marker]:hidden">
              <h3 className={s.question}>{item.q}</h3>
              <svg
                viewBox="0 0 20 20"
                className={`h-5 w-5 shrink-0 transition duration-200 group-open:rotate-180 ${s.icon}`}
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
            <p className={s.answer}>
              <Answer item={item} className={s.link} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
