import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("media SEO metadata", () => {
  // Home videos are poster-backed while their decorative playback loads.
  it("keeps meaningful image alt text descriptive and avoids generic placeholders", () => {
    const showcaseSource = read("components", "sections", "HomeVisualShowcase.tsx");
    const industrySource = read("components", "sections", "IndustryDetails.tsx");
    const founderSource = read("components", "sections", "FounderProfile.tsx");

    expect(showcaseSource).toContain('alt: "Articog creative visual study 01"');
    expect(industrySource).toContain('imageAlt: "DTC and E-commerce creative production"');
    expect(founderSource).not.toMatch(/alt:\s*["'](?:image|photo|visual|banner|placeholder)["']/i);
    expect(showcaseSource).not.toMatch(/alt:\s*["'](?:image|photo|visual|banner|placeholder)["']/i);
  });

  it("uses the industry alt text for its single panel image", () => {
    const source = read("components", "sections", "IndustryDetails.tsx");

    expect(source).toMatch(/src=\{industry\.image\}\s+alt=\{industry\.imageAlt\}/);
    expect(source.match(/<Image\b/g)).toHaveLength(1);
  });

  it("keeps important video thumbnails and embeds accessible", () => {
    const showcaseSource = read("components", "sections", "WorkVideoShowcase.tsx");
    const embedSource = read("components", "blog", "YouTubeEmbed.tsx");

    expect(showcaseSource).toContain('alt={video.title}');
    expect(showcaseSource).toContain("aria-label={`Open ${video.title} on YouTube in a new tab`}");
    expect(embedSource).toContain("title={title}");
    expect(embedSource).toContain('loading="lazy"');
  });

  it("keeps decorative home videos muted and hidden from assistive technology", () => {
    const hero = read("components", "sections", "Hero.tsx");
    const pipeline = read("components", "sections", "Pipeline.tsx");
    const approach = read("components", "sections", "OurApproach.tsx");

    for (const source of [hero, pipeline, approach]) {
      expect(source).toContain("<video");
      expect(source).toContain("muted");
      expect(source).toContain('aria-hidden="true"');
    }

    expect(hero).toContain("autoPlay");
    expect(pipeline).toContain('preload="none"');
    expect(pipeline).toContain('poster="/pipeline-poster.jpg"');
    expect(pipeline).toContain("useBufferedAutoplay");
    expect(approach).toContain('poster="/our-approach-poster.jpg"');
    expect(approach).toContain("useBufferedAutoplay");

    const lazyVideo = read("components", "ui", "LazyVideo.tsx");
    expect(lazyVideo).toContain("<video");
    expect(lazyVideo).toContain("IntersectionObserver");
    expect(read("app", "services", "page.tsx")).toContain("poster=");
  });

  it("uses Hostinger media without guessed or master URLs", () => {
    const sourceFiles = [
      ["components", "sections", "HomeVisualShowcase.tsx"],
      ["components", "sections", "Hero.tsx"],
      ["components", "sections", "Pipeline.tsx"],
    ];

    for (const file of sourceFiles) {
      const source = read(...file);
      expect(source).not.toMatch(/https:\/\/res\.[^/]+\.com\//);
      expect(source).not.toMatch(/\b(?:4k|master|production-master)\b/i);
    }

    expect(read("components", "sections", "HomeVisualShowcase.tsx")).toContain(
      "https://media.articog.com/images/home/",
    );
  });

  it("keeps Task 17 VideoObject generation guarded by complete known metadata", () => {
    const source = read("lib", "structured-data.ts");

    expect(source).toContain("createVideoObjectSchema");
    expect(source).toContain("!video.uploadDate");
    expect(source).toContain("!video.duration");
  });
});