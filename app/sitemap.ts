import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";

import { founders } from "../lib/founders";
import { getNativeBlogPosts } from "../lib/blog";

const SITE_URL = "https://www.articog.com";
const REDIRECTED_ROUTES = new Set([
  "/how-it-works",
  "/trust",
  "/why-articog/production-economics",
  "/accessibility",
  "/privacy",
  "/legal/privacy-policy",
  "/work/industries",
]);
const EXCLUDED_ROUTES = new Set(["/thank-you", "/thank-you/demo", "/sitemap"]);

function collectStaticRoutes(directory: string, segments: string[] = []): string[] {
  const routes: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    const entryPath = path.join(directory, entry.name);

    if (entry.isFile() && entry.name === "page.tsx") {
      const route = segments.length === 0 ? "/" : `/${segments.join("/")}`;
      if (!REDIRECTED_ROUTES.has(route) && !EXCLUDED_ROUTES.has(route)) {
        routes.push(route);
      }
      continue;
    }

    if (!entry.isDirectory() || entry.name === "api" || entry.name.startsWith("[")) {
      continue;
    }

    routes.push(...collectStaticRoutes(entryPath, [...segments, entry.name]));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = collectStaticRoutes(path.join(process.cwd(), "app"));
  const founderRoutes = founders.map((founder) => `/about/founder/${founder.slug}`);
  const blogRoutes = getNativeBlogPosts().map((post) => `/blog/${post.slug}`);
  const routes = new Set([...staticRoutes, ...founderRoutes, ...blogRoutes]);

  return [...routes].sort().map((route) => ({
    url: `${SITE_URL}${route}`,
  }));
}