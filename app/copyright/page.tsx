import type { Metadata } from "next";
import { Container, Heading, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Copyright Policy | Articog",
  description: "Articog's copyright policy: ownership of creative assets, usage rights, and how to report a copyright concern.",
  alternates: { canonical: "https://www.articog.com/copyright" },
};

export default function CopyrightPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero" className="text-white">Copyright / DMCA</Heading>
              <p className="mt-[var(--gap-heading-to-text)] type-h3 max-w-2xl leading-relaxed text-white/60">
                Articog respects the intellectual property rights of others and expects its users to do the same.
              </p>
            </div>

            <Section className="border-t border-white/[0.08] py-12">
              <div className="prose prose-invert max-w-none space-y-8">
                <div>
                  <Heading as="h2" size="section" className="mb-4 text-white">Reporting Infringement</Heading>
                  <p className="type-body-lg leading-relaxed text-white/60">
                    If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our copyright team with the following information:
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-white/60">
                    <li>A description of the copyrighted work that you claim has been infringed.</li>
                    <li>A description of where the material that you claim is infringing is located on the Articog site.</li>
                    <li>Your address, telephone number, and email address.</li>
                    <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
                    <Heading as="h3" size="card" className="mb-2 text-white">Contact Our Copyright Team</Heading>
                  <p className="text-white/60">
                    Submit your request via email to: <a href="mailto:info@articog.com" className="text-white hover:underline">info@articog.com</a>
                  </p>
                </div>

                <div>
                  <p className="type-small leading-relaxed text-white/40">
                    We respond to legitimate copyright concerns promptly. Please note that this process is for reporting copyright infringement only; other inquiries (such as support requests) will not receive a response through this channel.
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </Container>
      </PageHero>

    </div>
  );
}
