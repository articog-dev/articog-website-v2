import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/trust/security" },
  title: "Security & Confidentiality | Articog",
  description: "NDA, access control, and data handling practices at Articog.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Lock, ShieldCheck, Key } from "lucide-react";

export default function SecurityPage() {
  const sections = [
    {
      title: "Data Handling",
      desc: "Client materials, briefs, and source assets are used for the purposes of the agreed work and are limited to the project team involved in delivery. We do not use client work product for unrelated commercial purposes without a clear agreement.",
      icon: Lock,
    },
    {
      title: "Confidentiality",
      desc: "We understand the sensitivity of pre-launch work and confidential brand information. Standard confidentiality terms and NDAs can be discussed and incorporated as part of the project scope.",
      icon: ShieldCheck,
    },
    {
      title: "Access Controls",
      desc: "Project access is restricted to the team members and collaborators assigned to the work, with permissions managed to fit the needs of each engagement.",
      icon: Key,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Trust", href: "/why-articog#trust" }, { label: "Security & Data Protection" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Security & Confidentiality
            </Heading>
          </div>
        </Container>
      </PageHero>

      {/* Standards Section */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div 
                key={section.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="type-h3 text-white mb-4">{section.title}</h3>
                <p className="type-small text-white/50 leading-relaxed">{section.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Onboarding Note Section */}
      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 max-w-4xl text-center mx-auto">
            <p className="font-sans text-white/70 leading-relaxed">
              Every brand has unique requirements. Specific security protocols, data retention terms, and compliance needs can be discussed and formalized as part of your onboarding process.
            </p>
          </div>
        </Container>
      </Section>

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
