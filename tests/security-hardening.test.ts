import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { createContentSecurityPolicy } from "../lib/content-security-policy";

describe("production security hardening", () => {
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

  it("allows the Cal.com booking embed resources", () => {
    const layout = readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
    const bookingPage = readFileSync(path.join(process.cwd(), "app", "book-a-demo", "page.tsx"), "utf8");
    const policy = createContentSecurityPolicy(false);

    expect(layout).not.toContain("@calcom/embed-react");
    expect(bookingPage).toContain("BookingTabs");
    expect(policy).toMatch(/script-src[^;]*https:\/\/app\.cal\.com/);
    expect(policy).toMatch(/style-src[^;]*https:\/\/app\.cal\.com/);
    expect(policy).toMatch(/img-src[^;]*https:\/\/app\.cal\.com[^;]*https:\/\/cal\.com/);
    expect(policy).toMatch(/connect-src[^;]*https:\/\/app\.cal\.com[^;]*https:\/\/api\.cal\.com[^;]*https:\/\/cal\.com/);
    expect(policy).toMatch(/frame-src[^;]*https:\/\/app\.cal\.com[^;]*https:\/\/cal\.com/);
  });

  it("does not surface raw provider or fetch exceptions to demo users", () => {
    const bookingPage = readFileSync(path.join(process.cwd(), "app", "book-a-demo", "page.tsx"), "utf8");

    expect(bookingPage).toContain('const message = "We could not save your request. Please try again.";');
    expect(bookingPage).not.toContain("error instanceof Error ? error.message");
  });
});