import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/services/social-creative" },
  title: "Social Creative Production | Articog",
  description: "Social creative for organic and paid campaigns, designed for brand consistency and fast iteration across platforms.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceDeviceShowcase } from "@/components/sections/ServiceDeviceShowcase";

export default function SocialCreativePage() {
  return (
    <>
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Social Creative" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Monthly social content, produced faster.
            </Heading>
          </div>
          <ServiceDeviceShowcase href="/services/social-creative" />
        </Container>
      </PageHero>

      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Heading as="h2" size="section" className="mb-6 text-white">What We Deliver</Heading>
            </div>
            <div>
              <Heading as="h2" size="section" className="mb-6 text-white">Applications</Heading>
              <ul className="space-y-4">
                {[
                  "Organic social short form video",
                  "Reels & TikTok content series",
                  "Brand campaign social cutdowns",
                  "Always on social content calendars",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <ServiceDetails category="social" />

      <Section className="py-32">
        <Container className="text-center">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </>
  );
}
