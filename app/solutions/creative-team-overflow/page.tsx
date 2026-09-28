import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/solutions/creative-team-overflow" },
  title: "Creative Team Extension | Articog",
  description: "Extend your internal team without full-time hires.",
};
import { Container, Section, Heading, Button, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Zap, Puzzle, TrendingUp } from "lucide-react";
import { SolutionDetails } from "@/components/sections/SolutionDetails";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function CreativeOverflowPage() {
  const features = [
    {
      title: "On-Demand Capacity",
      desc: "Spin up extra production support exactly when you need it, perfect for seasonal peaks or large campaign launches.",
      icon: Zap,
    },
    {
      title: "Seamless Brand Fit",
      desc: "We work directly from your existing brand guidelines and assets. No long ramp-up time or creative misalignment.",
      icon: Puzzle,
    },
    {
      title: "Flexible Engagement",
      desc: "Scale support up or down project by project. Get the help you need without being locked into a long-term retainer.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "In-House Creative Overflow" }]} />}
        title="More production capacity without more production overhead."
      />

      {/* How It Works Section */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="mb-[var(--gap-header-to-content)]">
            <Heading as="h2" size="section" className="text-white">How It Works</Heading>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((item) => (
              <div 
                key={item.title} 
                className="rounded-2xl border border-white/10 p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <Heading as="h3" size="subsection" className="mb-2 text-white">{item.title}</Heading>
                <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <SolutionDetails category="overflow" />

      {/* Comparison Note Section */}
      <Section size="md" className="border-t border-white/5">
        <Container>
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 max-w-4xl border-l-4 border-l-white/20">
            <Heading as="h3" size="section" className="mb-4 text-white">A Note on Engagement</Heading>
            <p className="font-sans text-white/70 leading-relaxed max-w-2xl">
              Unlike our <Link href="/solutions/monthly-creative-subscription" className="text-white hover:text-white/80 underline underline-offset-4">Monthly Creative Subscription</Link>, this solution is specifically for teams that already have creative resources in-house and need targeted overflow support, rather than a fully outsourced creative engine.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section size="lg" className="bg-white/[0.02]">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Heading as="h2" size="section" className="mb-8 text-white">Need additional creative capacity?</Heading>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14">
                Get Overflow Support
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
