import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AI-Native Production Works | Articog",
  description: "See how AI-native production combines creative direction, generation, review, and final delivery for growth-stage brands.",
  alternates: { canonical: "https://www.articog.com/how-it-works" },
};
import { Link } from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { Pipeline } from "@/components/sections/Pipeline";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HowItWorksPage() {
  const pipelineSteps = [
    {
      step: 1,
      title: "Brief",
      description: "Brief: Share the product, brand story, goal and references.",
      tag: "Day 1",
    },
    {
      step: 2,
      title: "Generate",
      description: "Create: We build the story and produce faster with AI.",
      tag: "Day 1 to 2",
    },
    {
      step: 3,
      title: "Refine",
      description: "Refine: Human direction keeps the work on-brand.",
      tag: "Day 2 to 3",
    },
    {
      step: 4,
      title: "Deliver",
      description: "Deliver: Receive finished content for every required channel and format.",
      tag: "Day 3 to 4",
    },
  ];

  const onboardingSteps = [
    ["Brand Assets", "Collecting your logo, guidelines, and existing creative for reference to ensure brand consistency."],
    ["Stakeholders", "Identifying who's involved in review and approval to streamline the feedback loop."],
    ["Rights & Permissions", "Confirming usage rights and any necessary consents upfront to protect your brand."],
    ["Approval SLAs", "Agreeing on how fast reviews and feedback will happen to maintain production momentum."],
    ["First Project Roadmap", "A clear, milestone-driven timeline for your first deliverable and campaign launch."],
  ];

  const deliverySteps = [
    ["Feedback Windows", "A defined period for review and feedback on each round to maintain production velocity."],
    ["Version Control", "Every revision clearly labeled and tracked so nothing gets lost and the latest version is always accessible."],
    ["Revision Policy", "A clear number of included revision rounds per project, with any additional disputes handled case by case."],
    ["Final Formats", "Assets delivered in every aspect ratio, file format, and technical spec your campaign requires."],
    ["Archive", "Delivered projects kept securely accessible for future reference and repurposing."],
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              From brief to live in days
            </Heading>
            <p className="mx-auto mt-[var(--gap-heading-to-text)] max-w-2xl type-body md:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              We replace rigid timelines and overhead with a high velocity engine powered by AI and directed by humans.
            </p>
          </div>

        </Container>
      </PageHero>

      <Pipeline steps={pipelineSteps} />

      <Section className="pt-section-sm pb-0">
        <Container>
          <Link
            href="/how-it-works/ai-creative-pipeline"
            className="group mx-auto block max-w-2xl rounded-2xl border border-white/[0.08] p-6 text-center transition-[border-color] hover:border-white/20"
          >
            <h3 className="mb-2 flex items-center justify-center gap-2 type-h3 text-white">
              AI Creative Pipeline
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="type-small" style={{ color: "rgba(255,255,255,0.50)" }}>
              Take a deeper technical look at our internal creative engine.
            </p>
          </Link>
        </Container>
      </Section>

      <Section size="md" className="pt-section-sm">
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h2" size="section" className="mb-4">Getting started and delivery</Heading>
          </div>
          <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
            {[...onboardingSteps, ...deliverySteps].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-white/10 p-5">
                <h3 className="mb-2 type-h4 text-white">{title}</h3>
                <p className="type-small leading-relaxed text-white/50">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="md" className="pt-0">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h2" size="section" className="mb-6">
              Human oversight, every step
            </Heading>
            <p className="type-body leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.60)" }}>
              A Creative Director reviews every project for brand safety, legal compliance, and quality.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="lg" className="pb-32">
        <Container>
          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </Section>
    </div>
  );
}
