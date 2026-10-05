/**
 * Analytics abstraction layer.
 *
 * Swap the provider in one place components never import a vendor SDK directly.
 *
 * The active provider is Google Analytics 4, configured by
 * NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

type EventName =
  | "page_view"
  | "cta_click"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "booking_open"
  | "booking_scheduled"
  | "demo_form_start"
  | "demo_form_submit"
  | "contact_submit"
  | "work_view"
  | "trust_view"
  | "section_view";

interface TrackEvent {
  name: EventName;
  properties?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ─── Core ─────────────────────────────────────────────────────────────────────

export function track({ name, properties }: TrackEvent): void {
  if (typeof window === "undefined") return;

  if (process.env['NODE_ENV'] === "development") {
     
    console.log(`[Analytics] ${name}`, properties ?? {});
    return;
  }

  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  }

  window.gtag("event", name, properties ?? {});
}

// ─── Convenience helpers ──────────────────────────────────────────────────────

export function trackPageView(path: string): void {
  track({ name: "page_view", properties: { path } });
}

export function trackCTAClick(label: string, destination: string): void {
  track({ name: "cta_click", properties: { label, destination } });
}

export function trackFormSubmit(formName: string): void {
  track({ name: "form_submit", properties: { form: formName } });
}

export function trackFormSuccess(formName: string): void {
  track({ name: "form_success", properties: { form: formName } });
}

export function trackFormError(formName: string, reason: string): void {
  track({ name: "form_error", properties: { form: formName, reason } });
}

export function trackBookingOpen(): void {
  track({ name: "booking_open" });
}

export function trackBookingScheduled(): void {
  track({ name: "booking_scheduled" });
}

export function trackDemoFormStart(): void {
  track({ name: "demo_form_start" });
}

export function trackDemoFormSubmit(): void {
  track({ name: "demo_form_submit" });
}

export function trackContactSubmit(): void {
  track({ name: "contact_submit" });
}

export function trackContentView(name: "work_view" | "trust_view"): void {
  track({ name });
}
