import type { Metadata } from "next";
import { Link } from "@/components/ui/Link";
import { Container, Button, Heading, PageHero } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Articog",
  description: "Thanks for contacting Articog. We will be in touch soon.",
  robots: { index: false, follow: false },
};

export default function ContactThankYouPage() {
  return (
    <PageHero contentOnly className="min-h-[80vh] flex items-center bg-black">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircle2 size={32} />
            </div>
          </div>
          <div className="text-center">
            <Heading as="h1" size="hero" className="text-white">
              Message received
            </Heading>
            <p className="mx-auto mt-[var(--gap-heading-to-text)] mb-[var(--spacing-title-gap)] max-w-md type-body md:text-lg" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
              Thanks for reaching out. We&apos;ll follow up within 1 business day.
            </p>
          </div>
          <Button asChild variant="primary" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Container>
    </PageHero>
  );
}
