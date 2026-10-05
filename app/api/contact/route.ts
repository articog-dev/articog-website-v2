import { parseJsonBody, validateEmail, validateEnum, validateString, validateUrl } from "../../../lib/api-validation";
import { acquireIdempotency, completeIdempotency, getIdempotencyFingerprint, releaseIdempotency } from "../../../lib/idempotency";
import { checkPublicFormRateLimit } from "../../../lib/rate-limit";
import { getRequestId, withRequestId } from "../../../lib/request-context";
import { logOperational } from "../../../lib/observability";
import { sendResendEmail } from "../../../lib/resend";
import { saveLead, withPersistenceTimeout } from "../../../lib/lead-storage";

type ContactData = {
  name: string;
  email: string;
  company?: string;
  companyWebsite?: string;
  inquiryType: string;
  message: string;
};

const DEFAULT_INTERNAL_ALERT_EMAIL = "articog.media.01@gmail.com";
async function alertSheetFailure(data: ContactData, error: unknown, requestId: string) {
  const recipient = process.env.CONTACT_INTERNAL_ALERT_EMAIL || DEFAULT_INTERNAL_ALERT_EMAIL;

  if (!recipient) {
    logOperational("error", "sheets_failure_alert_unconfigured", { requestId, route: "contact", operation: "contact-sheet-failure-alert", result: "failure", errorName: error instanceof Error ? error.name : "unknown-error" });
    return;
  }

  try {
    const result = await sendResendEmail("contact-sheet-failure-alert", {
      to: recipient,
      subject: "Contact form backup alert: Google Sheets submission failed",
      text: [
        "A contact form lead could not be saved to Google Sheets.",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Company website: ${data.companyWebsite}`,
        `Inquiry type: ${data.inquiryType}`,
        `Message: ${data.message}`,
        "",
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ].join("\n"),
    }, { requestId, route: "contact" });
    if (!result.ok) logOperational("error", "sheets_failure_alert_failed", { requestId, route: "contact", operation: "contact-sheet-failure-alert", result: "failure" });
  } catch (alertError) {
    logOperational("error", "sheets_failure_alert_exception", { requestId, route: "contact", operation: "contact-sheet-failure-alert", errorName: alertError instanceof Error ? alertError.name : "unknown-error", result: "failure" });
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  let idempotencyKey: string | undefined;
  try {
    const rateLimit = await checkPublicFormRateLimit(request, "contact");
    if (!rateLimit.available) {
      logOperational("error", "rate_limit_unavailable", { requestId, route: "contact", result: "failure" });
      return withRequestId(requestId,
        { success: false, error: "This service is temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }
    if (!rateLimit.success) {
      logOperational("warn", "api_request_rejected", { requestId, route: "contact", result: "rate_limited", status: 429 });
      return withRequestId(requestId,
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const body = await parseJsonBody(request, 16 * 1024);
    if (!body.ok) {
      logOperational("warn", "api_request_rejected", { requestId, route: "contact", result: "validation", status: 400 });
      return withRequestId(requestId, { success: false, error: body.error }, { status: 400 });
    }

    const website = validateString(body.value.website, { maxLength: 200 });
    if (!website.ok) {
      logOperational("warn", "api_request_rejected", { requestId, route: "contact", result: "validation", status: 400 });
      return withRequestId(requestId, { success: false, error: "Invalid request body." }, { status: 400 });
    }
    if (website.value) {
      return withRequestId(requestId, { success: true, message: "Message submitted successfully." });
    }

    const attribution = typeof body.value.attribution === "object" && body.value.attribution !== null
      ? Object.fromEntries(
          Object.entries(body.value.attribution as Record<string, unknown>)
            .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
            .map(([key, value]) => [key, String(value).trim()]),
        )
      : {};

    const name = validateString(body.value.name, { required: true, maxLength: 160 });
    const email = validateEmail(body.value.email);
    const company = validateString(body.value.company, { required: true, maxLength: 160 });
    const companyWebsite = validateUrl(body.value.companyWebsite, { maxLength: 2_048 });
    const inquiryType = validateEnum(body.value.inquiryType, ["Sales", "Partnerships", "Press", "Other"] as const, { required: true, maxLength: 32 });
    const message = validateString(body.value.message, { required: true, maxLength: 5_000 });

    if (!name.ok || !email.ok || !company.ok || !companyWebsite.ok || !inquiryType.ok || !message.ok) {
      logOperational("warn", "api_request_rejected", { requestId, route: "contact", result: "validation", status: 400 });
      return withRequestId(requestId,
        {
          success: false,
          error: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const fingerprint = getIdempotencyFingerprint(request, "contact", {
      name: name.value,
      email: email.value,
      company: company.value,
      companyWebsite: companyWebsite.value || "",
      inquiryType: inquiryType.value,
      message: message.value,
    });
    const idempotency = await acquireIdempotency("contact", fingerprint, requestId);
    if (!idempotency.available) {
      logOperational("error", "idempotency_store_unavailable", { requestId, route: "contact", result: "failure" });
      return withRequestId(requestId, { success: false, error: "We could not process your message. Please try again later." }, { status: 503 });
    }
    if (!idempotency.acquired) {
      logOperational("info", "idempotency_replay", { requestId, route: "contact", result: idempotency.state });
      return withRequestId(requestId,
        idempotency.state === "completed"
          ? { success: true, message: "This message was already processed." }
          : { success: false, error: "This message is already being processed. Please try again later." },
        { status: idempotency.state === "completed" ? 200 : 202 },
      );
    }
    idempotencyKey = idempotency.key;

    const submittedAt = new Date().toISOString();
    const lead = {
      id: `contact-${fingerprint.digest}`,
      type: "contact" as const,
      source: "website" as const,
      submittedAt,
      fields: {
        name: name.value,
        email: email.value,
        company: company.value,
        companyWebsite: companyWebsite.value || "",
        inquiryType: inquiryType.value,
        message: message.value,
        ...(Object.keys(attribution).length ? { attribution } : {}),
      },
    };

    const durableResult = await saveLead(lead, { requestId });
    if (!durableResult.ok) {
      logOperational("error", "lead_storage_failed", { requestId, route: "contact", reason: durableResult.reason, result: "failure" });
      await releaseIdempotency(idempotencyKey);
      idempotencyKey = undefined;
      return withRequestId(requestId,
        { success: false, error: "We could not save your message. Please try again later." },
        { status: 503 },
      );
    }

    if (!await completeIdempotency(idempotencyKey)) {
      logOperational("error", "idempotency_completion_failed", { requestId, route: "contact", result: "failure" });
      return withRequestId(requestId, { success: false, error: "We could not process your message. Please try again later." }, { status: 503 });
    }
    idempotencyKey = undefined;

    const mirrorStartedAt = Date.now();
    try {
      const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;

      if (!googleSheetsUrl) throw new Error("Google Sheets URL is not configured.");

      const response = await withPersistenceTimeout(fetch(googleSheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.value, email: email.value, company: company.value, companyWebsite: companyWebsite.value || "", inquiryType: inquiryType.value, message: message.value }),
        }));

      if (!response.ok) throw new Error("Failed to save data to Google Sheets.");
    } catch (error) {
      await alertSheetFailure({ name: name.value!, email: email.value, company: company.value, companyWebsite: companyWebsite.value, inquiryType: inquiryType.value!, message: message.value! }, error, requestId);
      logOperational("error", "sheets_mirror_failed", { requestId, route: "contact", operation: "contact-sheets-mirror", errorName: error instanceof Error ? error.name : "unknown-error", result: "failure", durationMs: Date.now() - mirrorStartedAt });
    }

    try {
      const result = await sendResendEmail("contact-internal-notification", {
        to: process.env.LEAD_NOTIFICATION_EMAIL || "info@articog.com",
        subject: "New contact form submission | Articog",
        text: [
          "Lead type: Contact Us",
          `Submission timestamp: ${lead.submittedAt}`,
          "",
          `Name: ${name.value}`,
          `Email: ${email.value}`,
          `Company: ${company.value}`,
          `Company website: ${companyWebsite.value || ""}`,
          `Inquiry type: ${inquiryType.value}`,
          `Attribution: ${JSON.stringify(attribution)}`,
          "",
          "Message:",
          message.value,
        ].join("\n"),
        replyTo: email.value,
      }, { requestId, route: "contact" });
      if (!result.ok) logOperational("error", "resend_notification_failed", { requestId, route: "contact", operation: "contact-internal-notification", result: "failure" });
    } catch (emailError) {
      logOperational("error", "resend_notification_exception", { requestId, route: "contact", operation: "contact-internal-notification", errorName: emailError instanceof Error ? emailError.name : "unknown-error", result: "failure" });
    }

    try {
      const result = await sendResendEmail("contact-confirmation", {
        to: email.value,
        subject: "We received your message | Articog",
        text: [`Hi ${name.value}`, "", "Thanks for reaching out to Articog. We received your message and will follow up within 1 business day.", "", "Best,", "The Articog team"].join("\n"),
        replyTo: email.value,
      }, { requestId, route: "contact" });
      if (!result.ok) logOperational("error", "resend_notification_failed", { requestId, route: "contact", operation: "contact-confirmation", result: "failure" });
    } catch (emailError) {
      logOperational("error", "resend_notification_exception", { requestId, route: "contact", operation: "contact-confirmation", errorName: emailError instanceof Error ? emailError.name : "unknown-error", result: "failure" });
    }

    return withRequestId(requestId, {
      success: true,
      message: "Message submitted successfully.",
    });
  } catch (error) {
    logOperational("error", "api_unexpected_exception", { requestId, route: "contact", errorName: error instanceof Error ? error.name : "unknown-error", result: "failure" });
    if (idempotencyKey) await releaseIdempotency(idempotencyKey);

    return withRequestId(requestId,
      {
        success: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}