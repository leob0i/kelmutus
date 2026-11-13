#!/usr/bin/env node
// IndexNow-ping (Bing, Yandex, Seznam, Naver ym.) muuttuneille sivuille.
//
// Käyttö (ajetaan deployn jälkeen, kun muutokset ovat tuotannossa):
//   npm run indexnow -- --since 2026-11-13      sitemapin URL:t, joiden lastmod >= päivä
//   npm run indexnow -- --all                   kaikki sitemapin URL:t
//   npm run indexnow -- https://www.kelmutus.fi/kutistepussit https://www.kelmutus.fi/en/kutistepussit
//   lisää --dry-run, niin URL:t vain tulostetaan
//
// Avain on julkinen: sama arvo on tiedostossa public/<KEY>.txt, ja IndexNow tarkistaa sen
// osoitteesta https://www.kelmutus.fi/<KEY>.txt.

const HOST = "www.kelmutus.fi";
const KEY = "416ed2a082bab799a78e75bf7d1f3b2e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const all = args.includes("--all");
const sinceIndex = args.indexOf("--since");
const since = sinceIndex >= 0 ? args[sinceIndex + 1] : null;
const explicitUrls = args.filter((a, i) => /^https?:\/\//.test(a) && i !== sinceIndex + 1);

function usage(message) {
  if (message) console.error(`Virhe: ${message}\n`);
  console.error(
    "Käyttö: node scripts/indexnow.mjs (--since YYYY-MM-DD | --all | <url> ...) [--dry-run]"
  );
  process.exit(1);
}

async function sitemapEntries() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`${SITEMAP}: HTTP ${res.status}`);
  const xml = await res.text();

  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? "",
  }));
}

async function main() {
  if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) usage("--since vaatii päivämäärän muodossa YYYY-MM-DD");
  if (!since && !all && explicitUrls.length === 0) usage();

  let urls = explicitUrls;
  if (since || all) {
    const entries = await sitemapEntries();
    urls = entries
      .filter((e) => all || e.lastmod.slice(0, 10) >= since)
      .map((e) => e.loc)
      .filter(Boolean);
  }

  const foreign = urls.filter((u) => new URL(u).host !== HOST);
  if (foreign.length) usage(`IndexNow hyväksyy vain osoitteet hostissa ${HOST}: ${foreign.join(", ")}`);

  if (urls.length === 0) {
    console.log("Ei lähetettäviä URL-osoitteita.");
    return;
  }

  console.log(`${urls.length} URL-osoitetta:\n  ${urls.join("\n  ")}`);
  if (dryRun) return;

  // IndexNow hylkää pyynnön (403), jos avaintiedosto ei ole tuotannossa
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyBody !== KEY) {
    throw new Error(`Avaintiedosto ${KEY_LOCATION} puuttuu tai ei täsmää (HTTP ${keyRes.status})`);
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });

  // 200 = vastaanotettu, 202 = vastaanotettu, avaimen tarkistus kesken
  console.log(`IndexNow: HTTP ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
