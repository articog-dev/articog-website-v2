"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Link } from "@/components/ui/Link";
import { Container, Button, Heading, PageHero, Input, Textarea, Alert, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { trackContactSubmit, trackFormError, trackFormSubmit, trackFormSuccess } from "@/lib/analytics";
import { buildContactPayload } from "@/lib/contact-payload";
import {
  ArrowRight,
  Mail,
} from "lucide-react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = buildContactPayload(formData);

    trackFormSubmit("contact");
    trackContactSubmit();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Something went wrong. Please try again."
        );
      }

      toast.success("Thanks — your message was sent successfully.");
      trackFormSuccess("contact");
      router.push("/thank-you");
    } catch (err) {
      console.error("Contact form error:", err);
      trackFormError("contact", "request_failed");

      const message = err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageHero contentOnly className="bg-black min-h-screen">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Build your next brand story with Articog.
            </Heading>
          </div>

          {/* Contact Form */}
          <div
            className="rounded-2xl p-8 md:p-12 mb-16"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
            >
              {/* Name + Email */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="name"
                    className="type-nav text-white/70"
                  >
                    Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="h-12 rounded-lg px-4"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="type-nav text-white/70"
                  >
                    Email <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="h-12 rounded-lg px-4"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      backgroundColor: "rgba(255,255,255,0.04)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="company" className="type-nav text-white/70">
                  Company <span className="text-accent">*</span>
                </label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder="Acme Corp"
                  className="h-14 rounded-lg px-4 text-base"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="companyWebsite" className="type-nav text-white/70">
                  Company Website <span className="text-white/40">(optional)</span>
                </label>
                <Input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  autoComplete="url"
                  placeholder="https://"
                  className="h-14 rounded-lg px-4 text-base"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                />
              </div>

              {/* Inquiry Type */}
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="inquiryType"
                  className="type-nav text-white/70"
                >
                  Inquiry Type <span className="text-accent">*</span>
                </label>

                <Select name="inquiryType" defaultValue="" required>
                  <SelectTrigger id="inquiryType" className="h-12 rounded-lg px-4"><SelectValue placeholder="Select an option" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Partnerships">Partnerships</SelectItem>
                    <SelectItem value="Press">Press</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="message"
                  className="type-nav text-white/70"
                >
                  Message <span className="text-accent">*</span>
                </label>

                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your project, goals, timeline and deliverables."
                  className="min-h-[160px] resize-none rounded-lg p-4 text-base"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive" className="rounded-lg px-4 py-3 text-sm">
                  {error}
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}

                {!isLoading && <ArrowRight size={16} />}
              </Button>

              {/* Privacy Note */}
              <p
                className="text-center font-sans text-[12px] leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                By submitting, you agree to be contacted about your inquiry.
                See our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-white/50 underline underline-offset-2 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
            {/* Direct Contact */}
            <div>
              <Heading as="h3" size="card" className="font-display font-semibold text-white mb-4">
                Direct Contact
              </Heading>

              <a
                href="mailto:info@articog.com"
                className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors mb-4 group"
              >
                <Mail
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />

                <span className="type-small">
                  info@articog.com
                </span>
              </a>

              <p className="font-sans text-xs text-muted-safe">
                We typically respond within 1 business day.
              </p>
            </div>

          </div>
        </div>
      </Container>
    </PageHero>
  );
}