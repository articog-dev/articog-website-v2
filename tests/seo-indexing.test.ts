import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import sitemap from "../app/sitemap";

describe("technical SEO and indexing", () => {
  it("emits exactly the six approved URLs without duplicates or unwanted routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    const expectedUrls = [
      "https://www.articog.com/book-a-demo",
      "https://www.articog.com/contact",
      "https://www.articog.com/industries",
      "https://www.articog.com/services",
      "https://www.articog.com/solutions/enterprise",
      "https://www.articog.com/work",
    ];

    const excludedUrls = [
      "https://www.articog.com/about",
      "https://www.articog.com/blog",
      "https://www.articog.com/careers",
      "https://www.articog.com/compare/vs-ai-tools",
      "https://www.articog.com/copyright",
      "https://www.articog.com/founder-leadership",
      "https://www.articog.com/help",
      "https://www.articog.com/how-it-works/ai-creative-pipeline",
      "https://www.articog.com/legal/accessibility",
      "https://www.articog.com/privacy-policy",
      "https://www.articog.com/services/brand-films",
      "https://www.articog.com/services/ad-creative",
      "https://www.articog.com/solutions/performance-marketing",
      "https://www.articog.com/thank-you",
      "https://www.articog.com/thank-you/demo",
      "https://www.articog.com/trust/ai-and-ip",
      "https://www.articog.com/why-articog",
      "https://www.articog.com/work/video-ads",
    ];

    expect(urls).toEqual(expectedUrls);
    expect(new Set(urls).size).toBe(urls.length);
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
