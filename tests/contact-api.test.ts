import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../app/api/contact/route";
import { buildContactPayload } from "../lib/contact-payload";
import { resetTestRateLimits } from "../lib/rate-limit";
import { resetTestLeadStorage, setTestLeadStorage } from "../lib/lead-storage";
import { resetTestIdempotency } from "../lib/idempotency";

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEB_APP_URL = "https://sheets.test/submit";
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    delete process.env.LEAD_NOTIFICATION_EMAIL;
    vi.restoreAllMocks();
    resetTestRateLimits();
    resetTestLeadStorage();
    resetTestIdempotency();
  });

  it("includes the empty honeypot value in the real form payload", () => {
    const formData = new FormData();
    formData.set("name", "Test User");
    formData.set("email", "test@example.com");
    formData.set("inquiryType", "Sales");
    formData.set("message", "Test message");
    formData.set("website", "");

    expect(buildContactPayload(formData).website).toBe("");
  });

  it("passes a populated honeypot value through the real form payload", () => {
    const formData = new FormData();
    formData.set("name", "Bot");
    formData.set("email", "bot@example.com");
    formData.set("inquiryType", "Other");
    formData.set("message", "Bot message");
    formData.set("website", "filled-honeypot");

    expect(buildContactPayload(formData).website).toBe("filled-honeypot");
  });

  it("persists the complete contact lead before emailing the company", async () => {
    const events: string[] = [];
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { events.push("redis"); persisted.push(value); return "OK"; },
    });
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      events.push(input === "https://api.resend.com/emails" ? "email" : "sheets");
      return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
    });

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.10" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          company: "Example Co",
          companyWebsite: "https://example.com",
          inquiryType: "Sales",
          message: "Test message",
          attribution: { source: "newsletter", campaign: "spring" },
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(persisted).toHaveLength(1);
    const lead = JSON.parse(persisted[0]);
    expect(lead.type).toBe("contact");
    expect(lead.fields).toMatchObject({
      name: "Test User",
      email: "test@example.com",
      company: "Example Co",
      companyWebsite: "https://example.com",
      inquiryType: "Sales",
      message: "Test message",
      attribution: { source: "newsletter", campaign: "spring" },
    });
    expect(new Date(lead.submittedAt).toISOString()).toBe(lead.submittedAt);
    expect(events.indexOf("redis")).toBeLessThan(events.indexOf("email"));
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const payloads = fetchMock.mock.calls.map(([input, init]) => ({
      input,
      init,
    }));

    const emailPayload = payloads.find((entry) => {
      if (entry.input !== "https://api.resend.com/emails") return false;
      return JSON.parse(String(entry.init?.body)).subject === "New contact form submission | Articog";
    });

    expect(emailPayload).toBeDefined();
    const body = JSON.parse(String(emailPayload?.init?.body));
    expect(body.to).toEqual(["info@articog.com"]);
    expect(body.text).toContain("Lead type: Contact Us");
    expect(body.text).toContain(`Submission timestamp: ${lead.submittedAt}`);
    expect(body.text).toContain("Name: Test User");
    expect(body.text).toContain("Email: test@example.com");
    expect(body.text).toContain("Company: Example Co");
    expect(body.text).toContain("Company website: https://example.com");
    expect(body.text).toContain("Inquiry type: Sales");
    expect(body.text).toContain('Attribution: {"source":"newsletter","campaign":"spring"}');
    expect(body.text).toContain("Test message");
  });

  it("returns a request ID and does not repeat processing for the same submission", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const makeRequest = () => new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "198.51.100.18" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    });

    const first = await POST(makeRequest());
    const duplicate = await POST(makeRequest());

    expect(first.status).toBe(200);
    expect(first.headers.get("X-Request-ID")).toMatch(/^[0-9a-f-]{36}$/);
    expect(duplicate.status).toBe(200);
    await expect(duplicate.json()).resolves.toEqual({ success: true, message: "This message was already processed." });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("handles concurrent duplicate requests with one processing path", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const request = () => new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": "concurrent-key", "x-real-ip": "198.51.100.21" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    });

    const responses = await Promise.all([POST(request()), POST(request())]);

    expect(responses.map((response) => response.status).sort()).toEqual([200, 202]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("uses a trusted platform request ID and rejects an oversized platform ID", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const makeRequest = (platformId: string) => new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-vercel-id": platformId, "x-real-ip": "198.51.100.22" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    });

    const trusted = await POST(makeRequest("iad1::trusted-request"));
    const generated = await POST(makeRequest("x".repeat(129)));

    expect(trusted.headers.get("X-Request-ID")).toBe("iad1::trusted-request");
    expect(generated.headers.get("X-Request-ID")).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("does not consume idempotency after validation failure", async () => {
    const makeRequest = (email: string) => new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": "validation-retry-key", "x-real-ip": "198.51.100.23" },
      body: JSON.stringify({ name: "Test User", email, company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    });

    expect((await POST(makeRequest("invalid"))).status).toBe(400);
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    expect((await POST(makeRequest("test@example.com"))).status).toBe(200);
  });

  it("supports independent idempotency keys and ignores malformed oversized keys", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const makeRequest = (key: string) => new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": key, "x-real-ip": "198.51.100.19" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    });

    expect((await POST(makeRequest("first-key"))).status).toBe(200);
    expect((await POST(makeRequest("second-key"))).status).toBe(200);
    expect((await POST(makeRequest("bad key with spaces"))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(9);
  });

  it("logs a failed non-blocking email notification without changing persisted-lead success", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { persisted.push(value); return "OK"; },
    });
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      if (input === "https://sheets.test/submit") return new Response(null, { status: 200 });
      if (input === "https://api.resend.com/emails") {
        return new Response(JSON.stringify({ error: { message: "private provider detail" } }), { status: 422 });
      }
      return new Response(null, { status: 200 });
    });

    const response = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "198.51.100.16" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    }));

    expect(response.status).toBe(200);
    expect(persisted).toHaveLength(1);
    expect(JSON.parse(persisted[0]).type).toBe("contact");
    expect(JSON.stringify(await response.json())).not.toContain("private");
    const entries = log.mock.calls.map(([entry]) => JSON.parse(String(entry)) as Record<string, unknown>);
    expect(entries).toEqual(expect.arrayContaining([
      expect.objectContaining({ event: "resend_notification_failed", operation: "contact-internal-notification", route: "contact" }),
    ]));
  });

  it("does not claim success when durable storage fails", async () => {
    setTestLeadStorage({ set: async () => { throw new Error("storage secret detail"); } });
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "198.51.100.17" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    }));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, error: "We could not save your message. Please try again later." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("allows a retry after durable storage failure without duplicate processing", async () => {
    setTestLeadStorage({ set: async () => { throw new Error("storage failure"); } });
    const makeRequest = () => new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "idempotency-key": "retryable-key", "x-real-ip": "198.51.100.20" },
      body: JSON.stringify({ name: "Test User", email: "test@example.com", company: "Example Co", inquiryType: "Sales", message: "Test message" }),
    });

    expect((await POST(makeRequest())).status).toBe(503);
    setTestLeadStorage({ set: async () => "OK" });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    expect((await POST(makeRequest())).status).toBe(200);
  });

  it("short-circuits honeypot submissions successfully without saving or emailing", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.11" },
        body: JSON.stringify({
          name: "Bot",
          email: "bot@example.com",
          inquiryType: "Other",
          message: "Bot message",
          website: "https://spam.example",
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid fields before calling downstream integrations", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.14" },
        body: JSON.stringify({
          name: "Valid User",
          email: "not-an-email",
          company: "Example Co",
          companyWebsite: "not-a-url",
          inquiryType: "Unknown",
          message: "Valid-looking submission.",
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies before calling downstream integrations", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.15" },
        body: JSON.stringify({
          name: "Valid User",
          email: "valid@example.com",
          company: "Example Co",
          inquiryType: "Sales",
          message: "x".repeat(16_001),
        }),
      }),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a valid contact submission when the honeypot is filled", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.13" },
        body: JSON.stringify({
          name: "Valid User",
          email: "valid@example.com",
          company: "Example Co",
          companyWebsite: "https://example.com",
          inquiryType: "Partnership",
          message: "A valid-looking submission.",
          website: "filled-honeypot",
        }),
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      message: "Message submitted successfully.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 429 after the request limit is reached", async () => {
    const ip = "198.51.100.12";
    const request = () =>
      POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json", "x-forwarded-for": ip },
          body: JSON.stringify({
            name: "Bot",
            email: "bot@example.com",
            inquiryType: "Other",
            message: "Bot message",
            website: "filled",
          }),
        })
      );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await request()).status).toBe(200);
    }

    const limitedResponse = await request();
    expect(limitedResponse.status).toBe(429);
    expect(limitedResponse.headers.get("Retry-After")).toMatch(/^[1-9]\d*$/);
    await expect(limitedResponse.json()).resolves.toMatchObject({ success: false });
  });
});
