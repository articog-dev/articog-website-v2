import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Production Work | Articog",
  description: "See AI-native creative production across video ads, social content, product visuals, and campaign storytelling for growth-stage brands.",
  alternates: { canonical: "https://www.articog.com/work" },
};
import { ArrowRight } from "lucide-react";
import { Container, Heading, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { CreativeDocument } from "./CreativeDocument";
import { WorkVideoShowcase } from "@/components/sections/WorkVideoShowcase";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function WorkPage() {
  const categories = [
    {
      title: "Video Ads",
      href: "/work/video-ads",
    },
    {
      title: "Creator-Style Social Content",
      href: "/work/social",
    },
    {
      title: "Product Visuals",
      href: "/work/product-visuals",
    },
    {
      title: "Work by Industry",
      href: "/industries",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              Brand stories and product creative produced with Articog.
            </Heading>
          </div>

          <WorkVideoShowcase />

          <CreativeDocument />

          <div className="grid gap-6 md:grid-cols-2 mb-20">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group rounded-2xl p-8 border border-white/[0.08] transition-[border-color] hover:border-white/20"
              >
                <Heading as="h2" size="card" className="mb-2 flex items-center justify-between text-white">
                  {cat.title}
                  <ArrowRight size={20} className="opacity-0 -translate-x-2 transition-[opacity,transform] group-hover:opacity-100 group-hover:translate-x-0" />
                </Heading>
              </Link>
            ))}
          </div>

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </PageHero>
    </div>
  );
}
