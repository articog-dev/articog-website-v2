import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/legal/terms-of-service" },
  title: "Terms of Service | Articog",
  description: "The terms and conditions governing your use of Articog's website and services.",
};
import { Container, Heading, PageHero } from "@/components/ui";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using the Articog Tech LLP website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.",
    },
    {
      title: "Description of Services",
      content:
        'Articog refers to Articog Tech LLP ("Articog", "we", "us", or "our"). This website describes Articog\'s AI-powered creative production services, including video production, ad creative, social content, product visuals, and related creative strategy. Specific client engagements are governed by separate service agreements executed between Articog and the client.',
    },
    {
      title: "Intellectual Property",
      content:
        "All site content, branding, materials, and design elements are owned by Articog or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our materials without prior written permission.",
    },
    {
      title: "Use of the Site",
      content:
        "You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the site. Prohibited conduct includes scraping, data mining, automated access, interference with site operations, and any misuse of our services or infrastructure.",
    },
    {
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, Articog and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms of Service shall be governed by and construed in accordance with the laws of India. Courts in Hyderabad, Telangana shall have exclusive jurisdiction over any disputes arising from these Terms, without regard to conflict of law principles.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms of Service, please contact us at info@articog.com.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl mb-24">
            <div className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero">Terms of Service</Heading>
              <p className="mt-[var(--gap-heading-to-text)] type-small text-white/40">
                Last updated: August 19, 2026
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <Heading as="h2" size="card" className="text-white mb-4">
                    {section.title}
                  </Heading>
                  <p className="type-body leading-relaxed text-white/60">
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
