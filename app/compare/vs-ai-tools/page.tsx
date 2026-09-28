import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articog vs AI Tools | Articog",
  description: "A comparison of Articog's managed creative engine versus doing it yourself with raw AI tools. Why expertise and consistency matter.",
  alternates: { canonical: "https://www.articog.com/compare/vs-ai-tools" },
};
import { Container, Section, Heading, PageHero, Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function CompareAIToolsPage() {
  const comparisonData = [
    {
      metric: "Creative Direction",
      diy: {
        value: "Inconsistent",
        desc: "Without a trained eye, raw outputs often lack the strategic intention and nuance required for brand work with high stakes.",
      },
      articog: {
        value: "Guided by Experts",
        desc: "Every asset is guided by experienced creative direction, ensuring technical brilliance is matched by strategic purpose.",
      },
    },
    {
      metric: "Technical Expertise",
      diy: {
        value: "Steep Learning Curve",
        desc: "Managing multiple specialized AI tools requires significant time to master prompting, parameters, and post-production.",
      },
      articog: {
        value: "Calibrated Pipeline",
        desc: "Our engine is built and managed by specialists who calibrate multiple models into a single, seamless production flow.",
      },
    },
    {
      metric: "Brand Consistency",
      diy: {
        value: "Output Drifts",
        desc: "Prompts often drift over time, leading to visual variations that can dilute your brand's core identity and impact.",
      },
      articog: {
        value: "Systematic Enforcement",
        desc: "We build your specific brand guidelines into the pipeline, ensuring systematic enforcement across every asset we generate.",
      },
    },
    {
      metric: "Time Investment",
      diy: {
        value: "High Time Cost",
        desc: "Hours spent prompting, re-generating, and troubleshooting outputs manually taking time away from higher-value tasks.",
      },
      articog: {
        value: "Low Friction",
        desc: "Brief in, finished assets out. We handle the technical complexity so your team can focus on strategy and scaling.",
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
              AI gives speed. Articog gives the brand story and finished production.
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
                  <TableHead className="w-3/8 py-6 px-8 type-h4 text-white/60">DIY With AI Tools</TableHead>
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
                      <div className="text-white/60 font-display text-xl mb-3">{row.diy.value}</div>
                      <p className="text-white/40 type-small leading-relaxed">{row.diy.desc}</p>
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
