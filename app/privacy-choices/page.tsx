"use client";

import { useEffect, useState } from "react";
import { Container, Heading, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { hasGlobalPrivacyControl, readCookieConsent, saveCookieConsent } from "@/lib/cookie-consent";

export default function PrivacyChoicesPage() {
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hasGlobalPrivacyControl()) {
        const consent = saveCookieConsent(false);
        setAnalyticsConsent(consent.analytics);
        setShowBanner(false);
        return;
      }

      const consent = readCookieConsent();
      setAnalyticsConsent(consent?.analytics ?? null);
      setShowBanner(consent === null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const updateAnalyticsConsent = (analytics: boolean) => {
    const consent = saveCookieConsent(analytics);
    setAnalyticsConsent(consent.analytics);
    setShowBanner(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero">Your Privacy Choices</Heading>
            </div>

            <div className="space-y-12 type-small leading-relaxed text-white/60">
              {showBanner ? (
                <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 text-white/70">
                  <Heading as="h2" size="card" className="mb-3 text-white">Analytics preferences</Heading>
                  <p>Choose whether Articog may use analytics to understand site usage.</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={() => updateAnalyticsConsent(true)} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
                      Allow analytics
                    </button>
                    <button type="button" onClick={() => updateAnalyticsConsent(false)} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
                      Decline analytics
                    </button>
                  </div>
                </section>
              ) : null}

              <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
                <Heading as="h2" size="card" className="mb-3 text-white">Current analytics setting</Heading>
                <p>{analyticsConsent === true ? "Analytics is enabled." : analyticsConsent === false ? "Analytics is disabled." : "No analytics preference has been selected."}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => updateAnalyticsConsent(true)} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
                    Allow analytics
                  </button>
                  <button type="button" onClick={() => updateAnalyticsConsent(false)} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
                    Decline analytics
                  </button>
                </div>
              </section>

              <section>
                <Heading as="h2" size="card" className="mb-4 text-white">
                  Your Rights
                </Heading>
                <p>
                  Depending on applicable law, you may have the right to know
                  about personal information we process, request correction or
                  deletion, withdraw consent, opt out of certain processing,
                  and request grievance redressal.
                </p>
              </section>

              <section>
                <Heading as="h2" size="card" className="mb-4 text-white">
                  Global Privacy Control
                </Heading>
                <p>
                  We honor Global Privacy Control signals where legally
                  required. Your browser or device must be configured to send
                  the signal for it to be detected.
                </p>
              </section>

              <section>
                <Heading as="h2" size="card" className="mb-4 text-white">
                  How to Submit a Request
                </Heading>
                <p>
                  To exercise a privacy right, submit a request through our{" "}
                  <Link
                    href="/privacy/request"
                    className="text-white underline underline-offset-4 hover:text-white/80"
                  >
                    Data Rights Request
                  </Link>{" "}
                  page. You can also email us at{" "}
                  <a
                    href="mailto:info@articog.com"
                    className="text-white underline underline-offset-4 hover:text-white/80"
                  >
                    info@articog.com
                  </a>
                  . We may need to verify your identity before processing a
                  request.
                </p>
              </section>

              <div className="border-t border-white/10 pt-12">
                <p className="text-xs text-white/40">
                  For more detailed information about our privacy practices,
                  please read our full{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-white hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </PageHero>
    </div>
  );
}
