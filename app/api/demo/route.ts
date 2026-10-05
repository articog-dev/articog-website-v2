import { isRecord, parseJsonBody, validateBoolean, validateEmail, validateEnum, validateString, validateStringArray, validateUrl } from "../../../lib/api-validation";
import { acquireIdempotency, completeIdempotency, getIdempotencyFingerprint, releaseIdempotency } from "../../../lib/idempotency";
import { checkPublicFormRateLimit } from "../../../lib/rate-limit";
import { getRequestId, withRequestId } from "../../../lib/request-context";
import { logOperational } from "../../../lib/observability";
import { sendResendEmail } from "../../../lib/resend";
import { saveLead, withPersistenceTimeout } from "../../../lib/lead-storage";

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const idempotencyState: { key?: string } = {};
  try {
    return await handleDemoRequest(request, requestId, idempotencyState);
  } catch (error) {
    if (idempotencyState.key) {
      await releaseIdempotency(idempotencyState.key);
    }
    logOperational("error", "api_unexpected_exception", { requestId, route: "demo", errorName: error instanceof Error ? error.name : "unknown-error", result: "failure" });
    return withRequestId(requestId, { success: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

async function handleDemoRequest(request: Request, requestId: string, idempotencyState: { key?: string }) {
  const rateLimit = await checkPublicFormRateLimit(request, "demo");
  if (!rateLimit.available) {
    logOperational("error", "rate_limit_unavailable", { requestId, route: "demo", result: "failure" });
    return withRequestId(requestId,
      { success: false, error: "This service is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
  if (!rateLimit.success) {
    logOperational("warn", "api_request_rejected", { requestId, route: "demo", result: "rate_limited", status: 429 });
    return withRequestId(requestId,
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const body = await parseJsonBody(request);
  if (!body.ok) {
    logOperational("warn", "api_request_rejected", { requestId, route: "demo", result: "validation", status: 400 });
    return withRequestId(requestId, { success: false, error: body.error }, { status: 400 });
  }

  const data = body.value;
  const website = validateString(data.website, { maxLength: 200 });
  if (!website.ok) {
    logOperational("warn", "api_request_rejected", { requestId, route: "demo", result: "validation", status: 400 });
    return withRequestId(requestId, { success: false, error: "Invalid request body." }, { status: 400 });
  }
  if (website.value) {
    return withRequestId(requestId, { success: true, message: "Demo request saved." });
  }

  const firstName = validateString(data.firstName, { required: true, maxLength: 80 });
  const lastName = validateString(data.lastName, { required: true, maxLength: 80 });
  const name = validateString(data.name, { required: true, maxLength: 170 });
  const email = validateEmail(data.email);
  const company = validateString(data.company, { required: true, maxLength: 160 });
  const role = validateString(data.role, { maxLength: 160 });
  const serviceInterest = validateStringArray(data.serviceInterest, {
    allowed: ["Brand Film", "Commercial/Ad", "Social Content", "Product Visuals", "Audio Ad", "Other"] as const,
    maxItems: 6,
    maxItemLength: 40,
  });
  const budget = validateEnum(data.budget, ["Under $5k", "$5k $15k", "$15k $50k", "$50k+"] as const, { maxLength: 32 });
  const timeline = validateEnum(data.timeline, ["Immediately", "Within 1 month", "1-3 months", "Planning for future"] as const, { maxLength: 32 });
  const projectContext = validateString(data.projectContext, { maxLength: 5_000 });
  const referenceUrl = validateUrl(data.referenceUrl, { maxLength: 2_048 });
  const consent = validateBoolean(data.consent, true);
  const attribution = data.attribution === undefined ? {} : data.attribution;
  const attributionValid = isRecord(attribution);
  const attributionValues = attributionValid ? {
    source: validateString(attribution.source, { maxLength: 200 }),
    medium: validateString(attribution.medium, { maxLength: 200 }),
    campaign: validateString(attribution.campaign, { maxLength: 200 }),
    content: validateString(attribution.content, { maxLength: 200 }),
    term: validateString(attribution.term, { maxLength: 200 }),
    referrer: validateUrl(attribution.referrer, { maxLength: 2_048 }),
  } : null;

  if (
    !firstName.ok || !lastName.ok || !name.ok || !email.ok || !company.ok || !role.ok ||
    !serviceInterest.ok || !budget.ok || !timeline.ok || !projectContext.ok || !referenceUrl.ok ||
    !consent.ok || !consent.value || !attributionValid || !attributionValues ||
    !attributionValues.source.ok || !attributionValues.medium.ok || !attributionValues.campaign.ok ||
    !attributionValues.content.ok || !attributionValues.term.ok || !attributionValues.referrer.ok
  ) {
    logOperational("warn", "api_request_rejected", { requestId, route: "demo", result: "validation", status: 400 });
    return withRequestId(requestId,
      { success: false, error: "Please complete the required fields and consent." },
      { status: 400 }
    );
  }

  const fingerprint = getIdempotencyFingerprint(request, "demo", {
    firstName: firstName.value,
    lastName: lastName.value,
    name: name.value,
    email: email.value,
    company: company.value,
    role: role.value || "",
    serviceInterest: serviceInterest.value,
    budget: budget.value || "",
    timeline: timeline.value || "",
    projectContext: projectContext.value || "",
    referenceUrl: referenceUrl.value || "",
    consent: true,
    attribution: {
      source: attributionValues.source.value || "",
      medium: attributionValues.medium.value || "",
      campaign: attributionValues.campaign.value || "",
      content: attributionValues.content.value || "",
      term: attributionValues.term.value || "",
      referrer: attributionValues.referrer.value || "",
    },
  });
  const idempotency = await acquireIdempotency("demo", fingerprint, requestId);
  if (!idempotency.available) {
    logOperational("error", "idempotency_store_unavailable", { requestId, route: "demo", result: "failure" });
    return withRequestId(requestId, { success: false, error: "We could not process your request. Please try again later." }, { status: 503 });
  }
  if (!idempotency.acquired) {
    logOperational("info", "idempotency_replay", { requestId, route: "demo", result: idempotency.state });
    return withRequestId(requestId,
      idempotency.state === "completed"
        ? { success: true, message: "This request was already processed." }
        : { success: false, error: "This request is already being processed. Please try again later." },
      { status: idempotency.state === "completed" ? 200 : 202 },
    );
  }
  const idempotencyKey = idempotency.key;
  idempotencyState.key = idempotencyKey;

  const lead = {
    formType: "demo",
    firstName: firstName.value,
    lastName: lastName.value,
    name: name.value,
    email: email.value,
    company: company.value,
    role: role.value || "",
    serviceInterest: serviceInterest.value,
    budget: budget.value || "",
    timeline: timeline.value || "",
    projectContext: projectContext.value || "",
    referenceUrl: referenceUrl.value || "",
    consent: true,
    attribution: {
      source: attributionValues.source.value || "",
      medium: attributionValues.medium.value || "",
      campaign: attributionValues.campaign.value || "",
      content: attributionValues.content.value || "",
      term: attributionValues.term.value || "",
      referrer: attributionValues.referrer.value || "",
    },
  };

  const submittedAt = new Date().toISOString();
  const durableResult = await saveLead({
    id: `demo-${fingerprint.digest}`,
    type: "demo",
    source: "website",
    submittedAt,
    fields: lead,
  }, { requestId });
  if (!durableResult.ok) {
    logOperational("error", "lead_storage_failed", { requestId, route: "demo", reason: durableResult.reason, result: "failure" });
    await releaseIdempotency(idempotencyKey);
    idempotencyState.key = undefined;
    return withRequestId(requestId,
      { success: false, error: "We could not save your request. Please try again later." },
      { status: 503 },
    );
  }

  if (!await completeIdempotency(idempotencyKey)) {
    logOperational("error", "idempotency_completion_failed", { requestId, route: "demo", result: "failure" });
    return withRequestId(requestId, { success: false, error: "We could not process your request. Please try again later." }, { status: 503 });
  }
  idempotencyState.key = undefined;

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  const mirrorStartedAt = Date.now();
  if (sheetsUrl) try {
    const response = await withPersistenceTimeout(fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }));

    if (!response.ok) {
      throw new Error("Google Sheets mirror returned an unsuccessful response.");
    }
  } catch (error) {
    logOperational("error", "sheets_mirror_failed", { requestId, route: "demo", operation: "demo-sheets-mirror", errorName: error instanceof Error ? error.name : "unknown-error", result: "failure", durationMs: Date.now() - mirrorStartedAt });
  }

  const recipient = process.env.LEAD_NOTIFICATION_EMAIL || "info@articog.com";

  try {
    const result = await sendResendEmail("demo-internal-notification", {
      to: recipient,
      subject: "New demo request | Articog",
      text: [
        "Lead type: Book a Demo",
        `Submission timestamp: ${submittedAt}`,
        "",
        `First name: ${lead.firstName}`,
        `Last name: ${lead.lastName}`,
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company}`,
        `Role: ${lead.role}`,
        `Service interest: ${lead.serviceInterest.join(", ")}`,
        `Budget: ${lead.budget}`,
        `Timeline: ${lead.timeline}`,
        `Project context: ${lead.projectContext}`,
        `Reference / Website URL: ${lead.referenceUrl}`,
        `Consent: ${lead.consent}`,
        `Attribution: ${JSON.stringify(lead.attribution)}`,
        "",
        "Selected date: Not available at lead submission; selected in the following Cal.com step.",
        "Selected time: Not available at lead submission; selected in the following Cal.com step.",
        "Timezone: Determined by Cal.com when the booking is made.",
        "Booking information: The Cal.com scheduling step follows this lead submission; appointment details are managed there.",
      ].join("\n"),
      replyTo: lead.email,
    }, { requestId, route: "demo" });
    if (!result.ok) logOperational("error", "resend_notification_failed", { requestId, route: "demo", operation: "demo-internal-notification", result: "failure" });
  } catch {
    logOperational("error", "resend_notification_exception", { requestId, route: "demo", operation: "demo-internal-notification", result: "failure" });
  }

  return withRequestId(requestId, { success: true, message: "Demo request saved." });
}
