import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...segments: string[]) =>
  readFileSync(path.join(process.cwd(), ...segments), "utf8");

describe("accessibility and responsive behavior", () => {
  it("keeps dialogs keyboard dismissible, contained, and focus-restoring", () => {
    const visualShowcase = read("components", "sections", "HomeVisualShowcase.tsx");
    const portfolioShowcase = read("app", "work", "CreativeDocument.tsx");

    for (const source of [visualShowcase, portfolioShowcase]) {
      expect(source).toContain('role="dialog"');
      expect(source).toContain('aria-modal="true"');
      expect(source).toContain('event.key !== "Tab"');
      expect(source).toContain('event.key === "Escape"');
      expect(source).toContain("triggerRef.current?.focus()");
    }
  });

  it("keeps navigation controls semantically named and Escape-dismissible", () => {
    const header = read("components", "layout", "Header.tsx");
    const mobileMenu = read("components", "layout", "MobileMenu.tsx");
    const footerNav = read("components", "layout", "FooterNavSections.tsx");

    expect(header).toContain('aria-expanded={activeGroup === group.label}');
    expect(header).toContain('event.key === "Escape"');
    expect(mobileMenu).toContain('aria-controls={`mobile-menu-${group.label.toLowerCase().replace(/\\s+/g, "-")}`}');
    expect(mobileMenu).toContain('aria-expanded={isGroupOpen}');
    expect(footerNav).toContain('aria-label={section.title}');
  });

  it("keeps form labels, required semantics, hidden honeypots, and checkbox grouping", () => {
    const contact = read("app", "contact", "page.tsx");
    const demo = read("app", "book-a-demo", "page.tsx");
    const privacy = read("app", "privacy", "request", "page.tsx");

    expect(contact).toContain('htmlFor="name"');
    expect(contact).toContain('name="inquiryType" defaultValue="" required');
    expect(contact).toContain('aria-hidden="true"');
    expect(demo).toContain("<fieldset");
    expect(demo).toContain("<legend");
    expect(demo).toContain('name="service-interest"');
    expect(privacy).toContain('name="type" defaultValue="" required');
    expect(privacy).toContain('role="alert"');
  });

  it("preserves accessible consent controls and global landmarks", () => {
    const cookieBanner = read("components", "layout", "CookieBanner.tsx");
    const layout = read("app", "layout.tsx");
    const mobileMenu = read("components", "layout", "MobileMenu.tsx");

    expect(cookieBanner).toContain('aria-label="Cookie consent"');
    expect(cookieBanner).toContain("Accept");
    expect(cookieBanner).toContain("Decline");
    expect(layout).toContain("<main className=\"flex-1\">");
    expect(layout).toContain("<Header />");
    expect(layout).toContain("<Footer />");
    expect(mobileMenu).toContain('role="dialog"');
    expect(mobileMenu).toContain('aria-label="Mobile navigation"');
  });

  it("preserves Task 19 media accessibility and Task 20 responsive sizing safeguards", () => {
    const mediaTest = read("tests", "media-seo.test.ts");
    const performanceTest = read("tests", "performance.test.ts");
    const mobileMenu = read("components", "layout", "MobileMenu.tsx");
    const announcement = read("components", "layout", "AnnouncementBar.tsx");

    expect(mediaTest).toContain("poster-backed");
    expect(performanceTest).toContain("stable media sizing");
    expect(mobileMenu).toContain("fixed inset-0 z-[1050]");
    expect(mobileMenu).toContain("h-[100dvh]");
    expect(announcement).toContain("whitespace-nowrap");
  });
});
