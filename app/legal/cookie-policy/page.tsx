import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/legal/cookie-policy" },
  title: "Cookie Policy | Articog",
  description: "Information about how Articog uses cookies and similar technologies.",
};
import { Container, Heading, PageHero } from "@/components/ui";

export default function CookiePolicyPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero">Cookie Policy</Heading>
              <p className="mt-[var(--gap-heading-to-text)] type-small text-muted-safe uppercase tracking-widest">Last updated: August 19, 2026</p>
            </div>

            <div className="space-y-12 type-small leading-relaxed text-white/60">
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">1. What are cookies?</Heading>
                <p>Cookies are small text files that are stored on your device when you visit a website. They help the website recognize your device and remember information about your visit.</p>
              </section>
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">2. How we use cookies</Heading>
                <p>We use cookies to enhance your browsing experience, analyze site traffic, and serve personalized content. Some cookies are necessary for the technical operation of our site.</p>
              </section>
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">3. Managing your preferences</Heading>
                <p>You can manage your cookie preferences through your browser settings or by visiting our <a href="/privacy-choices" className="text-white underline">Privacy Choices</a> page.</p>
              </section>
            </div>
          </div>
        </Container>
      </PageHero>
    </div>
  );
}
