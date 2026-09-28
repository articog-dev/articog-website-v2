import type { MetadataRoute } from "next";

const SITE_URL = "https://www.articog.com";
const APPROVED_ROUTES = [
  "/book-a-demo",
  "/contact",
  "/industries",
  "/services",
  "/solutions/enterprise",
  "/work",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return APPROVED_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));
}
