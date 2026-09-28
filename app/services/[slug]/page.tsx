import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  dedicatedServicePageBySlug,
  dedicatedServicePages,
} from "@/lib/service-pages";

export function generateStaticParams() {
  return dedicatedServicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = dedicatedServicePageBySlug[slug];

  if (!service) {
    return { title: "Service | Articog" };
  }

  return {
    title: `${service.title} | Articog`,
    description: service.description,
    alternates: { canonical: `https://www.articog.com/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = dedicatedServicePageBySlug[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <PageHero contentOnly>
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]} />
          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              {service.title}
            </Heading>
            {service.description && (
              <p className="mx-auto mt-[var(--gap-heading-to-text)] max-w-2xl type-body-lg text-white/60">
                {service.description}
              </p>
            )}
          </div>
        </Container>
      </PageHero>

      <Section size="md" className="border-t border-white/5 bg-white/[0.02] pt-0">
        <Container>
          <div className="max-w-3xl">
            <Heading as="h2" size="section" className="mb-4 text-white">What We Deliver</Heading>
            <p className="type-body-lg text-white/60">
              {service.title}
            </p>
          </div>
        </Container>
      </Section>

      <Section size="lg">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
              <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
