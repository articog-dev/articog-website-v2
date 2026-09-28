import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import sitemap from "../app/sitemap";

describe("technical SEO and indexing", () => {
  it("excludes noindex and utility routes from the XML sitemap", () => {
    const sitemapSource = readFileSync(path.join(process.cwd(), "app", "sitemap.ts"), "utf8");

    expect(sitemapSource).toContain('const EXCLUDED_ROUTES = new Set(["/thank-you", "/thank-you/demo", "/sitemap"]);');
    expect(sitemapSource).toContain('entry.name === "api"');
  });

  it("emits unique production URLs for indexable founder profiles", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://www.articog.com/"))).toBe(true);
    expect(urls).toContain("https://www.articog.com/about/founder/sai-teja-inampudi");
    expect(urls).toContain("https://www.articog.com/about/founder/dr-harika-govada");
    expect(urls).not.toContain("https://www.articog.com/thank-you");
    expect(urls).not.toContain("https://www.articog.com/thank-you/demo");
    expect(urls).not.toContain("https://www.articog.com/sitemap");
  });

  it("includes the six client-confirmed indexable pages in the XML sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    const expectedUrls = [
      "https://www.articog.com/book-a-demo",
      "https://www.articog.com/work",
      "https://www.articog.com/services",
      "https://www.articog.com/solutions/enterprise",
      "https://www.articog.com/industries",
      "https://www.articog.com/contact",
    ];

    for (const url of expectedUrls) {
      expect(urls).toContain(url);
    }

    const excludedUrls = [
      "https://www.articog.com/thank-you",
      "https://www.articog.com/thank-you/demo",
      "https://www.articog.com/how-it-works",
      "https://www.articog.com/trust",
      "https://www.articog.com/work/industries",
      "https://www.articog.com/services/brand-films",
    ];

    for (const url of excludedUrls) {
      expect(urls).not.toContain(url);
    }
  });

  it("includes the expected canonical core marketing routes", () => {
    const homeSource = readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf8");
    const aboutSource = readFileSync(path.join(process.cwd(), "app", "about", "page.tsx"), "utf8");
    const servicesSource = readFileSync(path.join(process.cwd(), "app", "services", "page.tsx"), "utf8");
    const solutionsSource = readFileSync(path.join(process.cwd(), "app", "solutions", "page.tsx"), "utf8");
    const workSource = readFileSync(path.join(process.cwd(), "app", "work", "page.tsx"), "utf8");
    const blogSource = readFileSync(path.join(process.cwd(), "app", "blog", "page.tsx"), "utf8");

    expect(homeSource).toContain('canonical: "https://www.articog.com/"');
    expect(aboutSource).toContain('canonical: "https://www.articog.com/about"');
    expect(servicesSource).toContain('canonical: "https://www.articog.com/services"');
    expect(solutionsSource).toContain('canonical: "https://www.articog.com/solutions"');
    expect(workSource).toContain('canonical: "https://www.articog.com/work"');
    expect(blogSource).toContain('canonical: "https://www.articog.com/blog"');
  });

  it("keeps representative canonical URLs aligned with their public routes", () => {
    const homeSource = readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf8");
    const servicesSource = readFileSync(path.join(process.cwd(), "app", "services", "page.tsx"), "utf8");
    const privacySource = readFileSync(path.join(process.cwd(), "app", "privacy-policy", "page.tsx"), "utf8");

    expect(homeSource).toContain('canonical: "https://www.articog.com/"');
    expect(servicesSource).toContain('canonical: "https://www.articog.com/services"');
    expect(privacySource).toContain('canonical: "https://www.articog.com/privacy-policy"');
  });

  it("keeps the six client-confirmed pages indexable with matching canonicals", () => {
    const pages = [
      ["app", "book-a-demo", "layout.tsx"],
      ["app", "work", "page.tsx"],
      ["app", "services", "page.tsx"],
      ["app", "solutions", "enterprise", "page.tsx"],
      ["app", "industries", "page.tsx"],
      ["app", "contact", "layout.tsx"],
    ];
    const canonicalUrls = [
      "https://www.articog.com/book-a-demo",
      "https://www.articog.com/work",
      "https://www.articog.com/services",
      "https://www.articog.com/solutions/enterprise",
      "https://www.articog.com/industries",
      "https://www.articog.com/contact",
    ];

    pages.forEach((page, index) => {
      const source = readFileSync(path.join(process.cwd(), ...page), "utf8");
      expect(source).toContain(`canonical: "${canonicalUrls[index]}"`);
      expect(source).not.toMatch(/index\s*:\s*false/);
    });
  });

  it("does not block essential crawlers or public route access in robots.txt", () => {
    const robotsSource = readFileSync(path.join(process.cwd(), "app", "robots.ts"), "utf8");

    expect(robotsSource).toContain('userAgent: "*"');
    expect(robotsSource).toContain('allow: ["/"]');
    expect(robotsSource).toContain('sitemap: "https://www.articog.com/sitemap.xml"');
    expect(robotsSource).not.toContain("disallow");
  });
});
