import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("performance boundaries", () => {
  it("keeps the Cal.com booking embed route-scoped and analytics consent-gated", () => {
    const bookingPage = read("app", "book-a-demo", "page.tsx");
    const rootLayout = read("app", "layout.tsx");
    const analytics = read("components", "analytics", "GoogleAnalytics.tsx");

    expect(bookingPage).toContain("BookingTabs");
    expect(rootLayout).not.toContain("@calcom/embed-react");
    expect(analytics).toContain("analyticsConsent !== true");
    expect(analytics).toContain('strategy="afterInteractive"');
  });

  it("keeps the poster-backed autoplay hero and lazy below-fold gallery loading", () => {
    const hero = read("components", "sections", "Hero.tsx");
    const gallery = read("components", "sections", "HomeVisualShowcase.tsx");

    expect(hero).toContain('src="https://media.articog.com/videos/backgrounds/WA-03.mp4"');
    expect(hero).toContain("autoPlay");
    expect(hero).toContain("muted");
    expect(hero).toContain("playsInline");
    expect(hero).toContain('preload="auto"');
    expect(hero).toContain('poster="/hero-poster.jpg"');
    expect(hero).toContain('addEventListener("loadeddata", attemptPlayback)');
    expect(hero).toContain('addEventListener("canplay", attemptPlayback)');
    expect(hero).toContain("video.play().catch");
    expect(gallery).toContain('loading="lazy"');
    expect(gallery).not.toContain("priority={");
    expect(gallery).not.toContain("quality={100}");
  });

  it("keeps home videos poster-backed with muted autoplay retries", () => {
    const files = ["Hero.tsx", "Pipeline.tsx"];

    for (const file of files) {
      const source = read("components", "sections", file);
      expect(source).toContain("poster=");
      expect(source).toContain("autoPlay");
      expect(source).toContain("muted");
      expect(source).toContain("playsInline");
      expect(source).toContain('preload="auto"');
      expect(source).toContain('addEventListener("loadeddata", attemptPlayback)');
      expect(source).toContain('addEventListener("canplay", attemptPlayback)');
      expect(source).toContain("video.play().catch");
    }

    const lazyVideo = read("components", "ui", "LazyVideo.tsx");
    expect(lazyVideo).toContain("requestIdleCallback");
    expect(lazyVideo).toContain("saveData");
  });

  it("keeps stable media sizing and avoids blanket showcase will-change", () => {
    const blog = read("app", "blog", "[slug]", "page.tsx");
    const styles = read("app", "globals.css");

    expect(styles).toContain("aspect-ratio: 3 / 4");
    expect(blog).toContain('sizes="(max-width: 768px) 100vw, 1200px"');
    expect(styles).not.toContain("will-change: transform, opacity");
  });

  it("loads one responsive industry image per active panel", () => {
    const industries = read("components", "sections", "IndustryDetails.tsx");
    const industriesPage = read("app", "industries", "page.tsx");

    expect(industries.match(/<Image\b/g)).toHaveLength(1);
    expect(industries).toContain('loading={eagerImage ? "eager" : "lazy"}');
    expect(industries).toContain("hidden={!isActive}");
    expect(industries).toContain("const IMAGE_SIZES");
    expect(industries).not.toContain("width={1600}");
    expect(industriesPage).not.toContain("<video");
  });

  it("keeps footer navigation static and the announcement mobile-safe", () => {
    const announcement = read("components", "layout", "AnnouncementBar.tsx");

    expect(announcement).toContain("whitespace-nowrap");
    expect(announcement).toContain("onClick");
    expect(read("components", "layout", "FooterNavSections.tsx")).not.toContain('"use client"');
  });

  it("does not introduce master media or legacy media hosts", () => {
    const sources = [
      read("components", "sections", "Hero.tsx"),
      read("components", "sections", "HomeVisualShowcase.tsx"),
      read("components", "sections", "CaseStudies.tsx"),
      read("components", "sections", "Pipeline.tsx"),
    ];

    expect(sources.join("\n")).toContain("https://media.articog.com/");
    expect(sources.join("\n")).not.toMatch(/https:\/\/res\.[^/]+\.com\//);
    expect(sources.join("\n")).not.toMatch(/\b(?:4k|master|production-master)\b/i);
  });

  it("preserves critical SEO/schema output while optimizing media", () => {
    const layout = read("app", "layout.tsx");
    const home = read("app", "page.tsx");

    expect(layout).toContain("siteEntitySchema");
    expect(home).toContain('type="application/ld+json"');
    expect(home).toContain('canonical: "https://www.articog.com/"');
  });
});