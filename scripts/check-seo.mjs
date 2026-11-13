#!/usr/bin/env node
// Tekninen SEO-tarkistus käynnissä olevaa palvelinta vasten (oletus: next start, portti 3000).
//   npm run build && npm run start   (toisessa terminaalissa)
//   npm run check:seo                tai  BASE_URL=https://www.kelmutus.fi npm run check:seo
//
// Tarkistaa jokaiselta sivulta: JSON-LD (JSON.parse + pakolliset kentät), UKK:n näkyvä teksti
// = FAQPage-skeema, täsmälleen yksi hreflang-sarja (fi, en, x-default), canonical,
// title/description-pituudet ja yksilöllisyys, yksi H1, kuvien alt-tekstit, puhelinnumeron
// muodon, navbarin linkit ja kielivalitsimen. Lisäksi kaikki sisäiset linkit (200, ei
// uudelleenohjauksia, ei /fi-osoitteita, #ankkurit olemassa), /fi-ohjaukset, sitemap.xml,
// robots.txt ja IndexNow-avaintiedosto.

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://www.kelmutus.fi";
const INDEXNOW_KEY = "416ed2a082bab799a78e75bf7d1f3b2e";

const routes = [
  "/", "/kutistepussit", "/veneenhuollot", "/palvelut", "/tyomme", "/meista", "/talvisailytys",
  "/kutistepussi-vai-pressu", "/veneen-talvikatos", "/teollisuuskelmutus", "/tietosuoja",
];
const faqRoutes = new Set([
  "/kutistepussit", "/veneenhuollot", "/talvisailytys", "/kutistepussi-vai-pressu", "/veneen-talvikatos",
]);
const AREA_COUNT = 13;
// Sivut, joille pääsee navbarista (työpöytä + mobiilivalikko); Palvelut-listassa huollot,
// teollisuuskelmutus, venepaja, paikan päällä (#hinnat) ja kaikki palvelut
const navTargets = [
  "/kutistepussit", "/veneenhuollot", "/palvelut", "/tyomme", "/meista",
  "/teollisuuskelmutus", "/veneen-talvikatos", "/palvelut#hinnat",
];

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const fiPath = (href) => href;
const enPath = (href) => (href === "/" ? "/en" : `/en${href}`);
const localePath = (locale, href) => (locale === "fi" ? fiPath(href) : enPath(href));

// sisäiset linkit kaikilta sivuilta: polku -> sivut, joilla linkki on
const internalLinks = new Map();
const titles = new Map();
const descriptions = new Map();

// "https://www.kelmutus.fi" ja ".../" ovat sama osoite
const same = (a, b) => Boolean(a && b) && new URL(a).href === new URL(b).href;

function attr(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// HTML-pätkä tekstiksi (tagit ja Reactin <!-- -->-merkit pois)
const plain = (s) => decode(s.replace(/<!-- -->/g, "").replace(/<[^>]+>/g, "")).trim();

function jsonLdNodes(html, where) {
  const nodes = [];
  for (const [, body] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      fail(where, `JSON-LD ei ole validia JSONia: ${err.message}`);
      continue;
    }
    if (data["@context"] !== "https://schema.org") fail(where, "JSON-LD:ltä puuttuu @context");
    nodes.push(...(data["@graph"] ?? [data]));
  }
  return nodes;
}

function checkNode(node, where, href) {
  const need = (cond, msg) => cond || fail(where, `${node["@type"]}: ${msg}`);
  switch (node["@type"]) {
    case "Organization":
      need(node.name === "Kelmutus.fi", "name");
      need(node.legalName === "ShrinkPro Finland Oy", "legalName");
      need(node.identifier?.value === "3578472-2" && node.taxID === "3578472-2", "Y-tunnus");
      need(node.url === SITE, "url");
      need(node.logo?.url === `${SITE}/logo.png`, "logo");
      need(node.telephone === "+358400283123", "telephone");
      need(node.email === "jari@kelmutus.fi", "email");
      need(node.sameAs?.some((u) => u.includes("facebook.com")), "sameAs Facebook");
      need(!node.address, "ei katuosoitetta");
      break;
    case "Service":
      need(node.name && node.description && node.url, "name/description/url");
      need(node.provider?.["@id"] === `${SITE}/#organization`, "provider = Organization");
      // Neljä pääpalvelua ja talvikatos: 13 aluetta. Palvelut-sivun palvelukortit (veneiden ja
      // autojen kelmutus, Laitamme kelmuun, venepaja): alueena Suomi.
      if (/teollisuuskelmutus|industrial shrink wrapping/i.test(node.name)) {
        need(/^https:\/\/www\.kelmutus\.fi(\/en)?\/teollisuuskelmutus$/.test(node.url), `url ${node.url}`);
      }
      need(
        node.areaServed?.length === AREA_COUNT ||
          (href === "/palvelut" && JSON.stringify(node.areaServed) === '[{"@type":"Place","name":"Finland"}]'),
        `areaServed (${node.areaServed?.length})`
      );
      break;
    case "Product": {
      const offer = node.offers;
      need(node.name, "name");
      need(/^\d+\.\d{2}$/.test(offer?.price) && offer?.priceCurrency === "EUR", "offers.price/priceCurrency");
      need(offer?.priceSpecification?.valueAddedTaxIncluded === false, "valueAddedTaxIncluded false");
      need(/^https:\/\/www\.kelmutus\.fi\/.+\.(jpe?g|png|webp)$/.test(node.image) && !/logo|opengraph/.test(node.image), `image ${node.image}`);
      need(node.brand?.["@type"] === "Brand" && node.brand?.name === "Kelmutus.fi", "brand");
      need(offer?.availability === "https://schema.org/MadeToOrder", "availability MadeToOrder");
      need(!["hasMerchantReturnPolicy", "shippingDetails"].some((k) => k in node || k in (offer ?? {})), "ei palautus-/toimituskenttiä");
      break;
    }
    case "VideoObject":
      for (const key of ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl"]) need(node[key], key);
      need(!Number.isNaN(Date.parse(node.uploadDate)), "uploadDate ISO 8601");
      break;
    case "BreadcrumbList":
      need(node.itemListElement?.length >= 2, "vähintään 2 tasoa");
      node.itemListElement?.forEach((item, i) => need(item.position === i + 1 && item.item?.startsWith(SITE), `taso ${i + 1}`));
      break;
    case "FAQPage":
      need(node.mainEntity?.length > 0 && node.mainEntity.every((q) => q.name && q.acceptedAnswer?.text), "kysymykset");
      break;
  }
}

async function checkPage(href, locale) {
  const path = locale === "fi" ? fiPath(href) : enPath(href);
  const where = path;
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) return fail(where, `HTTP ${res.status}`);

  const link = res.headers.get("link") ?? "";
  if (/hreflang/i.test(link)) fail(where, "HTTP Link-headerissa on hreflang (tupla)");

  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));

  // hreflang: täsmälleen yksi sarja
  const alternates = [...head.matchAll(/<link[^>]+rel="alternate"[^>]*>/g)]
    .map(([tag]) => [attr(tag, "hrefLang") ?? attr(tag, "hreflang"), attr(tag, "href")])
    .filter(([lang]) => lang);
  const expected = { fi: SITE + fiPath(href), en: SITE + enPath(href), "x-default": SITE + fiPath(href) };
  if (alternates.length !== 3) fail(where, `hreflang-merkintöjä ${alternates.length} (pitäisi olla 3)`);
  for (const [lang, url] of alternates) if (!same(expected[lang], url)) fail(where, `hreflang ${lang} -> ${url}`);

  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!same(canonical, locale === "fi" ? expected.fi : expected.en)) fail(where, `canonical ${canonical}`);

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (!title || title.length > 60) fail(where, `title ${title.length} merkkiä: ${title}`);
  if (!description || description.length > 155) fail(where, `description ${description.length} merkkiä`);
  titles.set(title, [...(titles.get(title) ?? []), path]);
  descriptions.set(description, [...(descriptions.get(description) ?? []), path]);

  // navbar ja kielivalitsin (ensimmäinen <header> on sivuston yläpalkki)
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
  for (const target of navTargets) {
    const count = header.split(`href="${localePath(locale, target)}"`).length - 1;
    if (count < 2) fail(where, `navbarista (työpöytä + mobiili) puuttuu linkki ${localePath(locale, target)}`);
  }
  const other = localePath(locale === "fi" ? "en" : "fi", href);
  if (header.split(`href="${other}"`).length - 1 < 2) fail(where, `kielivalitsin ei vie sivulle ${other}`);

  for (const [, link] of html.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)) {
    if (link.startsWith("/_next")) continue;
    internalLinks.set(link, [...new Set([...(internalLinks.get(link) ?? []), path])]);
  }

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(([, inner]) => decode(inner.replace(/<[^>]+>/g, "").trim()));
  if (h1s.length !== 1) fail(where, `H1-otsikoita ${h1s.length}`);
  if (h1s[0] === "KELMUTUS") fail(where, "H1 on pelkkä KELMUTUS");

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const alt = attr(tag, "alt");
    if (!alt) fail(where, `kuvalta puuttuu alt: ${decode(attr(tag, "src") ?? "").slice(0, 80)}`);
  }

  if (/href="\/fi(\/|"|#|\?)/.test(html)) fail(where, "sisäinen linkki /fi-osoitteeseen");

  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/(href|src)="[^"]*"/g, "");
  if (/040 ?028 ?3123|400283123|400 283123/.test(text)) fail(where, "puhelinnumero väärässä muodossa");

  const nodes = jsonLdNodes(html, where);
  nodes.forEach((node) => checkNode(node, where, href));

  // UKK: näkyvät kysymykset ja vastaukset sanatarkasti samat kuin FAQPage-skeemassa
  const visibleFaq = [...html.matchAll(/<details[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>\s*<\/details>/g)]
    .map(([, q, a]) => ({ q: plain(q), a: plain(a) }));
  const faqNode = nodes.find((n) => n["@type"] === "FAQPage");
  if (faqNode) {
    const schemaFaq = faqNode.mainEntity.map((m) => ({ q: m.name, a: m.acceptedAnswer.text }));
    if (JSON.stringify(schemaFaq) !== JSON.stringify(visibleFaq)) fail(where, "FAQPage-skeema ei vastaa sivulla näkyvää UKK:ta");
  } else if (visibleFaq.length) fail(where, "näkyvä UKK ilman FAQPage-skeemaa");
  const types = nodes.map((n) => n["@type"]);
  if (!types.includes("Organization")) fail(where, "Organization puuttuu");
  if (href !== "/" && !types.includes("BreadcrumbList")) fail(where, "BreadcrumbList puuttuu");
  if (faqRoutes.has(href) !== types.includes("FAQPage")) fail(where, "FAQPage vain sivuille, joilla on näkyvä UKK");

  return { path, title, h1: h1s[0], types };
}

async function checkRedirect(from, to) {
  const res = await fetch(BASE + from, { redirect: "manual" });
  const location = res.headers.get("location") ?? "";
  if (res.status !== 308 || new URL(location, BASE).pathname !== to) {
    fail(from, `ohjaus ${res.status} -> ${location} (pitäisi olla 308 -> ${to})`);
  }
}

async function checkSitemap() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, b]) => b);
  if (urls.length !== routes.length * 2) fail("sitemap.xml", `${urls.length} URL:ia (pitäisi olla ${routes.length * 2})`);
  for (const block of urls) {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
    if ((block.match(/hreflang=/g) ?? []).length !== 3) fail("sitemap.xml", `${loc}: alternates`);
    if (!/<lastmod>\d{4}-\d{2}-\d{2}/.test(block)) fail("sitemap.xml", `${loc}: lastmod`);
  }
  return urls.length;
}

async function main() {
  const pages = [];
  for (const href of routes) for (const locale of ["fi", "en"]) pages.push(await checkPage(href, locale));

  await checkRedirect("/fi", "/");
  await checkRedirect("/fi/kutistepussit", "/kutistepussit");
  await checkRedirect("/fi/en-ole-olemassa", "/en-ole-olemassa");
  const sitemapCount = await checkSitemap();

  const key = await fetch(`${BASE}/${INDEXNOW_KEY}.txt`);
  if (!key.ok || (await key.text()).trim() !== INDEXNOW_KEY) fail("IndexNow", "avaintiedosto puuttuu");

  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  if (!/Allow: \/\s/.test(robots) || /Disallow: \S/.test(robots)) fail("robots.txt", "ei salli kaikkea");
  if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt", "sitemap-viittaus puuttuu");

  for (const [map, label] of [[titles, "title"], [descriptions, "description"]]) {
    for (const [value, paths] of map) if (paths.length > 1) fail(label, `sama ${label} sivuilla ${paths.join(", ")}: ${value}`);
  }

  // sisäiset linkit: 200 ilman uudelleenohjausta, #ankkuri löytyy kohdesivulta
  const pageHtml = new Map();
  for (const [link, from] of internalLinks) {
    const [pathPart, hash] = link.split("#");
    const target = pathPart || "/";
    if (/^\/fi(\/|$|\?)/.test(target)) fail(from[0], `linkki /fi-osoitteeseen: ${link}`);
    if (!pageHtml.has(target)) {
      const res = await fetch(BASE + target, { redirect: "manual" });
      pageHtml.set(target, { status: res.status, html: res.status === 200 ? await res.text() : "" });
    }
    const { status, html } = pageHtml.get(target);
    if (status !== 200) fail(from.join(", "), `linkki ${link} -> HTTP ${status}`);
    else if (hash && !html.includes(`id="${hash}"`)) fail(from.join(", "), `linkin ${link} ankkuria #${hash} ei löydy`);
  }

  for (const page of pages.filter(Boolean)) {
    console.log(`${page.path.padEnd(18)} ${page.types.join(", ")}`);
  }
  console.log(`\nsitemap.xml: ${sitemapCount} URL:ia, sisäisiä linkkejä tarkistettu: ${internalLinks.size}`);

  if (errors.length) {
    console.error(`\n${errors.length} virhettä:\n  ${errors.join("\n  ")}`);
    process.exit(1);
  }
  console.log("\nKaikki tarkistukset ok.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
