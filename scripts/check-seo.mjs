#!/usr/bin/env node
// Tekninen SEO-tarkistus käynnissä olevaa palvelinta vasten (oletus: next start, portti 3000).
//   npm run build && npm run start   (toisessa terminaalissa)
//   npm run check:seo                tai  BASE_URL=https://www.kelmutus.fi npm run check:seo
//
// Tarkistaa jokaiselta sivulta: JSON-LD (JSON.parse + pakolliset kentät), täsmälleen yksi
// hreflang-sarja (fi, en, x-default), canonical, title/description-pituudet, yksi H1,
// kuvien alt-tekstit, ei /fi-linkkejä ja puhelinnumeron muodon. Lisäksi /fi-ohjaukset,
// sitemap.xml ja IndexNow-avaintiedosto.

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://www.kelmutus.fi";
const INDEXNOW_KEY = "416ed2a082bab799a78e75bf7d1f3b2e";

const routes = ["/", "/kutistepussit", "/veneenhuollot", "/palvelut", "/tyomme", "/meista", "/talvisailytys", "/tietosuoja"];
const faqRoutes = new Set(["/kutistepussit", "/veneenhuollot"]);
const AREA_COUNT = 13;

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const fiPath = (href) => href;
const enPath = (href) => (href === "/" ? "/en" : `/en${href}`);

// "https://www.kelmutus.fi" ja ".../" ovat sama osoite
const same = (a, b) => Boolean(a && b) && new URL(a).href === new URL(b).href;

function attr(tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
}

function decode(s) {
  return s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

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

function checkNode(node, where) {
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
      need(node.areaServed?.length === AREA_COUNT, `areaServed (${node.areaServed?.length})`);
      break;
    case "Product": {
      const offer = node.offers;
      need(node.name, "name");
      need(/^\d+\.\d{2}$/.test(offer?.price) && offer?.priceCurrency === "EUR", "offers.price/priceCurrency");
      need(offer?.priceSpecification?.valueAddedTaxIncluded === false, "valueAddedTaxIncluded false");
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
  nodes.forEach((node) => checkNode(node, where));
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

  for (const page of pages.filter(Boolean)) {
    console.log(`${page.path.padEnd(18)} ${page.types.join(", ")}`);
  }
  console.log(`\nsitemap.xml: ${sitemapCount} URL:ia`);

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
