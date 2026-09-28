import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/services/product-visuals" },
  title: "Product Visual Content | Articog",
  description: "Product visual content for e-commerce, launch campaigns, and performance marketing created with speed and brand precision.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function ProductVisualsPage() {
  return (
    <>
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Product Visual Content" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Every product, without a new shoot every time.
            </Heading>
          </div>
        </Container>
      </PageHero>

      <Section size="md" className="border-t border-white/5 pt-0">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Heading as="h2" size="section" className="mb-6 text-white">What We Deliver</Heading>
              <p className="text-white/60 leading-relaxed">
                Elevate your product presence without studio logistics. We combine precise rendering with AI environments for scalable visual content.
              </p>
            </div>
            <div>
              <Heading as="h2" size="section" className="mb-6 text-white">Applications</Heading>
              <ul className="space-y-4">
                {[
                  "E-commerce product imagery",
                  "Campaign hero assets",
                  "Product launch visual systems",
                  "Advertising creative assets",
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

      <ServiceDetails category="product-visuals" />

      <Section className="py-32">
        <Container className="text-center">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </>
  );
}
