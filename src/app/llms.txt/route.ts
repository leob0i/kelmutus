import fi from "@/messages/fi.json";
import {host} from "@/lib/seo";

// /llms.txt: tiivis kuvaus sivustosta tekoälyavustajille (ChatGPT, Claude, Perplexity ym.).
// Sisältö luodaan käännöstiedostosta, joten hinnat ja UKK pysyvät samoina kuin sivuilla.
export const dynamic = "force-static";

type FaqItem = {q: string; a: string};

const faqLines = (items: FaqItem[]) =>
  items.map((item) => `### ${item.q}\n${item.a}`).join("\n\n");

export function GET() {
  const services = fi.palvelut.services
    .map((s) => `- **${s.title}**: ${s.desc}`)
    .join("\n");

  const body = `# Kelmutus.fi

> ${fi.home.meta.description}

Kelmutus.fi on ShrinkPro Finland Oy:n (Y-tunnus ${fi.footer.businessIdValue}) palvelu. ${fi.kutistepussit.whatAre.body}

## Yhteystiedot

- Puhelin ja WhatsApp: +358 400 283 123
- Sähköposti: jari@kelmutus.fi
- Yhteyshenkilö: ${fi.meista.person.name}, ${fi.meista.person.title.toLowerCase()}
- Tarjouspyyntö: ${host}/#yhteys
- Toiminta-alue: kutistepussit toimitetaan koko Suomeen; kelmutus paikan päällä sekä veneiden huollot ja korjaukset pääkaupunkiseudulla, sovittaessa muualla Suomessa

## Sivut

- [${fi.kutistepussit.hero.title}](${host}/kutistepussit): ${fi.kutistepussit.meta.description}
- [${fi.palvelut.hero.title}](${host}/palvelut): ${fi.palvelut.meta.description}
- [${fi.veneenhuollot.hero.title}](${host}/veneenhuollot): ${fi.veneenhuollot.meta.description}
- [${fi.talvisailytys.title}](${host}/talvisailytys): ${fi.talvisailytys.meta.description}
- [${fi.tyomme.hero.title}](${host}/tyomme): ${fi.tyomme.meta.description}
- [${fi.nav.meista}](${host}/meista): ${fi.meista.meta.description}

## Palvelut

${services}
- **${fi.veneenhuollot.hero.title}**: ${fi.veneenhuollot.intro.body1}

## Hinnat

- ${fi.palvelut.onsite.title}: ${fi.palvelut.onsite.priceLine}
- ${fi.footer.vatNote}
- ${fi.kutistepussit.askBiggerBoats}

## ${fi.kutistepussit.faq.title}

${faqLines(fi.kutistepussit.faq.items)}

## ${fi.veneenhuollot.faq.title}

${faqLines(fi.veneenhuollot.faq.items)}

## In English

Kelmutus.fi (ShrinkPro Finland Oy) makes made-to-measure shrink wrap covers for boats and delivers them across Finland. The company also does on-site shrink wrapping of boats, cars, machinery and industrial equipment, and boat service and repairs in the Helsinki Capital Region. English pages: ${host}/en
`;

  return new Response(body, {
    headers: {"Content-Type": "text/plain; charset=utf-8"}
  });
}
