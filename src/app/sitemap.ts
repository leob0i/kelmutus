import type {MetadataRoute} from "next";
import {getPathname} from "@/i18n/navigation";

const host = "https://www.kelmutus.fi";

const routes = [
  "/",
  "/kutistepussit",
  "/palvelut",
  "/tyomme",
  "/meista",
  "/talvisailytys",
  "/tietosuoja"
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  return Promise.all(
    routes.map(async (href) => {
      const fiPath = await getPathname({locale: "fi", href});
      const enPath = await getPathname({locale: "en", href});

      return {
        url: host + fiPath,
        lastModified,
        alternates: {
          languages: {
            fi: host + fiPath,
            en: host + enPath
          }
        }
      };
    })
  );
}
