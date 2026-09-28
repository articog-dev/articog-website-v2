"use client";

import { Container, Button, Heading, PageHero } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { useId, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { createFAQPageSchema } from "@/lib/structured-data";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `help-answer-${useId().replace(/:/g, "")}`;
  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-white"
        style={{ color: isOpen ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)" }}
      >
        <span className="type-body font-medium leading-relaxed">{title}</span>
        {isOpen ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
      </button>
      <div
        id={contentId}
        role="region"
        hidden={!isOpen}
        className={`${isOpen ? "animate-in fade-in slide-in-from-top-1 duration-200" : ""} pb-6 type-small leading-relaxed text-white/50`}
      >
        {children}
      </div>
    </div>
  );
}

export default function HelpCenterPage() {
  const sections = [
    {
      title: "Services",
      links: [{ label: "View all services", href: "/services" }],
      faqs: [
        {
          q: "What creative services does Articog offer?",
          a: "Articog provides AI-native video production, ad creative, product visuals, social creative, and audio production through a human-directed workflow."
        },
        {
          q: "How do I choose the right service for my campaign?",
          a: "Most clients start with a specific goal, like a product launch or social growth. You can browse our industry specific solutions or book a brief discovery call to map out a custom production plan."
        }
      ]
    },
    {
      title: "Workflow",
      links: [{ label: "Explore how it works", href: "/why-articog#how-it-works" }],
      faqs: [
        {
          q: "How does a project move from brief to delivery?",
          a: "Our AI Creative Pipeline follows a structured path: Briefing & Strategy, Concepting, AI-Native Production, Human Review & Quality Assurance, and final Delivery. This hybrid human-AI model supports efficient production while keeping brand review in the process."
        }
      ]
    },
    {
      title: "Rights & Ownership",
      links: [
        { label: "AI and IP", href: "/trust/ai-and-ip" },
        { label: "Rights & Licensing", href: "/trust/rights-licensing" }
      ],
      faqs: [
        {
          q: "Who owns the delivered creative?",
          a: "Ownership terms are defined in our service agreements. Typically, clients receive broad rights to use and distribute delivered assets for their marketing purposes."
        }
      ]
    },
    {
      title: "File Formats",
      links: [],
      faqs: [
        {
          q: "What formats and specs do you deliver?",
          a: "We deliver in all standard campaign formats: 9:16 vertical (Social), 4:5 portrait (Feed), 1:1 square, and 16:9 landscape. All video is delivered in high resolution MP4/MOV, and images in high quality JPEG/PNG."
        }
      ]
    }
  ];

  const glossaryTerms = [
    {
      term: "AI-Native Production",
      definition: "A production approach where generative AI is integrated across concept development, production and finishing to improve speed, flexibility and creative output.",
      link: "/services/ai-video-production",
    },
    {
      term: "Brand Consistency at Scale",
      definition: "A structured production process using brand references, creative direction, review checkpoints and production controls to maintain consistency across formats and variants.",
      link: "/why-articog#production-economics",
    },
    {
      term: "Post-Production",
      definition: "The final technical stage of content creation, including motion graphics, color grading, upscaling, and audio mastering. Our AI-driven post-production workflow supports finishing for agreed delivery specifications.",
      link: "/services/post-production",
    },
    {
      term: "Localization",
      definition: "Adapting creative content for different geographic markets through language translation, cultural nuance adjustment, and visual element swapping, ensuring global relevance while maintaining core brand messaging.",
      link: "/solutions/product-launch",
    },
    {
      term: "Key Visual",
      definition: "The central graphic or image that serves as the foundation for a campaign's visual identity. AI allows for the rapid exploration of multiple key visual concepts to establish the strongest creative direction for a brand.",
      link: "/services/creative-strategy",
    },
  ];
  const faqSchema = createFAQPageSchema(sections.flatMap((section) => section.faqs));

  return (
    <div className="bg-black min-h-screen">
      <JsonLd data={faqSchema} />
      <PageHero contentOnly>
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-[var(--spacing-title-gap)]">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Help Center" }]} />
            <Heading as="h1" size="hero" className="text-white">
              Help Center
            </Heading>
            
          </div>

          <div className="max-w-3xl mx-auto space-y-12 mb-20">
            {sections.map((section, idx) => (
              <div key={idx} className="scroll-mt-32" id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                <div className="flex items-end justify-between mb-6 border-b border-white/[0.1] pb-4">
                  <Heading as="h2" size="section" className="text-white">{section.title}</Heading>
                  <div className="flex flex-wrap justify-end gap-2 sm:gap-4">
                    {section.links.map((link, lIdx) => (
                      <Link 
                        key={lIdx} 
                        href={link.href} 
                        className="text-[11px] font-sans font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                      >
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  {section.faqs.map((faq, fIdx) => (
                    <AccordionItem key={fIdx} title={faq.q}>
                      {faq.a}
                    </AccordionItem>
                  ))}
                </div>
              </div>
            ))}

            <section id="glossary" className="scroll-mt-32">
              <div className="mb-6 border-b border-white/[0.1] pb-4">
                <Heading as="h2" size="section" className="text-white">Glossary</Heading>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                {glossaryTerms.map((item) => (
                  <div key={item.term}>
                    <Heading as="h3" size="subsection" className="mb-2 text-white">{item.term}</Heading>
                    <p className="mb-3 type-small leading-relaxed text-white/50">{item.definition}</p>
                    <Link href={item.link} className="text-[11px] font-sans font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                      Related Service →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="text-center pt-16 border-t border-white/10">
            <Heading as="h2" size="section" className="mb-4">
              Still Need Help?
            </Heading>
            <p className="font-sans text-white/50 mb-8 max-w-lg mx-auto">
              If you couldn't find what you were looking for, our team is ready to assist you with any specific questions.
            </p>
            <Button asChild variant="primary" size="lg">
                    <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Container>
      </PageHero>
    </div>
  );
}
