import type { Metadata } from "next";
import Image from "next/image";
import { Container, Heading, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Press & Media Kit | Articog",
  description: "Press resources, branding assets, and company information for Articog's AI-native film and creative production work.",
  alternates: { canonical: "https://www.articog.com/press" },
};

export default function PressPage() {
  const mediaAssets = [
    {
      title: "Articog Logo White",
      description:
        "Official Articog logo asset on black background for editorial and press use.",
      actionLabel: "Download Logo",
      href: "/articog-logo-white.png",
      asset: "/articog-logo-white.png",
      alt: "Articog white logo on black background",
    },
    {
      title: "Articog Logo Black",
      description:
        "Official Articog logo asset on white background for editorial and press use.",
      actionLabel: "Download Logo",
      href: "/articog-logo-black.png",
      asset: "/articog-logo-black.png",
      alt: "Articog black logo on white background",
    },
    {
      title: "Press Images / Approved Work",
      description:
        "Approved product and site screenshots are available on request for press use.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <PageHero contentOnly className="flex-grow pb-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero" className="text-white">
                Press & Media Kit
              </Heading>
              <p className="mt-[var(--gap-heading-to-text)] type-h3 max-w-2xl leading-relaxed text-white/60">
                Resources and information for journalists and media covering
                Articog&apos;s mission to transform creative production with AI.
              </p>
            </div>

            <Section className="border-t border-white/[0.08] py-12">
              <Heading as="h2" size="section" className="mb-8 text-white">
                Media Kit
              </Heading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaAssets.slice(0, 2).map((asset) => (
                  <div
                    key={asset.title}
                    className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
                  >
                    <Heading as="h3" size="card" className="mb-3 text-white">
                      {asset.title}
                    </Heading>

                    {asset.asset ? (
                      <div className="mb-4 flex items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-black p-6">
                        <Image
                          src={asset.asset}
                          alt={asset.alt}
                          width={400}
                          height={200}
                          sizes="min(360px, 100%)"
                          className="h-auto w-full max-w-[360px] object-contain"
                        />
                      </div>
                    ) : null}

                    <p className="type-small mb-6 flex-grow leading-relaxed text-white/60">
                      {asset.description}
                    </p>

                    {asset.href ? (
                      <a
                        href={asset.href}
                        download
                        aria-label={`Download ${asset.title}`}
                        className="mt-auto inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                      >
                        {asset.actionLabel}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {mediaAssets.slice(2).map((asset) => (
                  <div
                    key={asset.title}
                    className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
                  >
                    <Heading as="h3" size="card" className="mb-3 text-white">
                      {asset.title}
                    </Heading>

                    <p className="type-small mb-6 flex-grow leading-relaxed text-white/60">
                      {asset.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section className="border-t border-white/[0.08] py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <Heading as="h2" size="section" className="mb-6 text-white">
                    Company Boilerplate
                  </Heading>

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
                    Articog is an AI-Native Film &amp; Production Company producing brand films, commercials, performance creative, social content, product visuals and audio for brands and modern marketing teams.
                  </div>
                </div>

                <div>
                  <Heading as="h2" size="section" className="mb-6 text-white">
                    Media Contact
                  </Heading>

                  <p className="mb-4 text-white/60">
                    For media inquiries, interviews, or additional assets,
                    please reach out to our communications team.
                  </p>

                  <a
                    href="mailto:info@articog.com"
                    className="text-white text-xl font-bold hover:underline tracking-tight"
                  >
                    info@articog.com
                  </a>
                </div>
              </div>
            </Section>

            <Section className="border-t border-white/[0.08] py-12">
                  <Heading as="h2" size="section" className="mb-4 text-white">
                Usage Guidelines
              </Heading>

              <p className="type-small max-w-2xl leading-relaxed text-white/60">
                Articog logos and media materials may be used for editorial
                coverage according to our brand guidelines. For any other
                usage or specific permission questions, please contact us.
              </p>
            </Section>

          </div>
        </Container>
      </PageHero>
    </div>
  );
}