import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/legal/accessibility" },
  title: "Accessibility Statement | Articog",
  description: "Articog's accessibility statement, detailing our commitment to an inclusive digital experience.",
};
import { Container, Heading, PageHero } from "@/components/ui";

export default function AccessibilityPage() {
  const sections = [
    {
      title: "Our Commitment",
      content:
        "Articog is committed to ensuring digital accessibility for all users, including those using assistive technology. We believe that everyone should be able to experience our website, and we are working to make our platform accessible to the widest possible audience.",
    },
    {
      title: "Standards and Guidelines",
      content:
        "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as our standard for accessibility. This is an ongoing effort, and we regularly review our site to identify and address potential barriers.",
    },
    {
      title: "Report an Issue",
      content:
        "If you encounter accessibility barriers or have suggestions on how we can improve the accessibility of our site, please contact us at info@articog.com. We welcome your feedback and will respond promptly to address any issues reported.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl mb-24">
            <div className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero">Accessibility Statement</Heading>
              <p className="mt-[var(--gap-heading-to-text)] type-small" style={{ color: "rgba(255,255,255,0.40)" }}>
                Last updated: August 19, 2026
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <Heading as="h2" size="card" className="text-white mb-4">
                    {section.title}
                  </Heading>
                  <p
                    className="type-body leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </PageHero>
    </div>
  );
}
