import {JsonLd} from "@/components/JsonLd";
import {faqSchema} from "@/lib/schema";

// Näkyvä UKK-osio + FAQPage-skeema samasta sisällöstä
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
          <div key={item.q} className="py-5">
            <h3 className="font-serif text-xl font-medium text-black">{item.q}</h3>
            <p className="mt-2 font-serif text-lg leading-relaxed text-black/90">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
