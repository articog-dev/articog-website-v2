import { expect, test, type Page } from "@playwright/test";

const publicRoutes = [
  "/",
  "/services",
  "/services/ai-video-production",
  "/work",
  "/blog",
  "/contact",
  "/book-a-demo",
];

const mobileViewports = [320, 390, 768, 1440];

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() =>
    page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
}

async function fillContactForm(page: Page) {
  await page.getByLabel("Name").fill("E2E Test User");
  await page.getByLabel("Email").fill("e2e@example.com");
  await page.locator("#company").fill("E2E Test Company");
  await page.locator("#inquiryType").click();
  await page.getByRole("option", { name: "Sales" }).click();
  await page.getByLabel("Message").fill("Safe browser-level test submission.");
}

async function fillDemoForm(page: Page) {
  await page.getByLabel("First Name").fill("E2E");
  await page.getByLabel("Last Name").fill("Test");
  await page.getByLabel("Work Email").fill("e2e@example.com");
  await page.getByLabel("Company Name").fill("E2E Test Company");
  await page.getByLabel(/By submitting, you agree/).check();
}

async function fillPrivacyForm(page: Page) {
  await page.getByLabel("Full Name").fill("E2E Test User");
  await page.getByLabel("Email Address").fill("e2e@example.com");
  await page.locator("#type").click();
  await page.getByRole("option", { name: "Right to Delete" }).click();
  await page.getByLabel("Details / Message").fill("Safe browser-level privacy request.");
}

test.describe("public page smoke coverage", () => {
  for (const viewportWidth of mobileViewports) {
    test(`loads key routes without overflow at ${viewportWidth}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewportWidth, height: 900 });

      for (const route of publicRoutes) {
        const response = await page.goto(route, { waitUntil: "domcontentloaded" });
        expect(response?.ok(), `${route} should load successfully`).toBe(true);
        await expect(page.locator("h1").first()).toBeVisible();
        await expect(page.getByText(/Application error|Unhandled Runtime Error/i)).toHaveCount(0);
        await expectNoHorizontalOverflow(page);
      }
    });
  }
});

test.describe("contact flow", () => {
  test("submits safely and navigates to the thank-you page", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: "Build your next brand story with Articog." })).toBeVisible();
    await expect(page.locator('input[name="website"]')).toHaveCount(1);
    await fillContactForm(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page).toHaveURL(/\/thank-you$/);
  });

  test("shows a safe error when the API fails", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ success: false, error: "Please try again later." }),
      });
    });

    await page.goto("/contact");
    await fillContactForm(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.locator('[role="alert"]:not(#__next-route-announcer__)')).toHaveText("Please try again later.");
    await expect(page).not.toHaveURL(/\/thank-you$/);
    await expect(page.getByText(/Upstash|Authorization|command was/i)).toHaveCount(0);
  });

  test("does not treat a filled honeypot as a normal submission", async ({ page }) => {
    let submittedPayload: { website?: string } | undefined;
    await page.route("**/api/contact", async (route) => {
      submittedPayload = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ success: false, error: "Invalid request body." }),
      });
    });

    await page.goto("/contact");
    await fillContactForm(page);
    await page.locator('input[name="website"]').fill("filled-honeypot");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.locator('[role="alert"]:not(#__next-route-announcer__)')).toHaveText("Invalid request body.");
    expect(submittedPayload?.website).toBe("filled-honeypot");
    await expect(page).not.toHaveURL(/\/thank-you$/);
  });
});

test.describe("book-a-demo flow", () => {
  test("header and announcement links open the one-heading form step", async ({ page }) => {
    await page.goto("/");

    const links = [
      page.locator(".site-header a[href='/book-a-demo']"),
      page.locator(".announcement-bar a[href='/book-a-demo']"),
    ];

    for (const link of links) {
      await expect(link).toHaveAttribute("href", "/book-a-demo");
      await link.click();
      await expect(page).toHaveURL(/\/book-a-demo$/);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1, name: "Tell us what your brand needs every month." })).toBeVisible();
      await expect(page.locator("#cal-booking-panel")).toHaveCount(0);
      await page.goto("/");
    }
  });

  test("shows Cal.com scheduling only after demo submission and switches regional calendars", async ({ page }) => {
    await page.route("**/api/demo", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/book-a-demo");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1, name: "Tell us what your brand needs every month." })).toBeVisible();
    await expect(page.locator("#cal-booking-panel")).toHaveCount(0);
    await expect(page.locator("main form")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Prefer to tell us about your project first?" })).toHaveCount(0);

    await fillDemoForm(page);
    await page.getByRole("button", { name: "Continue to Scheduling" }).click();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1, name: "Pick a time that works for you" })).toBeVisible();
    await expect(page.locator("main form")).toBeHidden();

    const indiaTab = page.getByRole("tab", { name: "India / Middle East Team" });
    const internationalTab = page.getByRole("tab", { name: "International Team" });
    const directBookingLink = page.getByRole("link", { name: "Open the booking page directly" });
    const embed = page.locator("#cal-booking-panel [data-cal-link]");
    const iframe = page.locator("#cal-booking-panel iframe");

    await expect(indiaTab).toBeVisible();
    await expect(internationalTab).toBeVisible();
    await expect(embed).toHaveAttribute("data-cal-link", /articog\/demo-(india|americas)/);
    await expect(iframe).toHaveAttribute("src", /name=E2E\+Test/);
    await expect(iframe).toHaveAttribute("src", /email=e2e%40example\.com/);

    await indiaTab.click();
    await expect(embed).toHaveAttribute("data-cal-link", "articog/demo-india");
    await expect(directBookingLink).toHaveAttribute("href", "https://cal.com/articog/demo-india");
    await internationalTab.click();
    await expect(internationalTab).toHaveAttribute("aria-selected", "true");
    await expect(embed).toHaveAttribute("data-cal-link", "articog/demo-americas");
    await expect(directBookingLink).toHaveAttribute("href", "https://cal.com/articog/demo-americas");

    await indiaTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(internationalTab).toBeFocused();
    await expect(embed).toHaveAttribute("data-cal-link", "articog/demo-americas");
    await expect(page.getByRole("link", { name: "Open the booking page directly" }))
      .toHaveAttribute("rel", "noopener noreferrer");
  });

  test("shows a safe error when the demo request cannot be saved", async ({ page }) => {
    await page.route("**/api/demo", async (route) => {
      await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ success: false }) });
    });

    await page.goto("/book-a-demo");
    await fillDemoForm(page);
    await page.getByRole("button", { name: "Continue to Scheduling" }).click();
    await expect(page.locator('p[role="alert"]')).toHaveText("We could not save your request. Please try again.");
    await expect(page.getByText(/Upstash|Authorization/i)).toHaveCount(0);
  });
});

test.describe("privacy request flow", () => {
  test("validates required fields and submits a mocked request", async ({ page }) => {
    await page.route("**/api/privacy-request", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Your request was received for review." }),
      });
    });

    await page.goto("/privacy/request");
    await expect(page.getByRole("heading", { name: "Data Rights Request" })).toBeVisible();
    await page.getByRole("button", { name: "Submit Request" }).click();
    await expect(page.getByLabel("Full Name")).toBeFocused();
    await fillPrivacyForm(page);
    await page.getByRole("button", { name: "Submit Request" }).click();
    await expect(page.getByLabel("Full Name")).toHaveValue("");
    await expect(page.getByLabel("Email Address")).toHaveValue("");
  });

  test("handles a mocked API failure safely", async ({ page }) => {
    await page.route("**/api/privacy-request", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ success: false, error: "We could not submit your request. Please try again later." }),
      });
    });

    await page.goto("/privacy/request");
    await fillPrivacyForm(page);
    await page.getByRole("button", { name: "Submit Request" }).click();
    await expect(page.locator('[role="alert"]:not(#__next-route-announcer__)')).toHaveText("We could not submit your request. Please try again later.");
    await expect(page.getByText(/Upstash|Authorization|command was/i)).toHaveCount(0);
  });
});