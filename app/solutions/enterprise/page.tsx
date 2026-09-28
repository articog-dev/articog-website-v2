import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/solutions/enterprise" },
  title: "Enterprise AI Production | Articog",
  description: "Creative production built for large organizations with procurement, security, and governance requirements.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { ShieldCheck, FileText, Users, Eye, ClipboardList, Info } from "lucide-react";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function EnterpriseSolutionPage() {
  const whatIsIncluded = [
    {
      title: "Security & NDA",
      desc: "Confidentiality terms and data-handling requirements can be reviewed during vendor scoping.",
      icon: ShieldCheck,
    },
    {
      title: "IP & Ownership",
      desc: "Contract-defined rights and ownership terms can be reviewed for each engagement.",
      icon: FileText,
    },
    {
      title: "Dedicated Account Model",
      desc: "A consistent account team who understands your organization and brand nuances.",
      icon: Users,
    },
    {
      title: "Governance",
      desc: "Brand and compliance review can be included in the production workflow where required.",
      icon: Eye,
    },
    {
      title: "Onboarding",
      desc: "A defined process for bringing your brand assets, stakeholders, and approval chain into our system.",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "Enterprise AI Production" }]} />}
        title="AI-native production for high-volume brand teams."
      />

      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="mb-[var(--gap-header-to-content)]">
            <Heading as="h2" size="section" className="text-center text-white">What's Included</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatIsIncluded.map((item) => (
              <div 
                key={item.title} 
                className="flex flex-col gap-6 rounded-2xl border border-white/10 p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="type-h3 text-white mb-2">{item.title}</h3>
                  <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl border border-white/10 flex items-start gap-4 max-w-2xl mx-auto text-center justify-center">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Vendor review can be discussed during scoping; available documentation depends on the engagement and current materials.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container>
          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
