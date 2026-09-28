import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/careers" },
  title: "Careers | Articog",
  description: "Join Articog and help build AI-native film and creative production for ambitious growth-stage brands.",
};
import { Container, Section, Button, Heading, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { BreezyOpenings } from "@/components/careers/BreezyOpenings";

export default function CareersPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageHero title="Join the future of production" compact />
      <Section className="pt-0">
        <Container>

          <div className="mx-auto mb-24 max-w-4xl">
            <Heading as="h2" size="section" className="mb-5 text-[clamp(2rem,1.8vw,2.8rem)] leading-[1.08] tracking-[-0.05em] text-white">Open Roles</Heading>

            <BreezyOpenings />

            <p className="mt-8 text-center font-sans text-[12px] text-muted-safe">
              Note: Candidate information is handled according to our <Link href="/privacy-policy" className="underline hover:text-white/50">Privacy Policy</Link>.
            </p>
          </div>

          <div className="text-center pt-16 border-t border-white/10">
            <Heading as="h2" size="section" className="mb-8">
              Stay connected
            </Heading>
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}