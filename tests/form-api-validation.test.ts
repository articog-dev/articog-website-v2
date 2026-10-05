import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST as postDemo } from "../app/api/demo/route";
import { POST as postPrivacyRequest } from "../app/api/privacy-request/route";
import { resetTestRateLimits } from "../lib/rate-limit";
import { resetTestLeadStorage, setTestLeadStorage } from "../lib/lead-storage";
import { resetTestIdempotency } from "../lib/idempotency";
import { getIdempotencyFingerprint } from "../lib/idempotency";

const validDemoPayload = {
  firstName: "Test",
  lastName: "User",
  name: "Test User",
  email: "test@example.com",
  company: "Example Co",
  role: "Marketing",
  serviceInterest: ["Brand Film"],
  budget: "Under $5k",
  timeline: "Immediately",
  projectContext: "A short project.",
  referenceUrl: "https://example.com/reference",
  consent: true,
  attribution: {
    source: "newsletter",
    medium: "email",
    campaign: "spring",
    content: "cta",
    term: "video",
    referrer: "https://example.com/previous",
  },
};

function request(path: string, payload: unknown, ip: string) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(payload),
  });
}

describe("public form API validation", () => {
  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEB_APP_URL = "https://sheets.test/submit";
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "noreply@example.com";
    process.env.PRIVACY_REQUEST_ALERT_EMAIL = "privacy@example.com";
    delete process.env.LEAD_NOTIFICATION_EMAIL;
    vi.restoreAllMocks();
    resetTestRateLimits();
    resetTestLeadStorage();
    resetTestIdempotency();
  });

  it("accepts a valid demo request and persists it", async () => {
    const events: string[] = [];
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { events.push("redis"); persisted.push(value); return "OK"; },
    });
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      events.push(input === "https://api.resend.com/emails" ? "email" : "sheets");
      return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
    });

    const response = await postDemo(request("/api/demo", validDemoPayload, "198.51.100.20"));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).toHaveBeenCalledWith("https://sheets.test/submit", expect.any(Object));
    expect(persisted).toHaveLength(1);
    const savedLead = JSON.parse(persisted[0]);
    expect(savedLead.type).toBe("demo");
    expect(savedLead.fields).toMatchObject(validDemoPayload);
    expect(new Date(savedLead.submittedAt).toISOString()).toBe(savedLead.submittedAt);
    expect(events.indexOf("redis")).toBeLessThan(events.indexOf("email"));

    const notificationCall = fetchMock.mock.calls.find(([input, init]) =>
      input === "https://api.resend.com/emails" &&
      JSON.parse(String(init?.body)).subject === "New demo request | Articog",
    );
    expect(notificationCall).toBeDefined();
    const notification = JSON.parse(String(notificationCall?.[1]?.body));
    expect(notification.to).toEqual(["info@articog.com"]);
    expect(notification.text).toContain("Lead type: Book a Demo");
    expect(notification.text).toContain(`Submission timestamp: ${savedLead.submittedAt}`);
    expect(notification.text).toContain("First name: Test");
    expect(notification.text).toContain("Last name: User");
    expect(notification.text).toContain("Email: test@example.com");
    expect(notification.text).toContain("Company: Example Co");
    expect(notification.text).toContain("Role: Marketing");
    expect(notification.text).toContain("Service interest: Brand Film");
    expect(notification.text).toContain("Budget: Under $5k");
    expect(notification.text).toContain("Timeline: Immediately");
    expect(notification.text).toContain("Project context: A short project.");
    expect(notification.text).toContain("Reference / Website URL: https://example.com/reference");
    expect(notification.text).toContain("Consent: true");
    expect(notification.text).toContain('Attribution: {"source":"newsletter","medium":"email","campaign":"spring","content":"cta","term":"video","referrer":"https://example.com/previous"}');
    expect(notification.text).toContain("Selected date: Not available at lead submission");
    expect(notification.text).toContain("Selected time: Not available at lead submission");
    expect(notification.text).toContain("Timezone: Determined by Cal.com");
    expect(notification.text).toContain("Cal.com scheduling step follows this lead submission");
  });

  it("short-circuits demo honeypot submissions without persistence or integrations", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postDemo(
      request("/api/demo", { ...validDemoPayload, website: "filled-honeypot" }, "198.51.100.68"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true, message: "Demo request saved." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("logs a failed best-effort demo notification after persistence", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { persisted.push(value); return "OK"; },
    });
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      if (input === "https://sheets.test/submit") return new Response(null, { status: 200 });
      return new Response(JSON.stringify({ error: { message: "private provider detail" } }), { status: 422 });
    });

    const response = await postDemo(request("/api/demo", validDemoPayload, "198.51.100.64"));

    expect(response.status).toBe(200);
    expect(persisted).toHaveLength(1);
    expect(JSON.parse(persisted[0]).type).toBe("demo");
    expect(JSON.stringify(await response.json())).not.toContain("private");
    const entries = log.mock.calls.map(([entry]) => JSON.parse(String(entry)) as Record<string, unknown>);
    expect(entries).toEqual(expect.arrayContaining([
      expect.objectContaining({ event: "resend_notification_failed", operation: "demo-internal-notification", route: "demo" }),
    ]));
  });

  it("persists demo leads before tolerating a failed Google Sheets mirror", async () => {
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { persisted.push(value); return "OK"; },
    });
    vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      if (input === "https://sheets.test/submit") return new Response(null, { status: 502 });
      return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
    });

    const response = await postDemo(request("/api/demo", validDemoPayload, "198.51.100.65"));

    expect(response.status).toBe(200);
    expect(persisted).toHaveLength(1);
    expect(JSON.parse(persisted[0]).type).toBe("demo");
  });

  it("does not call Sheets or Resend when durable demo storage fails", async () => {
    setTestLeadStorage({ set: async () => { throw new Error("storage secret detail"); } });
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postDemo(request("/api/demo", validDemoPayload, "198.51.100.66"));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, error: "We could not save your request. Please try again later." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("limits demo requests and returns Retry-After", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const ip = "198.51.100.60";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await postDemo(request("/api/demo", validDemoPayload, ip))).status).toBe(200);
    }

    const response = await postDemo(request("/api/demo", validDemoPayload, ip));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toMatch(/^[1-9]\d*$/);
  });

  it("does not persist a rate-limited demo request", async () => {
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { persisted.push(value); return "OK"; },
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email-id" }), { status: 200 }));
    const ip = "198.51.100.67";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await postDemo(request("/api/demo", validDemoPayload, ip))).status).toBe(200);
    }
    expect((await postDemo(request("/api/demo", validDemoPayload, ip))).status).toBe(429);
    expect(persisted).toHaveLength(1);
  });

  it("isolates limits by API route for the same client", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const ip = "198.51.100.61";

    expect((await postDemo(request("/api/demo", validDemoPayload, ip))).status).toBe(200);
    const response = await postPrivacyRequest(
      request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, ip),
    );

    expect(response.status).toBe(200);
  });

  it("does not collide across routes or validated idempotency keys", () => {
    const request = new Request("http://localhost/api/demo", { headers: { "idempotency-key": "same-key" } });
    const demo = getIdempotencyFingerprint(request, "demo", { value: "same" });
    const privacy = getIdempotencyFingerprint(request, "privacy-request", { value: "same" });
    const otherKey = getIdempotencyFingerprint(new Request("http://localhost/api/demo", { headers: { "idempotency-key": "other-key" } }), "demo", { value: "same" });

    expect(demo.key).not.toBe(privacy.key);
    expect(demo.key).not.toBe(otherKey.key);
    expect(demo.key).not.toContain("same-key");
  });

  it("does not let arbitrary forwarded headers bypass the limiter", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const makeRequest = (spoofedIp: string) => new Request("http://localhost/api/demo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": spoofedIp,
        "x-real-ip": "198.51.100.63",
      },
      body: JSON.stringify(validDemoPayload),
    });

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await postDemo(makeRequest(`203.0.113.${attempt + 1}`))).status).toBe(200);
    }

    expect((await postDemo(makeRequest("203.0.113.99"))).status).toBe(429);
  });

  it("fails closed when shared rate-limit configuration is unavailable", async () => {
    const originalNodeEnv = process.env.NODE_ENV;
    const environment = process.env as Record<string, string | undefined>;
    const fetchMock = vi.spyOn(globalThis, "fetch");
    environment.NODE_ENV = "production";
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;

    try {
      const response = await postDemo(request("/api/demo", validDemoPayload, "198.51.100.62"));
      expect(response.status).toBe(503);
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      environment.NODE_ENV = originalNodeEnv;
    }
  });

  it.each([
    ["missing required field", { ...validDemoPayload, company: undefined }],
    ["wrong field type", { ...validDemoPayload, consent: "yes" }],
    ["invalid URL", { ...validDemoPayload, referenceUrl: "not-a-url" }],
    ["invalid enum", { ...validDemoPayload, budget: "free" }],
    ["oversized array", { ...validDemoPayload, serviceInterest: Array(7).fill("Brand Film") }],
    ["oversized string", { ...validDemoPayload, projectContext: "x".repeat(5_001) }],
  ])("rejects demo input: %s without persistence", async (_label, payload) => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postDemo(request("/api/demo", payload, `198.51.100.${Math.floor(Math.random() * 200) + 21}`));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts a valid privacy request and sends it for review", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    const response = await postPrivacyRequest(
      request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete", details: "Please delete my data." }, "198.51.100.40"),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", expect.any(Object));
  });

  it("persists a privacy request before sending its notification", async () => {
    const persisted: string[] = [];
    setTestLeadStorage({
      set: async (_key, value) => { persisted.push(value); return "OK"; },
    });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ id: "email-id" }), { status: 200 }));

    const response = await postPrivacyRequest(
      request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, "198.51.100.46"),
    );

    expect(response.status).toBe(200);
    expect(persisted).toHaveLength(1);
    expect(JSON.parse(persisted[0]).type).toBe("privacy-request");
  });

  it("does not call Resend when durable privacy storage fails", async () => {
    setTestLeadStorage({ set: async () => { throw new Error("storage secret detail"); } });
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postPrivacyRequest(
      request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, "198.51.100.47"),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ success: false, error: "We could not submit your request. Please try again later." });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["provider error", new Response(JSON.stringify({ error: { message: "private provider detail" } }), { status: 422 })],
    ["network failure", new Error("private network detail")],
  ])("does not report success when privacy email has a %s", async (_label, failure) => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      if (failure instanceof Error) throw failure;
      return failure;
    });

    const response = await postPrivacyRequest(
      request("/api/privacy-request", { name: "Test User", email: "test@example.com", requestType: "delete" }, "198.51.100.45"),
    );

    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body).toEqual({ success: false, error: "We could not submit your request. Please try again later." });
    expect(JSON.stringify(body)).not.toContain("private");
    expect(log.mock.calls.flat().join(" ")).not.toContain("private");
  });

  it.each([
    ["missing required field", { email: "test@example.com", requestType: "delete" }],
    ["wrong field type", { name: "Test User", email: "test@example.com", requestType: 1 }],
    ["invalid email", { name: "Test User", email: "invalid", requestType: "delete" }],
    ["invalid enum", { name: "Test User", email: "test@example.com", requestType: "export" }],
    ["oversized details", { name: "Test User", email: "test@example.com", requestType: "delete", details: "x".repeat(5_001) }],
  ])("rejects privacy input: %s without sending", async (_label, payload) => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await postPrivacyRequest(
      request("/api/privacy-request", payload, `198.51.100.${Math.floor(Math.random() * 200) + 41}`),
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});