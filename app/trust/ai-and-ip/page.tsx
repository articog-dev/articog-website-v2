import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/trust/ai-and-ip" },
  title: "AI & Intellectual Property | Articog",
  description: "How Articog handles AI tool use, ownership, and client intellectual property.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ShieldCheck, Scale, FileText, UserCheck, Eye, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function AIIPPage() {
  const policies = [
    {
      title: "Ownership of Delivered Assets",
      desc: "The final delivered creative is generally owned by the client for the purposes set out in the relevant project agreement. Final rights, licensing, and ownership terms are governed by the signed engagement terms between the parties.",
      note: "Final terms are defined in the applicable service agreement.",
      icon: ShieldCheck,
    },
    {
      title: "Our Use of AI Tools",
      desc: "We use AI tools to accelerate ideation, production, and iteration while keeping human review and creative direction at the center of the work. We do not treat AI as a substitute for client strategy or brand judgment.",
      icon: Scale,
    },
    {
      title: "Third-Party Rights",
      desc: "Our review process is designed to reduce intellectual-property risk and identify potential third-party rights concerns before delivery.",
      icon: FileText,
    },
  ];

  const responsibleAIPrinciples = [
    {
      title: "Consent for Likeness & Voice",
      description: "We strictly adhere to ethical standards regarding synthetic media. Any use of a real person's likeness or voice in our production pipeline requires explicit, documented authorization and proper licensing.",
      icon: UserCheck,
    },
    {
      title: "No Deceptive Impersonation",
      description: "We do not produce content designed to deceive audiences. Our AI generated assets are intended for creative expression and brand storytelling, not for misleading impersonation without proper disclosure where appropriate.",
      icon: ShieldCheck,
    },
    {
      title: "Human Review",
      description: "AI is an accelerator, not an autopilot. Every asset produced by Articog undergoes a thorough manual review by our creative team to ensure brand integrity, quality standards, and ethical compliance before final delivery.",
      icon: Eye,
    },
    {
      title: "Escalation & Governance",
      description: "We maintain clear internal governance for AI production. A defined escalation process exists for flagging and resolving any content concerns, ensuring that all work meets our high bars for responsibility and quality.",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Trust", href: "/why-articog#trust" }, { label: "AI & Intellectual Property" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              AI & Intellectual Property
            </Heading>
          </div>
        </Container>
      </PageHero>

      {/* Policies Section */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((policy) => (
              <div 
                key={policy.title} 
                className="p-8 rounded-2xl border border-white/10 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <policy.icon className="w-5 h-5" />
                </div>
                <h3 className="type-h3 text-white mb-4">{policy.title}</h3>
                <p className="type-small text-white/50 leading-relaxed mb-6 flex-grow">{policy.desc}</p>
                {policy.note && (
                  <p className="font-sans text-[10px] text-white/30 italic uppercase tracking-wider">{policy.note}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing Note Section */}
      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 max-w-4xl text-center mx-auto">
            <p className="font-sans text-white/70 leading-relaxed">
              While these policies represent our standard approach, specific Intellectual Property terms and legal protections are clearly set out in each client's individual service agreement.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-white/[0.02]">
        <Container>
          <div className="mb-12 max-w-3xl">
            <h2 className="type-h2 mb-4 text-white">Responsible AI Principles</h2>
            <p className="font-sans text-white/50 leading-relaxed">
              The principles and ethical guardrails that guide how we use AI to build the future of creative production.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {responsibleAIPrinciples.map((principle) => (
              <div key={principle.title} className="rounded-2xl p-8 border border-white/[0.08]">
                <div className="mb-6 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                  <principle.icon className="w-6 h-6 text-white/40" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-4">{principle.title}</h3>
                <p className="type-small leading-relaxed text-white/50">{principle.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center pt-16 mt-16 border-t border-white/10">
            <h2 className="type-h2 mb-6 text-white">Commitment to Transparency</h2>
            <p className="mx-auto max-w-xl type-body text-white/60">
              Our approach to AI is built on the foundation of trust. We work closely with brand legal and creative teams to ensure every project aligns with both industry standards and company-specific values.
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
