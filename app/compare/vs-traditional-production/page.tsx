import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articog vs Traditional Production | Articog",
  description: "A comparison of Articog's AI accelerated creative engine versus traditional agency production models for speed, scale, and cost.",
  alternates: { canonical: "https://www.articog.com/compare/vs-traditional-production" },
};
import { Container, Section, Heading, PageHero, Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function ComparisonPage() {
  const comparisonData = [
    {
      metric: "Production Approach",
      traditional: {
        value: "Traditional Production",
        desc: "A multi-stage process with onboarding, briefing, and manual concepting before the first draft.",
      },
      articog: {
        value: "AI-Native Workflow",
        desc: "A human-directed production workflow that uses brand references and AI tools to develop the first round for review.",
      },
    },
    {
      metric: "Delivery Model",
      traditional: {
        value: "Multi-Stage Production",
        desc: "Channel-ready assets move through sequential production and review stages.",
      },
      articog: {
        value: "Streamlined Production Workflow",
        desc: "A structured workflow connects briefing, generation, review, refinement, and delivery.",
      },
    },
    {
      metric: "Cost Structure",
      traditional: {
        value: "High Retainer + Overages",
        desc: "Fixed costs for agency overhead plus unpredictable billing for revisions and additional asset formats.",
      },
      articog: {
        value: "Scales with Demand",
        desc: "Predictable cost structure that aligns with your actual creative output needs, eliminating wasteful overhead.",
      },
    },
    {
      metric: "Review Model",
      traditional: {
        value: "Sequential Revision Cycles",
        desc: "Changes move through the production queue and review process.",
      },
      articog: {
        value: "Reduced Production Bottlenecks",
        desc: "Feedback is integrated into structured review cycles for focused creative refinement.",
      },
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <PageHero contentOnly>
        <Container>
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Less traditional production. More AI-native production.
            </Heading>
          </div>
        </Container>
      </PageHero>

      {/* Comparison Table Section */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="overflow-x-auto">
            <Table className="border-collapse">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4 py-6 px-4">Metric</TableHead>
                  <TableHead className="w-3/8 py-6 px-8 type-h4 text-white/60">Traditional Agency</TableHead>
                  <TableHead className="w-3/8 py-6 px-8 type-h4 text-white">Articog Engine</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className="group hover:bg-white/[0.01]">
                    <TableCell className="py-10 px-4 align-top">
                      <span className="type-h4 text-white">{row.metric}</span>
                    </TableCell>
                    <TableCell className="py-10 px-8 align-top">
                      <div className="text-white/60 font-display text-xl mb-3">{row.traditional.value}</div>
                      <p className="text-white/40 type-small leading-relaxed">{row.traditional.desc}</p>
                    </TableCell>
                    <TableCell className="py-10 px-8 align-top bg-white/[0.02]">
                      <div className="text-white font-display text-xl mb-3">{row.articog.value}</div>
                      <p className="text-white/60 type-small leading-relaxed">{row.articog.desc}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-safe type-small italic">
              Based on observed outcomes across Articog client engagements.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section size="lg" className="border-t border-white/5">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
