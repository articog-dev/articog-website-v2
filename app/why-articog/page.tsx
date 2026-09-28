import type { Metadata } from "next";
import { ArrowRight, BarChart3, Clock, Database, FileText, Info, Lock, ShieldCheck, Zap } from "lucide-react";
import { Container, Section, Heading, PageHero, SectionHeader } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Comparison } from "@/components/sections/Comparison";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Pipeline } from "@/components/sections/Pipeline";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ScrollReveal } from "@/components/animations";
import { SectionNav } from "@/components/why-articog/SectionNav";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/why-articog" },
  title: "Why Articog | AI Native Film & Production Company",
  description: "See how Articog combines AI-native production, creative direction, and flexible delivery for growth-stage brands.",
};

export default function WhyArticogPage() {
  const comparisonRows = [
    { attribute: "Production approach", agency: "Traditional production", inhouse: "Internal workflow", articog: "AI-native production" },
    { attribute: "Engagement", agency: "Multi-stage production", inhouse: "Internal production", articog: "Project, ongoing or strategic" },
    { attribute: "Production capacity", agency: "Capacity tied to team and vendors", inhouse: "Capacity tied to headcount", articog: "Scales with campaign demand" },
    { attribute: "Brand consistency", agency: "Brief dependent", inhouse: "Manual controls", articog: "Structured brand controls" },
    { attribute: "Iteration", agency: "Slow feedback cycles", inhouse: "Moderate feedback cycles", articog: "Fast feedback and revision cycles" },
    { attribute: "Team", agency: "External production team", inhouse: "Internal creative team", articog: "Creative direction + AI production + post-production" },
  ];

  const economics = [
    { title: "Traditional Cost Structure", icon: BarChart3, description: "Labor and overhead scale with every project." },
    { title: "Volume Economics", icon: Zap, description: "Cost per deliverable flexes with volume." },
    { title: "Time-to-Market Value", icon: Clock, description: "Speed reduces the cost of delay." },
  ];

  const pipelineSteps = [
    { step: 1, title: "Brief", description: "Share your goal and references. We align on-brand voice, visual direction, and performance objectives before production.", tag: "Day 1" },
    { step: 2, title: "Generate", description: "Our AI pipeline calibrated to the brand explores creative directions and delivers first outputs within hours.", tag: "Day 1 to 2" },
    { step: 3, title: "Refine", description: "Review a curated selection. Creative directors refine each asset through fast feedback cycles.", tag: "Day 2 to 3" },
    { step: 4, title: "Deliver", description: "Receive assets ready for production in the formats, aspect ratios, and language variants your campaign needs.", tag: "Day 3 to 4" },
  ];

  const deliveryGroups = [
    [
      ["Brand Assets", "Collecting your logo, guidelines, and existing creative for reference to ensure brand consistency."],
      ["Stakeholders", "Identifying who's involved in review and approval to streamline the feedback loop."],
      ["Rights & Permissions", "Confirming usage rights and any necessary consents upfront to protect your brand."],
      ["Approval SLAs", "Agreeing on how fast reviews and feedback will happen to maintain production momentum."],
      ["First Project Roadmap", "A clear, milestone-driven timeline for your first deliverable and campaign launch."],
    ],
    [
      ["Feedback Windows", "A defined period for review and feedback on each round to maintain production velocity."],
      ["Version Control", "Every revision clearly labeled and tracked so nothing gets lost and the latest version is always accessible."],
      ["Revision Policy", "A clear number of included revision rounds per project, with any additional disputes handled case by case."],
      ["Final Formats", "Assets delivered in every aspect ratio, file format, and technical spec your campaign requires."],
      ["Archive", "Delivered projects kept securely accessible for future reference and repurposing."],
    ],
  ];

  const trustLinks = [
    { title: "AI & Intellectual Property", href: "/trust/ai-and-ip", icon: ShieldCheck },
    { title: "Security & Confidentiality", href: "/trust/security", icon: Lock },
    { title: "Rights, Licensing & Ownership", href: "/trust/rights-licensing", icon: FileText },
    { title: "Data Handling & Retention", href: "/trust/data-handling", icon: Database },
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHero
        id="overview"
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Why Articog" }]} />}
        title={<><span className="block">More output.</span><span className="block">Less production cost.</span><span className="block">Faster production.</span></>}
        subtitle="Articog uses AI-native production to reduce traditional shoots, production time and budget, helping brands create more content around every product without losing the story or brand direction."
        titleClassName="!text-[clamp(2.5rem,6vw,4.5rem)] text-balance"
      />

      <SectionNav />
      <Comparison rows={comparisonRows} size="md" />

      <Section className="border-t border-white/[0.08]">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {[
              ["/compare/vs-traditional-production", "Articog vs Traditional Production", "AI-native workflows vs. traditional production."],
              ["/compare/vs-ai-tools", "Articog vs AI Tools Only", "Why tools alone aren't enough."],
            ].map(([href, title, description]) => (
              <ScrollReveal key={href}>
                <Link href={href} className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Heading as="h2" size="card" className="text-white">{title}</Heading>
                    <ArrowRight size={20} className="shrink-0 text-white/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <p className="mt-3 type-small leading-relaxed text-white/65">{description}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="production-economics" className="scroll-mt-[calc(var(--header-offset)+var(--subnav-height)+1.5rem)] border-t border-white/[0.08] bg-white/[0.02]">
        <Container>
          <SectionHeader eyebrow="Production Economics" title="Production Cost &amp; ROI Guide" lead="Understanding the potential cost and time considerations of AI-native production. Any engagement model depends on scope, cadence, and deliverables." />
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {economics.map((item) => (
              <ScrollReveal key={item.title}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.04] md:p-8">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80"><item.icon size={20} /></div>
                  <Heading as="h3" size="card" className="text-white">{item.title}</Heading>
                  <p className="mt-3 type-small leading-relaxed text-white/65">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mx-auto mt-[var(--spacing-section-sm)] flex max-w-4xl items-start gap-4 rounded-xl border border-white/[0.08] p-4 md:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80"><Info size={20} /></div>
            <div><h3 className="font-display text-lg font-semibold text-white/80">A Note on Performance</h3><p className="mt-1 type-small text-white/55">Results vary by project scope and complexity.</p></div>
          </div>
        </Container>
      </Section>

      <div id="how-it-works" className="scroll-mt-[calc(var(--header-offset)+var(--subnav-height)+1.5rem)] border-t border-white/[0.08]">
        <Pipeline steps={pipelineSteps} />
        <Section>
          <Container>
            <SectionHeader title="Getting started and delivery" />
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
              {deliveryGroups.flat().map(([title, description]) => (
                <ScrollReveal key={title}>
                  <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
                    <h3 className="type-h4 text-white">{title}</h3>
                    <p className="mt-2 type-small leading-relaxed text-white/65">{description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <div className="mx-auto mt-[var(--spacing-section-sm)] flex max-w-6xl flex-col items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center md:flex-row md:items-start md:text-left">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80"><ShieldCheck size={20} /></div>
                <div><h3 className="type-h3 text-white">Human oversight, every step</h3><p className="mt-2 type-body leading-relaxed text-white/70">A Creative Director reviews every project for brand safety, legal compliance, and quality.</p></div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/how-it-works/ai-creative-pipeline" className="group mx-auto mt-[var(--spacing-section-sm)] flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:p-8">
                <div><h3 className="type-h3 text-white">AI Creative Pipeline</h3><p className="mt-2 type-small text-white/55">Take a deeper technical look at our internal creative engine.</p></div>
                <ArrowRight size={20} className="shrink-0 text-white/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            </ScrollReveal>
          </Container>
        </Section>
      </div>

      <Section id="trust" className="scroll-mt-[calc(var(--header-offset)+var(--subnav-height)+1.5rem)] border-t border-white/[0.08] bg-white/[0.02]">
        <Container>
          <SectionHeader eyebrow="Trust &amp; Security" title="Built on trust and transparency" />
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {trustLinks.map((item) => (
              <ScrollReveal key={item.href}>
                <Link href={item.href} className="group flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:p-8">
                  <div className="flex items-center gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80"><item.icon size={20} /></div><Heading as="h3" size="card" className="text-white">{item.title}</Heading></div>
                  <ArrowRight size={20} className="shrink-0 text-white/55 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-[var(--spacing-section-sm)] flex items-center justify-center gap-3 text-center">
            <Link href="/trust/ai-and-ip" className="type-small text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Responsible AI</Link><span className="text-white/55" aria-hidden="true">·</span><Link href="/contact" className="type-small text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Vendor &amp; Tool Review</Link>
          </div>
        </Container>
      </Section>

      <div id="why-articog-final-cta" className="border-t border-white/[0.08]"><FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} /></div>
    </div>
  );
}
