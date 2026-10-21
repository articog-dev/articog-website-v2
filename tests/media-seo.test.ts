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
    expect(pipeline).toContain('preload="metadata"');
    expect(pipeline).toContain("src={shouldLoad ? VIDEO_SOURCES.pipeline : undefined}");
    expect(pipeline).toContain('poster="/pipeline-poster.jpg"');
    expect(pipeline).toContain("useBufferedAutoplay");
    expect(approach).toContain('poster="/our-approach-poster.jpg"');
    expect(approach).toContain("useBufferedAutoplay");

    const lazyVideo = read("components", "ui", "LazyVideo.tsx");
    expect(lazyVideo).toContain("<video");
    expect(lazyVideo).toContain("IntersectionObserver");
    expect(lazyVideo).toContain('aria-label={isPlaying ? "Pause background video" : "Play background video"}');
    expect(lazyVideo).toContain("Video playback failed");
    expect(lazyVideo).toContain("Video source failed");
    expect(read("app", "services", "page.tsx")).toContain("poster=");
  });

  it("uses local-first video constants without guessed or master URLs", () => {
    const sourceFiles = [
      ["components", "sections", "HomeVisualShowcase.tsx"],
      ["components", "sections", "Hero.tsx"],
      ["components", "sections", "Pipeline.tsx"],
      ["components", "sections", "OurApproach.tsx"],
      ["app", "services", "page.tsx"],
    ];
    const videoSources = read("lib", "video-sources.ts");

    for (const file of sourceFiles) {
      const source = read(...file);
      expect(source).not.toMatch(/https:\/\/res\.[^/]+\.com\//);
      expect(source).not.toContain("media.articog.com/videos/backgrounds");
      expect(source).not.toMatch(/\b(?:4k|master|production-master)\b/i);
    }

    expect(videoSources).toContain('return `/videos/optimized/${filename}`;');
    expect(videoSources).toContain("NEXT_PUBLIC_MEDIA_BASE_URL");
    for (const filename of [
      "pipeline-1080.mp4",
      "our-approach-1080.mp4",
      "hero-1080.mp4",
      "WA-01.mp4",
      "WA-02.mp4",
      "WA-03.mp4",
      "WA-03-mobile.mp4",
    ]) {
      expect(videoSources).toContain(`"${filename}"`);
    }
    expect(videoSources).toContain("hero: [LOCAL_VIDEO_SOURCES.heroDesktop, LOCAL_VIDEO_SOURCES.heroMobile]");
    expect(read("components", "sections", "Hero.tsx")).toContain(
      'className="absolute inset-0 h-full w-full object-cover object-center"',
    );
    expect(read("app", "services", "page.tsx")).toContain("src={VIDEO_SOURCES.heroDesktop}");
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