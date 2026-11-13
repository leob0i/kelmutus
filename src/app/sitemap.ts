import type {MetadataRoute} from "next";
import {routing} from "@/i18n/routing";
import {localizedAlternates} from "@/lib/seo";

// Sivut ja niiden viimeisin sisältömuutos (teksti, kuvat, title/description).
// Päivitä päivämäärä, kun sivun sisältöä muutetaan – sama arvo menee molemmille kieliversioille.
const routes = [
  {href: "/", lastModified: "2026-11-13"},
  {href: "/kutistepussit", lastModified: "2026-11-13"},
  {href: "/veneenhuollot", lastModified: "2026-11-13"},
  {href: "/palvelut", lastModified: "2026-11-13"},
  {href: "/tyomme", lastModified: "2026-11-13"},
  {href: "/meista", lastModified: "2026-11-13"},
  {href: "/talvisailytys", lastModified: "2026-11-13"},
  {href: "/kutistepussi-vai-pressu", lastModified: "2026-11-13"},
  {href: "/veneen-talvikatos", lastModified: "2026-11-13"},
  {href: "/tietosuoja", lastModified: "2026-11-13"}
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await Promise.all(
    routes.flatMap(({href, lastModified}) =>
      routing.locales.map(async (locale) => {
        const {canonical, languages} = await localizedAlternates(locale, href);
        return {url: canonical, lastModified, alternates: {languages}};
      })
    )
  );

  return entries;
}
