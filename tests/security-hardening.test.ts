import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { CALENDLY_MESSAGE_ORIGIN, isTrustedCalendlyEvent } from "../lib/calendly";
import { createContentSecurityPolicy } from "../lib/content-security-policy";

describe("production security hardening", () => {
  it("accepts only the exact Calendly event origin and event", () => {
    expect(isTrustedCalendlyEvent({
      origin: CALENDLY_MESSAGE_ORIGIN,
      data: { event: "calendly.event_scheduled" },
    })).toBe(true);
    expect(isTrustedCalendlyEvent({
      origin: "https://evil.example",
      data: { event: "calendly.event_scheduled" },
    })).toBe(false);
    expect(isTrustedCalendlyEvent({
      origin: CALENDLY_MESSAGE_ORIGIN,
      data: { event: "other.event" },
    })).toBe(false);
  });

  it("keeps security headers and allows unsafe-eval only in development CSP", () => {
    const source = readFileSync(path.join(process.cwd(), "next.config.ts"), "utf8");

    expect(createContentSecurityPolicy(false)).toContain("frame-ancestors 'self'");
    expect(source).toContain('key: "X-Frame-Options"');
    expect(source).toContain('key: "X-Content-Type-Options"');
    expect(source).toContain("Strict-Transport-Security");
    expect(source).toContain("Referrer-Policy");
    expect(source).toContain("Permissions-Policy");
    expect(createContentSecurityPolicy(true)).toContain("'unsafe-eval'");
    expect(createContentSecurityPolicy(false)).not.toContain("'unsafe-eval'");
  });

  it("scopes Calendly assets to the booking page", () => {
    const layout = readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
    const bookingPage = readFileSync(path.join(process.cwd(), "app", "book-a-demo", "page.tsx"), "utf8");

    expect(layout).not.toContain("assets.calendly.com/assets/external/widget.js");
    expect(layout).not.toContain("assets.calendly.com/assets/external/widget.css");
    expect(bookingPage).toContain("assets.calendly.com/assets/external/widget.js");
    expect(bookingPage).toContain("assets.calendly.com/assets/external/widget.css");
  });

  it("does not surface raw Calendly or fetch exceptions to demo users", () => {
    const bookingPage = readFileSync(path.join(process.cwd(), "app", "book-a-demo", "page.tsx"), "utf8");

    expect(bookingPage).toContain('const message = "We could not open scheduling. Please try again.";');
    expect(bookingPage).toContain('const message = "We could not save your request. Please try again.";');
    expect(bookingPage).not.toContain("error instanceof Error ? error.message");
  });
});