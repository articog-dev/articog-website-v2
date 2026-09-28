import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Visual Content | Articog",
  description: "On-brand product visuals at scale. Product photography, campaign posters, and print-ready assets delivered in days.",
  alternates: { canonical: "https://www.articog.com/work/product-visuals" },
};
import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export default function ProductVisualsPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Product Visuals Work" }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Product Visual Content
            </Heading>
          </div>
        </Container>
      </PageHero>

      {/* Case Study Section */}
      <Section size="md" className="bg-white/[0.02] pt-0">
        <Container>
          <div className="max-w-3xl">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold tracking-widest text-muted-safe uppercase">Beauty / Creator-Style Social Content</span>
                </div>
                  <Heading as="h2" size="section" className="mb-4 text-white">
                  Launch-ready campaign imagery with a structured, fast-turn production workflow
                  </Heading>
                <p className="type-body-lg text-white/60">
                  How a modern beauty brand can move from concept to a multi-platform campaign system through a more efficient visual production process.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl border border-white/10">
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">Fast</div>
                  <div className="text-sm font-sans text-white/40 uppercase tracking-wider font-bold">Turnaround model</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">Brand</div>
                  <div className="text-sm font-sans text-muted-safe uppercase tracking-wider font-bold">Consistency focus</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Capabilities Section */}
      <Section size="lg">
        <Container>
          <div className="max-w-2xl mb-16">
              <Heading as="h2" size="section" className="mb-6 text-white">Visual Production at Scale</Heading>
            <p className="type-body-lg text-white/60">
              We provide a comprehensive suite of visual assets that maintain consistent brand standards across every touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Product Visualization", desc: "Product visuals developed with a defined lighting and composition direction." },
              { title: "Campaign Posters", desc: "High impact visual statements for digital and physical placements." },
              { title: "Digital Banners", desc: "Optimized display assets for web, mobile, and social platforms." },
              { title: "Print-Ready Assets", desc: "High-resolution files ready for any physical production needs." }
            ].map((item) => (
              <div key={item.title} className="p-8 rounded-2xl border border-white/10">
                  <Heading as="h3" size="subsection" className="mb-3 text-white">{item.title}</Heading>
                <p className="type-small text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
