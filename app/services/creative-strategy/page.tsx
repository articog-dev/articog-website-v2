import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/services/creative-strategy" },
  title: "Creative Strategy & Concepting | Articog",
  description: "Creative strategy and concepting for growth-stage brands that need sharper positioning, stronger ideas, and campaign clarity.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { Lightbulb, Palette, LayoutGrid, MessageSquare } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function CreativeStrategyPage() {
  const capabilities = [
    {
      title: "Concept Development",
      desc: "Clear creative direction from your brief.",
      icon: Lightbulb,
    },
    {
      title: "Brand Direction",
      desc: "Consistent voice, tone, and visual identity.",
      icon: Palette,
    },
    {
      title: "Campaign Architecture",
      desc: "Cohesive creative across every channel.",
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Creative Strategy & Concepting" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Start with the product. Build the story.
            </Heading>
          </div>
        </Container>
      </PageHero>

      {/* What We Do Section */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-white">What We Do</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <Heading as="h3" size="subsection" className="text-white">{item.title}</Heading>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 mb-8 mx-auto">
              <MessageSquare className="w-4 h-4 text-white/40" />
              <span className="type-label">Strategic Engagement</span>
            </div>
            <p className="type-h2 text-white/70 leading-relaxed italic">
              "Creative strategy and concepting can be scoped as part of an engagement when the brief requires it, from a flagship film to an ongoing content program."
            </p>
          </div>
        </Container>
      </Section>

      <ServiceDetails category="strategy" />

      {/* CTA Section */}
      <Section size="lg" className="bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
              <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
