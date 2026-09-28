import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/services/post-production" },
  title: "Post-Production | Articog",
  description: "Post-production for video, motion, sound, and finishing, helping brands polish creative for launch and performance.",
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Scissors, Layers, Palette, Volume2, Sparkles, Info, ArrowRight } from "lucide-react";
import { ServiceDetails } from "@/components/sections/ServiceDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function PostProductionPage() {
  const whatWeDeliver = [
    {
      title: "Editing",
      desc: "Precision narrative assembly and rhythm.",
      icon: Scissors,
    },
    {
      title: "Compositing",
      desc: "Seamless visual element integration.",
      icon: Layers,
    },
    {
      title: "Color",
      desc: "Cinematic grading for emotional tone.",
      icon: Palette,
    },
    {
      title: "Audio",
      desc: "Professional sound design and finishing.",
      icon: Volume2,
    },
    {
      title: "Cleanup & Upscaling",
      desc: "High-resolution technical finishing.",
      icon: Sparkles,
    },
  ];

  const subPages = [
    {
      title: "Video Editing",
      href: null,
      description: "Professional narrative and performance editing for all formats.",
    },
    {
      title: "AI Compositing & Cleanup",
      href: null,
      description: "Advanced visual refinement and element integration.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Post-Production" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Final polish, ready for every channel.
            </Heading>
          </div>
        </Container>
      </PageHero>

      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="mb-12">
            <Heading as="h2" size="section" className="mb-4 text-center text-white">What We Deliver</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatWeDeliver.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <Heading as="h3" size="card" className="text-white">{item.title}</Heading>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl border border-white/10 flex items-start gap-4 max-w-2xl mx-auto">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Note: Final assets are formatted to your exact channel and platform delivery specifications.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {subPages.map((page) => {
              const card = (
                <>
                  <Heading as="h3" size="card" className="text-white">{page.title}</Heading>
                  {page.href && (
                    <span className="inline-flex items-center gap-2 text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  )}
                </>
              );
              const className = "group p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-[border-color]";

              return page.href ? (
                <Link key={page.title} href={page.href} className={className}>
                  {card}
                </Link>
              ) : (
                <div key={page.title} className={className}>
                  {card}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <ServiceDetails category="post-production" />

      <Section size="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
              <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
