import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Creative Work | Articog",
  description: "Platform-native content built for organic and paid social.",
  alternates: { canonical: "https://www.articog.com/work/social" },
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Instagram, Smartphone, Grid, Info } from "lucide-react";
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function SocialWorkPage() {
  const formats = [
    {
      title: "Feed Post",
      desc: "High impact square and 4:5 assets built for the main feed.",
      icon: Grid,
    },
    {
      title: "Story Format",
      desc: "Immersive 9:16 vertical content designed for mobile-first consumption.",
      icon: Smartphone,
    },
    {
      title: "Reel Cover",
      desc: "Custom-designed thumbnail covers that drive higher click-through rates.",
      icon: Instagram,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Social Creative Work" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Social Creative Work
            </Heading>
          </div>
        </Container>
      </PageHero>

      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="mb-12 max-w-3xl">
            <h2 className="type-h2 mb-4 text-white">A real example</h2>
          </div>
          <div className="max-w-3xl mb-16">
            <YouTubeEmbed
              videoId="l5pReVGFVqs"
              title="These Actors Don’t Exist. This Entire Ad Was Made With AI | Articog"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {formats.map((format) => (
              <div 
                key={format.title} 
                className="group flex flex-col rounded-2xl border border-white/10 p-6 text-center"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center self-center rounded-xl border border-white/10 text-white/40">
                  <format.icon className="h-6 w-6" />
                </div>
                <h3 className="type-h3 text-white mb-2">{format.title}</h3>
                <p className="type-small text-white/50 leading-relaxed max-w-[240px]">{format.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-3xl border border-white/10 max-w-3xl mx-auto">
            <div className="flex gap-4 items-start">
              <Info className="w-6 h-6 text-white/40 mt-1" />
              <div>
                <h4 className="type-h3 text-white mb-2">Organized for Scale</h4>
                <p className="type-body text-white/60 leading-relaxed">
                  All content is intelligently grouped into thematic series to ensure cross channel consistency. Every asset is meticulously organized by campaign and format, making reference and implementation seamless for your team.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

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
