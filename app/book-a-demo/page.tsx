"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Link } from "@/components/ui/Link";
import { Container, Button, PageHero, Input, Textarea, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { BookingTabs } from "@/components/booking/BookingTabs";
import { CAL_TEAMS, calPublicUrl } from "@/lib/cal";
import { trackBookingOpen, trackDemoFormStart, trackDemoFormSubmit, trackFormError, trackFormSubmit, trackFormSuccess } from "@/lib/analytics";

interface BookingPrefill {
  name: string;
  email: string;
  notes: string;
}

export default function BookADemoPage() {
  const [step, setStep] = useState<"form" | "schedule">("form");
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const scheduleHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (step !== "schedule") return;
    const heading = scheduleHeadingRef.current;
    if (!heading) return;

    heading.focus({ preventScroll: true });
    heading.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [step]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    trackFormSubmit("demo");
    trackDemoFormSubmit();

    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const company = (formData.get("company") as string) || "";
    const role = (formData.get("role") as string) || "";
    const serviceInterest = formData.getAll("service-interest").map(String);
    const budget = (formData.get("budget") as string) || "";
    const timeline = (formData.get("timeline") as string) || "";
    const projectContext = (formData.get("projectContext") as string) || "";
    const referenceUrl = (formData.get("referenceUrl") as string) || "";
    const website = (formData.get("website") as string) || "";
    const consent = formData.get("consent") === "on";
    const name = `${firstName} ${lastName}`.trim();

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          name,
          email,
          company,
          role,
          serviceInterest,
          budget,
          timeline,
          projectContext,
          referenceUrl,
          website,
          consent,
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !result.success) {
        const message = result.error || "We could not save your request. Please try again.";
        setErrorMessage(message);
        toast.error(message);
        trackFormError("demo", message);
        return;
      }

      const notes = [
        `Company: ${company}`,
        role && `Role: ${role}`,
        serviceInterest.length > 0 && `Service interest: ${serviceInterest.join(", ")}`,
        budget && `Budget: ${budget}`,
        timeline && `Timeline: ${timeline}`,
        projectContext && `Project context: ${projectContext}`,
      ].filter(Boolean).join("\n");

      setPrefill({ name, email, notes });
      trackBookingOpen();
      setStep("schedule");
      toast.success("Thanks! Pick a time that works for you below.");
      trackFormSuccess("demo");
    } catch {
      const message = "We could not save your request. Please try again.";
      setErrorMessage(message);
      toast.error(message);
      trackFormError("demo", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageHero
      id="book-a-demo"
      contentOnly
      className={`bg-black min-h-screen ${step === "schedule" ? "!pt-6 md:!pt-8" : ""}`}
    >
      <Container>
        <div className={`mx-auto w-full ${step === "form" ? "max-w-3xl" : "max-w-5xl"}`}>
          <div className={`${step === "form" ? "mb-6" : "mb-4"} text-center`}>
            <h1
              ref={scheduleHeadingRef}
              id="booking-page-heading"
              tabIndex={step === "schedule" ? -1 : undefined}
              className={step === "form"
                ? "type-h1 text-white"
                : "scroll-mt-[calc(var(--header-offset)+1rem)] text-3xl font-semibold leading-tight text-white md:text-4xl"}
            >
              {step === "form" ? "Tell us what your brand needs every month." : "Pick a time that works for you"}
            </h1>
            {step === "schedule" ? (
              <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
                Choose the team closest to your time zone. Times are shown in your local time.
              </p>
            ) : null}
          </div>

          <section hidden={step !== "form"} aria-labelledby="booking-page-heading">
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onFocus={() => {
                if (!hasTrackedFormStart) {
                  setHasTrackedFormStart(true);
                  trackDemoFormStart();
                }
              }}
              className="flex flex-col gap-5 md:gap-8 [--color-field-text:rgba(255,255,255,0.78)] [--color-field-placeholder:rgba(255,255,255,0.5)]"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              />
              {/* First Name + Last Name */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="firstName"
                    className="type-nav text-white/70"
                  >
                    First Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Jane"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="given-name"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="lastName"
                    className="type-nav text-white/70"
                  >
                    Last Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="family-name"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="projectContext" className="type-nav text-white/70">
                  Tell us what your brand needs every month.
                </label>
                <Textarea
                  id="projectContext"
                  name="projectContext"
                  placeholder="Deliverables, campaign objective, references, target platforms or anything we should know."
                  className="min-h-32 resize-y rounded-lg p-4 text-base"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="referenceUrl" className="type-nav text-white/70">
                  Reference / Website URL <span className="text-white/40">(optional)</span>
                </label>
                <Input
                  type="url"
                  id="referenceUrl"
                  name="referenceUrl"
                  placeholder="https://"
                  autoComplete="url"
                  className="h-14 rounded-lg px-4 text-base"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              {/* Work Email + Company Name */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="type-nav text-white/70"
                  >
                    Work Email <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="email"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="company"
                    className="type-nav text-white/70"
                  >
                    Company Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="company"
                    name="company"
                    required
                    placeholder="Acme Corp"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="organization"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                </div>
              </div>

              {/* Your Role */}
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="role"
                  className="type-nav text-white/70"
                >
                  Your Role
                </label>

                <Input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Creative Director"
                  className="h-14 rounded-lg px-4 text-base sm:h-12"
                  autoComplete="organization-title"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              {/* Service Interest */}
              <fieldset className="flex flex-col gap-4">
                <legend className="type-nav text-white/70">
                  Service Interest
                </legend>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    "Brand Film",
                    "Commercial/Ad",
                    "Social Content",
                    "Product Visuals",
                    "Audio Ad",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <div className="relative flex items-center justify-center">
                        <Checkbox
                          name="service-interest"
                          value={option}
                          className="h-5 w-5 rounded border-white/10 bg-white/5"
                        />
                      </div>

                      <span className="type-small text-white/60 transition-colors group-hover:text-white">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Budget + Timeline */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="budget"
                    className="type-nav text-white/70"
                  >
                    Budget Range
                  </label>

                  <Select name="budget" defaultValue="">
                    <SelectTrigger id="budget" className="h-14 rounded-lg px-4 text-base sm:h-12"><SelectValue placeholder="Select budget" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under $5k">Under $5k</SelectItem>
                      <SelectItem value="$5k $15k">$5k $15k</SelectItem>
                      <SelectItem value="$15k $50k">$15k $50k</SelectItem>
                      <SelectItem value="$50k+">$50k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="timeline"
                    className="type-nav text-white/70"
                  >
                    Timeline
                  </label>

                  <Select name="timeline" defaultValue="">
                    <SelectTrigger id="timeline" className="h-14 rounded-lg px-4 text-base sm:h-12"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediately">Immediately</SelectItem>
                      <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="Planning for future">Planning for future</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="mt-4 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Scheduling..." : "Continue to Scheduling"}

                {!isLoading && <ArrowRight size={16} />}
              </Button>

              {errorMessage ? (
                <p role="alert" className="text-center text-sm text-red-300">
                  {errorMessage}
                </p>
              ) : null}

              {/* Privacy Note */}
              <div
                className="text-center font-sans text-[12px] leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <label className="mb-2 flex items-start justify-center gap-2 text-left">
                  <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-white" />
                  <span>By submitting, you agree to be contacted about your inquiry.</span>
                </label>
                See our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-white/50 underline underline-offset-2 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </div>
            </form>
            </div>
          </section>

          {step === "schedule" && prefill ? (
            <section aria-labelledby="booking-page-heading" className="scroll-mt-4">
              <BookingTabs prefill={prefill} />
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 type-small text-white/55">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="text-white underline underline-offset-4 transition-colors hover:text-white/75"
                >
                  Edit my details
                </button>
                <span aria-hidden="true">·</span>
                <span>Having trouble?</span>
                <a
                  href={calPublicUrl(CAL_TEAMS[0].calLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 transition-colors hover:text-white/75"
                >
                  Open the booking page directly
                </a>
              </div>
            </section>
          ) : null}
        </div>
      </Container>
    </PageHero>
  );
}