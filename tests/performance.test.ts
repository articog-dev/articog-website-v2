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

  it("lets the Cal.com embed set its own height without an inner scroll container", () => {
    const embed = read("components", "booking", "CalEmbed.tsx");

    expect(embed).toContain('style={{ width: "100%", minHeight: 560 }}');
    expect(embed).toContain("min-h-[560px]");
    expect(embed).not.toContain('height: "100%"');
    expect(embed).not.toContain('overflow: "auto"');
    expect(embed).not.toContain(" h-[700px]");
    expect(embed).not.toContain("overflow-auto");
  });

  it("loads only the responsive hero video eagerly and keeps the gallery lazy", () => {
    const hero = read("components", "sections", "Hero.tsx");
    const gallery = read("components", "sections", "HomeVisualShowcase.tsx");

    expect(hero).toContain('src="https://media.articog.com/videos/backgrounds/WA-03-mobile.mp4"');
    expect(hero).toContain('media="(max-width: 767px)"');
    expect(hero).toContain('window.matchMedia("(max-width: 767px)")');
    expect(hero).toContain("!isMobileViewport ? (");
    expect(hero).toContain('src="https://media.articog.com/videos/backgrounds/WA-03.mp4"');
    expect(hero).toContain("autoPlay");
    expect(hero).toContain("muted");
    expect(hero).toContain("playsInline");
    expect(hero).toContain('preload="auto"');
    expect(hero).toContain('poster="/hero-poster.jpg"');
    expect(hero).toContain('addEventListener("loadeddata", attemptPlayback)');
    expect(hero).toContain('addEventListener("canplay", attemptPlayback)');
    expect(hero).toContain("video.play().catch");
    expect(hero).toContain('window.matchMedia("(prefers-reduced-motion: reduce)")');
    expect(hero).toContain("connection?.saveData");
    expect(hero).toContain("video.load()");
    expect(gallery).toContain('const CARD_SIZES = "(max-width: 640px) 70vw, min(max(24vw, 13rem), 21rem)"');
    expect(gallery).toContain("quality={90}");
    expect(gallery).toContain('loading={isNearActive ? "eager" : "lazy"}');
    expect(gallery).toContain('fetchPriority={isActive ? "high" : "auto"}');
    expect(gallery).not.toContain("min(66vw, 15rem)");
    expect(gallery).not.toContain("336px");
  });

  it("keeps Pipeline lazy and poster-backed while only the hero is eager", () => {
    const pipeline = read("components", "sections", "Pipeline.tsx");
    const approach = read("components", "sections", "OurApproach.tsx");

    expect(pipeline).toContain('{ rootMargin: "300px" }');
    expect(pipeline).toContain("enabled: shouldLoad");
    expect(pipeline).toContain('src: "https://media.articog.com/videos/backgrounds/WA-01.mp4"');
    expect(pipeline).toContain('preload="none"');
    expect(pipeline).toContain('poster="/pipeline-poster.jpg"');
    expect(pipeline).not.toContain("autoPlay");
    expect(pipeline).not.toContain('preload="auto"');
    expect(pipeline).not.toContain('src="https://media.articog.com/videos/backgrounds/WA-01.mp4"');
    expect(pipeline).toContain("muted");
    expect(pipeline).toContain("playsInline");
    expect(pipeline).toContain('aria-hidden="true"');

    expect(approach).toContain('poster="/our-approach-poster.jpg"');
    expect(approach).toContain("enabled: shouldLoad");
    expect(approach).toContain('preload="none"');
    expect(approach).toContain("muted");
    expect(approach).toContain("playsInline");
    expect(approach).toContain('aria-hidden="true"');

    const lazyVideo = read("components", "ui", "LazyVideo.tsx");
    expect(lazyVideo).toContain("requestIdleCallback");
    expect(lazyVideo).toContain("saveData");
    expect(lazyVideo).toContain("window.matchMedia(source.media).matches");
  });

  it("keeps the services hero responsive and deferred through LazyVideo", () => {
    const services = read("app", "services", "page.tsx");

    expect(services).toContain('media: "(max-width: 767px)"');
    expect(services).toContain("WA-03-mobile.mp4");
    expect(services).toContain("WA-03.mp4");
    expect(services).toContain('preload="auto"');
    expect(services).toContain("<LazyVideo");
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

    expect(layout).toContain('<link rel="preconnect" href="https://media.articog.com" crossOrigin="" />');
    expect(layout).toContain("siteEntitySchema");
    expect(home).toContain('type="application/ld+json"');
    expect(home).toContain('canonical: "https://www.articog.com/"');
  });

  it("keeps the lightbox eager, sharp, responsive, and keyboard/touch navigable", () => {
    const gallery = read("components", "sections", "HomeVisualShowcase.tsx");
    const styles = read("app", "globals.css");
    const config = read("next.config.ts");

    expect(gallery).toContain('const LIGHTBOX_SIZES = "(max-width: 1024px) 92vw, min(90vw, 62rem)"');
    expect(gallery).toContain("quality={95}");
    expect(gallery).toContain('loading="eager"');
    expect(gallery).toContain("priority");
    expect(gallery).not.toContain("width={2400}");
    expect(gallery).not.toContain("height={3200}");
    expect(gallery).toContain("showcase-lightbox__thumbnail");
    expect(gallery).toContain("onLoad={() => setLoadedLightboxSrc(selectedVisual.src)}");
    expect(gallery).toContain('aria-label="Previous visual"');
    expect(gallery).toContain('aria-label="Next visual"');
    expect(gallery).toContain("ArrowLeft");
    expect(gallery).toContain("ArrowRight");
    expect(gallery).toContain("onTouchStart");
    expect(gallery).toContain("onTouchEnd");
    expect(gallery).toContain("getLightboxPreloadUrl");
    expect(gallery).toContain("selectedIndex + 1} / {visuals.length");
    expect(styles).toContain("backface-visibility: hidden;");
    expect(styles).toContain("will-change: transform;");
    expect(config).toContain("deviceSizes: [320, 420, 640, 768, 1024, 1200, 1440, 1920, 2560]");
    expect(config).toContain("qualities: [60, 70, 80, 90, 95]");
  });
});