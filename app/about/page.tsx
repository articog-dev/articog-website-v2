import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/about" },
  title: "About Articog | AI Native Film & Production Company",
  description:
    "Articog is an AI Native Film & Production Company producing brand films, commercials, product visuals, creator-style social content, campaign creative, and audio for growth-stage brands and modern marketing teams, with a primary focus on the United States and select global markets.",
};
import { Link } from "@/components/ui/Link";
import { Container, Section, Button, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-black">
      <PageHero
        title="Brand production, rebuilt with AI."
        subtitle="Articog is an AI Native Film &amp; Production Company helping brands create stories for every product with faster AI-native production and lower production overhead."
      />

      <Section size="md" className="border-t border-white/[0.05] pt-0">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 lg:grid-cols-[0.9fr_1.8fr] lg:items-start">
            <div className="space-y-4 lg:pt-[0.25rem]">
              <Heading as="h2" size="section" className="max-w-[15rem] leading-[0.92] text-balance">
                A creative company
                <br />
                built for the age of AI.
              </Heading>
            </div>
            <div className="space-y-7 text-[1.05rem] leading-[1.9] text-white/60 lg:max-w-[54rem]">
              <p>
                <span className="font-bold text-white">Articog</span> is an AI Native Film &amp; Production Company helping brands create stories for every product with faster AI-native production and lower production overhead.
              </p>
              <p>
                The name says it all: <span className="font-bold text-white">Artificial + Cognition.</span>
              </p>
              <p>
                <span className="font-bold text-white">Articog</span> builds on production experience from <span className="font-bold text-white">Govada Creative Productions</span>, with a focus on craft, review discipline, finishing, rights, and delivery.
              </p>
              <p>
                We reduce traditional production, production time and budget through AI, while keeping brand direction, storytelling and final quality human-led.
              </p>
              <p className="italic font-medium text-white/75">
                Brands can use Articog monthly for recurring film, video, image, social and audio production, or engage us for individual projects.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <Heading as="h2" size="section" className="mb-4">
                The people behind Articog
              </Heading>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FounderPreviewCard
                name="Sai Teja Inampudi"
                role="CEO & Founder"
                imageSrc="https://media.articog.com/images/about/Sai%20Teja%20Inampudi.png"
                imageAlt="Sai Teja Inampudi"
                profileHref="/about/founder/sai-teja-inampudi"
              />
              <FounderPreviewCard
                name="Dr. Harika Govada"
                role="MD & Co-Founder"
                imageSrc="https://media.articog.com/images/about/harika-govada.png.png"
                imageAlt="Dr. Harika Govada"
                profileHref="/about/founder/dr-harika-govada"
                circular
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-8 lg:grid-cols-[0.9fr_1.8fr] lg:items-center">
            <div className="space-y-3">
              <Heading as="p" size="label">
                OUR FOUNDATION
              </Heading>
              <Heading as="p" size="section">
                Production experience. Now AI-native.
              </Heading>
            </div>
            <p className="type-body-lg leading-relaxed text-white/60">
              Articog brings production experience into a human-directed, AI-native model, combining creative direction, generative workflows, editing, sound, and finishing in one integrated process.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="md" className="border-t border-white/[0.05]">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Heading as="h2" size="section" className="mb-6">
              Human-directed. AI-native.
            </Heading>
            <p
              className="type-body md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              AI expands what can be produced and how quickly it can move. Human creative direction decides what should be made, how it should feel, and whether it is right for the brand. Every project combines both.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <ApproachItem
              title="Creative Direction First"
              description="Every project starts with the idea, audience, brand, visual language, and campaign objective. We set the direction before generation begins."
            />
            <ApproachItem
              title="AI-Native Production"
              description="Our production workflow uses generative tools to develop characters, environments, product shots, motion, and creative variations under human creative direction."
            />
            <ApproachItem
              title="Production Ready Finish"
              description="Creative directors and editors refine deliverables through compositing, editing, sound, quality control, and platform-specific finishing before delivery."
            />
          </div>
        </Container>
      </Section>

      <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
    </div>
  );
}

function ApproachItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-4 rounded-xl border border-white/[0.05] p-6">
      <Heading as="h3" size="card" className="text-white">{title}</Heading>
              <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
        {description}
      </p>
    </div>
  );
}

function FounderPreviewCard({
  name,
  role,
  imageSrc,
  imageAlt,
  profileHref = "/founder-leadership",
  circular = false,
}: {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  profileHref?: string;
  circular?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.08] p-5 sm:p-6">
      <div className="grid grid-cols-[5.5rem_1fr] items-center gap-4 sm:grid-cols-[7rem_1fr] sm:gap-5">
        <div
          className={`aspect-square overflow-hidden border border-white/[0.08] bg-black ${circular ? "rounded-full" : "rounded-xl"}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={603}
            height={603}
            className={`h-full w-full object-cover ${circular ? "rounded-full" : ""}`}
            sizes="(max-width: 639px) 5.5rem, 7rem"
          />
        </div>
        <div>
          <Heading as="h3" size="card" className="text-white">{name}</Heading>
          <p className="mt-2 type-body text-white/60">{role}</p>
          <Button asChild variant="outline" size="sm" className="mt-5">
            <Link to={profileHref}>
              View More
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
