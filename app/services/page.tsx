import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/services" },
  title: "Creative Services | Articog",
  description:
    "AI video production, ad creative, social creative, product visuals, creative strategy, and post-production for growth-stage brands.",
};

import { Link } from "@/components/ui/Link";
import { Container, Section, Heading, Card, PageHero, MediaOverlay } from "@/components/ui";
import { ArrowRight, Grid2X2, Instagram, Layers3, Smartphone } from "lucide-react";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { topLevelServiceLinks } from "@/lib/service-navigation";

const serviceDeliverables = [
  {
    title: "Feed Post",
    description: "High-impact square and 4:5 feed assets.",
    Icon: Grid2X2,
  },
  {
    title: "Story Format",
    description: "Immersive 9:16 mobile content.",
    Icon: Smartphone,
  },
  {
    title: "Reel Cover",
    description: "Custom thumbnails designed for click-through.",
    Icon: Instagram,
  },
  {
    title: "Organized for Scale",
    description: "Organized campaign assets for scalable delivery.",
    Icon: Layers3,
  },
];

export const serviceGroups = [
  {
    category: "Video",
    items: [
      {
        title: "AI Video Production",
        href: "/services/ai-video-production",
        description:
          "Premium cinematic video for launches and brand storytelling.",
      },
      {
        title: "Brand Films",
        href: "/services/ai-video-production",
        description:
          "Brand-led visuals with depth, tone, and clarity.",
      },
      {
        title: "Product Commercials",
        href: "/services/ai-video-production",
        description:
          "Conversion-focused product stories for paid and owned channels.",
      },
      {
        title: "Performance Ads",
        href: "/services/ad-creative",
        description:
          "Video creative built for testing and growth.",
      },
      {
        title: "Social & Reel Production",
        href: "/services/social-creative",
        description:
          "Vertical content designed for fast-moving platforms.",
      },
      {
        title: "Product Launch Videos",
        href: "/services/ai-video-production",
        description:
          "Launch films built to create momentum.",
      },
      {
        title: "Localization & Variants",
        href: "/services/ai-video-production",
        description:
          "Campaign adaptation for new markets and channels.",
      },
    ],
  },
  {
    category: "Ad Creative",
    items: [
      {
        title: "Ad Creative",
        href: "/services/ad-creative",
        description:
          "Static and video assets for global performance marketing.",
      },
      {
        title: "Performance Video Ads",
        href: "/services/ad-creative",
        description:
          "Video testing and production for paid media.",
      },
      {
        title: "Testing & Variants",
        href: "/services/ad-creative",
        description:
          "Hypothesis-driven testing for paid campaigns.",
      },
      {
        title: "Campaign Key Visuals",
        href: "/services/ad-creative",
        description:
          "The core visual system for a campaign across channels.",
      },
    ],
  },
  {
    category: "Social",
    items: [
      {
        title: "Social Creative",
        href: "/services/social-creative",
        description:
          "Creative concepts driven by data and designed for platform engagement.",
      },
      {
        title: "Monthly Social Content",
        href: "/services/social-creative",
        description:
          "Consistent content cycles to maintain your brand presence.",
      },
      {
        title: "Creative Repurposing",
        href: "/services/social-creative",
        description:
          "Turn existing content into new formats and channels intelligently.",
      },
    ],
  },
  {
    category: "Product Visuals",
    items: [
      {
        title: "Product Visual Content",
        href: "/services/product-visuals",
        description:
          "Dynamic product imagery for e-commerce and marketing.",
      },
      {
        title: "AI Product Photography",
        href: "/services/product-visuals",
        description:
          "Photorealistic product scenes without the physical studio.",
      },
      {
        title: "Custom Image Libraries",
        href: "/services/product-visuals",
        description:
          "Build large, consistent libraries of on-brand product images.",
      },
      {
        title: "E-commerce Visuals",
        href: "/services/product-visuals",
        description:
          "Visuals built for conversion on your site and global marketplaces.",
      },
    ],
  },
  {
    category: "Audio",
    items: [
      {
        title: "Audio & Sound",
        href: "/services/audio",
        description:
          "Complete audio production, from cinematic scores to AI voiceover.",
      },
      {
        title: "AI Voiceover",
        href: "/services/audio",
        description:
          "Hyper-realistic synthetic voice production with full rights clearance.",
      },
      {
        title: "Music & Sound Design",
        href: "/services/audio",
        description:
          "Custom scoring and immersive soundscapes for cinematic impact.",
      },
    ],
  },
  {
    category: "Strategy",
    items: [
      {
        title: "Creative Strategy & Concepting",
        href: "/services/creative-strategy",
        description:
          "Strategic frameworks to guide your creative production engine.",
      },
      {
        title: "Campaign Strategy",
        href: "/services/creative-strategy",
        description:
          "Planning full campaign systems for cross channel impact.",
      },
      {
        title: "Concept Development",
        href: "/services/creative-strategy",
        description:
          "Exploring multiple creative directions before committing to production.",
      },
      {
        title: "Storyboarding & Previs",
        href: "/services/creative-strategy",
        description:
          "Visualizing and sequencing every shot before production begins.",
      },
    ],
  },
  {
    category: "Post-Production",
    items: [
      {
        title: "AI Post-Production",
        href: "/services/post-production",
        description:
            "Brand films, commercials, launches and social video with less traditional production.",
      },
      {
        title: "Motion Graphics",
        href: "/services/post-production",
        description:
          "Animated titles, callouts, and branded elements for video.",
      },
      {
        title: "Upscaling & Mastering",
        href: "/services/post-production",
        description:
          "Technical mastering for high-resolution delivery.",
      },
      {
        title: "AI Compositing",
        href: "/services/post-production",
        description:
          "Integrating assets seamlessly into complex cinematic scenes.",
      },
      {
        title: "Video Editing",
        href: "/services/post-production",
        description:
          "Smart narrative assembly and sequence optimization.",
      },
    ],
  },
];

const organizedServices = topLevelServiceLinks.map((serviceLink, index) => {
  const group = serviceGroups[index];
  const [primaryService, ...relatedServices] = group.items;
  const images: Record<string, { src: string; alt: string }> = {
    "/services/ai-video-production": {
      src: "https://media.articog.com/images/services/hf_20260824_090509_2e0e972f-465c-435c-8144-b01b1133427b.png",
      alt: "Brand films and commercial production",
    },
    "/services/ad-creative": {
      src: "https://media.articog.com/images/services/hf_20260820_165439_f355b7b5-fc30-4852-9c69-cb8433145326.png",
      alt: "Performance creative production",
    },
    "/services/social-creative": {
      src: "https://media.articog.com/images/services/hf_20260821_215506_41068c08-3be5-4f02-bb81-9d5da0895c98.png",
      alt: "Creator-style social content production",
    },
  };
  const image = images[serviceLink.href];

  return {
    title: serviceLink.pageTitle,
    description: primaryService.description,
    href: serviceLink.href,
    tags: relatedServices.map((service) => service.title),
    image,
  };
});

type OrganizedService = (typeof organizedServices)[number];

function ServiceCard({ service, featured = false }: { service: OrganizedService; featured?: boolean }) {
  return (
    <Card className={`h-full gap-0 overflow-hidden border-white/[0.08] bg-white/[0.02] p-0 transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-white/[0.035] ${featured ? "" : "md:min-h-[260px]"}`}>
      {service.image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes={featured ? "(max-width: 767px) 100vw, (max-width: 1279px) 33vw, 400px" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 300px"}
            className="object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <Heading as="h3" size="card" className="text-white">
          {service.title}
        </Heading>
        <p className="mt-3 type-small leading-relaxed text-white/60">
          {service.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] px-3 py-1 type-caption text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={service.href}
          className="mt-auto inline-flex items-center justify-between gap-3 pt-8 type-small font-medium text-white transition-opacity hover:opacity-70"
        >
          <span>View service</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03]">
            <ArrowRight size={15} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </Card>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Creative services for campaign volume."
        media={
          <>
            <Image
              src="https://media.articog.com/images/services/hf_20260820_165439_f355b7b5-fc30-4852-9c69-cb8433145326.png"
              alt=""
              fill
              sizes="100vw"
              className="h-full w-full object-cover"
              aria-hidden="true"
            />
            <MediaOverlay
              strength="soft"
              className="bg-gradient-to-b from-black/55 via-black/10 to-transparent"
            />
            <MediaOverlay strength="soft" />
          </>
        }
        className="flex min-h-svh items-center justify-center text-center md:min-h-[52vh]"
      />

      <Section className="border-t border-white/[0.05] py-20 md:py-28">
        <Container className="max-w-[1440px]">
          <div className="mb-9 max-w-4xl md:mb-12">
            <Heading as="h2" size="section" className="text-white">
              Film, video, image and audio, produced faster with AI.
            </Heading>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {organizedServices.filter((service) => service.image).map((service) => (
              <ServiceCard key={service.title} service={service} featured />
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:mt-5 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {organizedServices.filter((service) => !service.image).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Service Deliverables */}
      <Section size="md" className="border-t border-white/[0.05]">
        <Container className="max-w-[1440px]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {serviceDeliverables.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                className={`min-h-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6 ${index === serviceDeliverables.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <Icon className="mb-5 h-6 w-6 text-white/70" aria-hidden="true" />
                <Heading as="h2" size="card" className="mb-3 text-white">{title}</Heading>
                <p className="type-small leading-relaxed text-white/60">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
    </>
  );
}