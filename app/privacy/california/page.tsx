import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/privacy/california" },
  title: "California Privacy Notice | Articog",
  description: "Supplemental privacy notice for California residents under CCPA/CPRA.",
};
import { Container, Heading, PageHero } from "@/components/ui";

const LAST_UPDATED = "September 15, 2026";

export default function CaliforniaPrivacyPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero">California Privacy Notice</Heading>
              <p className="mt-[var(--gap-heading-to-text)] type-label uppercase tracking-widest text-white/30">
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">Applicability</Heading>
                <div className="type-small leading-relaxed text-white/60">
                  <p>
                    This California Privacy Notice ("Notice") applies as required under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). 
                  </p>
                </div>
              </section>

              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">Categories of Personal Information Collected</Heading>
                <div className="type-small leading-relaxed text-white/60 space-y-4">
                  <p>In the past 12 months, we may have collected the following categories of personal information:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Identifiers:</strong> Such as contact information (name, email address).</li>
                    <li><strong>Usage Data:</strong> Information about your interaction with our website and services.</li>
                  </ul>
                </div>
              </section>

              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">Purposes of Collection</Heading>
                <div className="type-small leading-relaxed text-white/60 space-y-4">
                  <p>We collect this personal information for the following business purposes:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Responding to your inquiries and providing customer support.</li>
                    <li>Analyzing website performance and improving our services.</li>
                    <li>Marketing our services to you, where permitted by law.</li>
                  </ul>
                </div>
              </section>

              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">Your California Rights</Heading>
                <div className="type-small leading-relaxed text-white/60 space-y-4">
                  <p>As a California resident, you have the following rights:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Right to Know:</strong> Right to request details about the personal information we collect and share.</li>
                    <li><strong>Right to Delete:</strong> Right to request deletion of your personal information.</li>
                    <li><strong>Right to Correct:</strong> Right to correct inaccurate personal information.</li>
                    <li><strong>Right to Opt-Out:</strong> Right to opt-out of the "sale" or "sharing" of personal information.</li>
                    <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising any of these rights.</li>
                  </ul>
                </div>
              </section>

              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">How to Exercise Your Rights</Heading>
                <div className="type-small leading-relaxed text-white/60">
                  <p>
                    To exercise your rights, please visit our <a href="/privacy-choices" className="text-white underline underline-offset-4 hover:text-white/80 transition-colors">Privacy Choices</a> page or submit a request via our specialized intake form.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </PageHero>
    </div>
  );
}
