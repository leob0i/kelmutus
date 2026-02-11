import type { MetadataRoute } from "next";

const BASE_URL = "https://www.kelmutus.fi";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    "/",
    "/meista",
    "/tyomme",
    "/palvelut",
    "/kutistepussit",
    "/tietosuoja",
  ];

  return routes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));
}
