import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/services/audio" },
  title: "Audio & Sound Production | Articog",
  description: "Audio and sound production for video campaigns, ads, and brand storytelling, including voice, music, and finishing.",
};
import { Container, Section, Heading, Button, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Mic2, Music, Waves, Speaker, Info, ArrowRight, AudioLines } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function AudioPage() {
  const deliverables = [
    {
      title: "Voiceover",
      desc: "Professional voice matched to brand tone.",
      icon: Mic2,
    },
    {
      title: "Music",
      desc: "Custom scores and licensed tracks.",
      icon: Music,
    },
    {
      title: "Sound Design",
      desc: "Atmospheric textures and foley design.",
      icon: Waves,
    },
    {
      title: "Mix & Master",
      desc: "Technical finishing for every platform.",
      icon: Speaker,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Audio & Sound" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Voice, music and sound in the same monthly workflow.
            </Heading>
          </div>
        </Container>
      </PageHero>

      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div>
            <Heading as="h2" size="section" className="mb-4 text-white">What We Deliver</Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item) => (
              <div 
                key={item.title} 
                className="p-8 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                  <item.icon className="w-5 h-5" />
                </div>
                <Heading as="h3" size="subsection" className="text-white">{item.title}</Heading>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-[border-color] duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Mic2 className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <Heading as="h3" size="section" className="mb-2 text-white">AI Voiceover</Heading>
            </div>

            <div className="group p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-[border-color] duration-300">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <AudioLines className="w-6 h-6" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <Heading as="h3" size="section" className="mb-2 text-white">Music &amp; Sound Design</Heading>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl border border-white/10 flex items-start gap-4 max-w-2xl">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="type-small text-white/50 italic leading-relaxed">
              Note: All synthetic voice use requires proper consent and rights clearance. Licensing terms and usage rights are confirmed per project as part of scope.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Heading as="h2" size="section" className="mb-8 text-white">Elevate your project's sound</Heading>
            <Link href="/book-a-demo">
              <Button size="lg" className="rounded-full px-8 h-14">
                Add Audio Production
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
