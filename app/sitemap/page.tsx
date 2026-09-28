import type { Metadata } from "next";

import { Link } from "@/components/ui/Link";
import { Container, Heading, PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: "Sitemap | Articog",
  description: "Explore Articog's company, service, trust, and creative production pages.",
  alternates: { canonical: "https://www.articog.com/sitemap" },
};

export default function SitemapPage() {
  const sitemapData = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Founder / Leadership", href: "/founder-leadership" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Press & Media", href: "/press" },
        { label: "Book a Demo", href: "/book-a-demo" },
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Services Hub", href: "/services" },
        { label: "AI Video Production", href: "/services/ai-video-production" },
        { label: "Ad Creative", href: "/services/ad-creative" },
        { label: "Social Creative", href: "/services/social-creative" },
        { label: "Product Visuals", href: "/services/product-visuals" },
        { label: "Audio", href: "/services/audio" },
        { label: "Creative Strategy", href: "/services/creative-strategy" },
        { label: "Post-Production", href: "/services/post-production" },
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Solutions Hub", href: "/solutions" },
        { label: "Monthly Subscription", href: "/solutions/monthly-creative-subscription" },
        { label: "Product Launch", href: "/solutions/product-launch" },
        { label: "Performance Marketing", href: "/solutions/performance-marketing" },
        { label: "Creative Team Extension", href: "/solutions/creative-team-overflow" },
        { label: "Enterprise Solutions", href: "/solutions/enterprise" },
      ]
    },
    {
      title: "Industries",
      links: [
        { label: "Industries Hub", href: "/industries" },
      ]
    },
    {
      title: "Work",
      links: [
        { label: "Portfolio Overview", href: "/work" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Help Center", href: "/help" },
      ]
    },
    {
      title: "Company Trust",
      links: [
        { label: "Why Articog", href: "/why-articog" },
        { label: "Production Economics", href: "/why-articog#production-economics" },
        { label: "How It Works", href: "/why-articog#how-it-works" },
        { label: "Trust & Security", href: "/why-articog#trust" },
        { label: "AI & IP Ownership", href: "/trust/ai-and-ip" },
        { label: "Security & Data Protection", href: "/trust/security" },
        { label: "Rights, Licensing & Ownership", href: "/trust/rights-licensing" },
        { label: "Data Handling & Retention", href: "/trust/data-handling" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/legal/terms-of-service" },
        { label: "Cookie Policy", href: "/legal/cookie-policy" },
        { label: "Accessibility", href: "/legal/accessibility" },
        { label: "Copyright", href: "/copyright" },
        { label: "Privacy Choices", href: "/privacy-choices" },
        { label: "California Privacy Notice", href: "/privacy/california" },
        { label: "Data Rights Request", href: "/privacy/request" },
      ]
    }
  ];

  return (
    <PageHero contentOnly className="flex-grow pb-20">
      <Container>
        <div className="max-w-4xl">
          <div className="mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">Sitemap</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {sitemapData.map((section) => (
              <div key={section.title} className="space-y-6">
                <Heading as="h2" size="label" className="border-b border-white/[0.08] pb-2 text-white/40">
                  {section.title}
                </Heading>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link 
                        to={link.href} 
                        className="type-body block w-fit text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </PageHero>
  );
}
