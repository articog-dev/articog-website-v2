import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/trust/rights-licensing" },
  title: "Rights, Licensing & Ownership | Articog",
  description: "Commercial usage rights for AI, stock, music, and voice.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Link } from "@/components/ui/Link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Shield, Clock, Music, ArrowRight } from "lucide-react";

export default function RightsLicensingPage() {
  const sections = [
    {
      title: "Usage Rights",
      desc: "Clients receive the rights to use delivered assets across the channels and platforms agreed upon at the initial project scope. We ensure your creative can live where it matters most.",
      note: "Note: Usage parameters are finalized per engagement in your service agreement.",
      icon: Shield,
    },
    {
      title: "Licensing Duration",
      desc: "Whether your campaign needs perpetual usage rights or specific time-bound licensing, we set clear terms per project to align with your media plan and budget.",
      icon: Clock,
    },
    {
      title: "Music & Third-Party Assets",
      desc: "Any licensed music, stock elements, or third-party assets integrated into our production are cleared for the agreed-upon usage, mitigating legal risk for your brand.",
      icon: Music,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Trust", href: "/why-articog#trust" }, { label: "Rights, Licensing & Ownership" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Rights, Licensing & Ownership
            </Heading>
          </div>
        </Container>
      </PageHero>

      {/* Rights Sections */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div 
                key={section.title} 
                className="p-8 rounded-2xl border border-white/10 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="type-h3 text-white mb-4">{section.title}</h3>
                <p className="type-small text-white/50 leading-relaxed mb-6 flex-grow">{section.desc}</p>
                {section.note && (
                  <p className="font-sans text-[10px] text-white/30 italic uppercase tracking-wider">{section.note}</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Linked Info Section */}
      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="type-h2 text-white mb-4">Related Information</h3>
                <p className="font-sans text-white/70 leading-relaxed max-w-xl">
                  Full rights terms are detailed in each client's specific service agreement. For information regarding AI models and creative ownership, please visit our AI & Intellectual Property page.
                </p>
              </div>
              <Link 
                href="/trust/ai-and-ip"
                className="group flex items-center gap-2 text-white font-sans font-medium hover:text-white/80 transition-colors whitespace-nowrap"
              >
                AI & IP Policy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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
