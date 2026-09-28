"use client";

import { getImageProps } from "next/image";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Button, Container, Section, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";

type IndustryDetail = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  positioning: string;
  considerations: Array<{ title: string; description: string }>;
  serviceLinks?: Array<{ label: string; href: string }>;
  faqs?: Array<{ question: string; answer: string }>;
};

const industryDetails: IndustryDetail[] = [
  {
    id: "dtc-ecommerce",
    title: "DTC & E-commerce",
    image: "https://media.articog.com/images/industries/hf_20260824_113929_29d338fa-48bb-42e7-a9b7-3df9b4f9f696.png",
    imageAlt: "DTC and E-commerce creative production",
    positioning: "More product ads, visuals and social content with less repeated production.",
    considerations: [
      { title: "Creative Fatigue", description: "Keep fresh variants moving through the funnel so audiences do not see the same creative for too long." },
      { title: "Production Pressure", description: "Scale output without letting production costs and studio logistics constrain campaign velocity." },
      { title: "Platform Saturation", description: "Adapt assets to the formats and placements where shoppers discover and compare products." },
      { title: "Performance Focus", description: "Use structured iteration and conversion-informed creative to improve the next round of assets." },
    ],
    serviceLinks: [
      { label: "Ad Creative", href: "/services/ad-creative" },
      { label: "Product Visuals", href: "/services/product-visuals" },
    ],
  },
  {
    id: "saas-technology",
    title: "SaaS & Technology",
    image: "https://media.articog.com/images/industries/hf_20260821_140424_ce9065bf-18b5-4ced-b351-d15c768fa9ef.png",
    imageAlt: "SaaS and technology creative production",
    positioning: "Accurate UI and clear storytelling for products whose value can be difficult to explain at a glance.",
    considerations: [
      { title: "Abstract Value Propositions", description: "Turn complex software benefits into clear stories that prospects can understand quickly." },
      { title: "Product Updates", description: "Keep launch, feature, and release communications aligned with the product as it evolves." },
      { title: "UI Accuracy", description: "Represent the actual product interface rather than relying on generic mockups." },
      { title: "Acquisition Costs", description: "Create more testable, channel-ready creative for acquisition and conversion campaigns." },
    ],
    serviceLinks: [
      { label: "AI Video Production", href: "/services/ai-video-production" },
      { label: "Performance Marketing", href: "/solutions/performance-marketing" },
    ],
  },
  {
    id: "consumer-electronics",
    title: "Consumer Electronics",
    image: "https://media.articog.com/images/industries/hf_20260821_140506_857b5698-f96f-4c82-a82a-30b58ef048af.png",
    imageAlt: "Consumer electronics creative production",
    positioning: "Product films and feature stories produced faster with AI.",
    considerations: [
      { title: "Product Accuracy", description: "Keep form, materials, color, labeling, and technical details faithful to the real product." },
      { title: "Feature Complexity", description: "Show how features work through clear product storytelling and visual explanation." },
      { title: "Beyond Studio Photography", description: "Create controlled product and lifestyle scenes without relying on a physical set for every variation." },
      { title: "Iteration Speed", description: "Update visual systems quickly as products, configurations, and campaigns change." },
    ],
    serviceLinks: [{ label: "Product Visuals", href: "/services/product-visuals" }],
  },
  {
    id: "beauty-skincare",
    title: "Beauty & Skincare",
    image: "https://media.articog.com/images/industries/hf_20260821_065459_75e8a226-bee0-4740-bcc4-75bad6fd3f96.png",
    imageAlt: "Beauty and skincare creative production",
    positioning: "Product stories, visuals and monthly campaign content with lower shoot dependency.",
    considerations: [
      { title: "Premium Positioning", description: "Build polished visual worlds that support the tone and aspiration of the brand." },
      { title: "Scalable Production", description: "Extend product and campaign imagery across a larger content calendar without repeating one treatment." },
      { title: "Rapid Iteration", description: "Move quickly through concepts, formats, and seasonal creative as the market changes." },
      { title: "Localization", description: "Adapt messaging and visual treatments for new markets while protecting the core brand system." },
    ],
    serviceLinks: [
      { label: "Product Visuals", href: "/services/product-visuals" },
      { label: "Social Creative", href: "/services/social-creative" },
    ],
  },
  {
    id: "automotive-mobility",
    title: "Automotive & Mobility",
    image: "https://media.articog.com/images/industries/hf_20260820_141918_ca92d85c-8d99-49d9-b1d3-8074f1781fe1.png",
    imageAlt: "Automotive and mobility creative production",
    positioning: "Cinematic vehicle films and marketing visuals produced with careful attention to accuracy and compliance.",
    considerations: [
      { title: "Vehicle Fidelity", description: "Represent the actual model, color, trim, badging, and features accurately." },
      { title: "Regional Variants", description: "Match local specifications and market requirements across vehicle and campaign versions." },
      { title: "Safety & Compliance", description: "Avoid unsafe driving depictions and review performance claims against approved documentation." },
      { title: "Launch & Retail Use Cases", description: "Create launch films, feature showcases, and localized dealership marketing assets." },
    ],
    serviceLinks: [{ label: "AI Video Production", href: "/services/ai-video-production" }],
    faqs: [
      { question: "Can vehicle details be reviewed before delivery?", answer: "Yes. Vehicle model, color, features, regional specifications, and performance claims should be reviewed against approved documentation before delivery." },
      { question: "How are safety concerns handled?", answer: "The production approach avoids unsafe driving behavior and traffic-law violations in the creative." },
    ],
  },
  {
    id: "food-beverage",
    title: "Food & Beverage",
    image: "https://media.articog.com/images/industries/hf_20260824_074616_9560ae97-37a1-45ab-82dc-cb6087d9e2f6.png",
    imageAlt: "Food and beverage creative production",
    positioning: "Product visuals and seasonal campaigns that make food and beverage products consistent, appetizing, and ready to scale.",
    considerations: [
      { title: "Visual Variation", description: "Explore appetizing scenes, serving moments, and campaign treatments without repeating one setup." },
      { title: "Seasonal Speed", description: "Move from brief to timely seasonal and promotional creative with less production overhead." },
      { title: "SKU Consistency", description: "Keep packaging, product identity, and variants consistent across a campaign system." },
      { title: "Channel-Ready Assets", description: "Prepare product visuals and video for paid, organic, retail, and launch channels." },
    ],
    serviceLinks: [
      { label: "Product Visuals", href: "/services/product-visuals" },
      { label: "AI Video Production", href: "/services/ai-video-production" },
    ],
    faqs: [
      { question: "Can seasonal campaigns be produced quickly?", answer: "The AI-native workflow supports seasonal and promotional iteration while preserving product consistency." },
      { question: "How is packaging accuracy handled?", answer: "Actual product references are used to maintain accurate packaging, product identity, and SKU representation." },
    ],
  },
  {
    id: "fashion-lifestyle",
    title: "Fashion & Lifestyle",
    image: "https://media.articog.com/images/industries/hf_20260818_214821_48f2e6b1-ba70-44f8-ad42-6be016116cce.png",
    imageAlt: "Fashion and lifestyle creative production",
    positioning: "Faster monthly campaign and social content with less traditional production.",
    considerations: [
      { title: "Trend Speed", description: "Respond to cultural and platform moments without rebuilding every campaign from scratch." },
      { title: "Content Volume", description: "Keep social and campaign channels active with a repeatable stream of relevant creative." },
      { title: "Aesthetic Consistency", description: "Protect the visual language of the brand across changing concepts, formats, and collections." },
      { title: "Product & Talent Fidelity", description: "Maintain product detail and responsible rights handling for generated talent and environments." },
    ],
    serviceLinks: [
      { label: "Social Creative", href: "/services/social-creative" },
      { label: "Product Visuals", href: "/services/product-visuals" },
    ],
    faqs: [
      { question: "Can content be adapted for social platforms?", answer: "Yes. Campaign visuals can be translated into platform specific social formats, including short form video and cutdowns." },
      { question: "How is brand consistency maintained?", answer: "Creative direction, product references, and visual systems are carried through each concept and delivery format." },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    image: "https://media.articog.com/images/industries/hf_20260820_235708_42e28d52-6747-4770-9165-759f885b31e9.png",
    imageAlt: "Real estate creative production",
    positioning: "Cinematic property stories with reduced physical production where suitable.",
    considerations: [
      { title: "Asset Scarcity", description: "Build compelling property narratives when photography, footage, or finished spaces are limited." },
      { title: "Geographic Constraints", description: "Create visual coverage for properties and developments that are difficult to access or not yet complete." },
      { title: "Emotional Selling", description: "Use cinematic storytelling to communicate lifestyle, atmosphere, and the experience of a place." },
      { title: "Property Accuracy", description: "Disclose conceptual visualization and review location, project, and marketing claims for accuracy." },
    ],
    serviceLinks: [{ label: "AI Video Production", href: "/services/ai-video-production" }],
  },
  {
    id: "additional-applications",
    title: "Additional Industry Applications",
    image: "https://media.articog.com/images/industries/hf_20260824_093331_32e45f5b-915d-4fa8-850b-6d53f87f3d3d.png",
    imageAlt: "Additional industry creative applications",
    positioning: "Additional vertical considerations can shape production, from product fidelity to localization and booking-focused assets.",
    considerations: [
      { title: "Consumer Goods", description: "Photorealistic product rendering, SKU-scale output, seasonal pivots, and performance-focused testing." },
      { title: "Gaming & Apps", description: "Cinematic teasers, creator-style user acquisition ads, rapid hook and visual testing, and multi-platform mastering." },
      { title: "Luxury Fashion", description: "Cinematic lookbooks, product and textile fidelity, synthetic-talent rights policy, and high-end visual standards." },
      { title: "Travel & Hospitality", description: "Destination content, property tours, multilingual adaptation, and booking-focused advertising." },
    ],
  },
];

const IMAGE_WIDTH = 900;
const IMAGE_HEIGHT = 1200;
const IMAGE_SIZES = "(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 38vw, 490px";

export function IndustryDetails() {
  const [activeId, setActiveId] = useState(industryDetails[0].id);
  const [scrollRequest, setScrollRequest] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefetchedIds = useRef(new Set<string>());

  const validIndustryId = (id: string | null) =>
    id && industryDetails.some((industry) => industry.id === id) ? id : null;

  const scrollActiveTabIntoView = useCallback((id: string) => {
    const tab = tabRefs.current[industryDetails.findIndex((industry) => industry.id === id)];
    tab?.scrollIntoView({ block: "nearest", inline: "center" });
  }, []);

  const selectIndustry = useCallback((id: string, updateHash = true) => {
    setActiveId(id);
    setHasInteracted(true);
    if (updateHash && window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
    const panel = document.getElementById(id);
    if (panel && panel.getBoundingClientRect().top < 100) {
      setScrollRequest((current) => current + 1);
    }
    scrollActiveTabIntoView(id);
  }, [scrollActiveTabIntoView]);

  useEffect(() => {
    const applyLocation = () => {
      const id = validIndustryId(window.location.hash.slice(1));
      if (id) {
        setActiveId(id);
        setScrollRequest((current) => current + 1);
      }
    };
    const handleDocumentClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor || new URL(anchor.href, window.location.href).pathname !== window.location.pathname) return;
      const id = validIndustryId(new URL(anchor.href, window.location.href).hash.slice(1));
      if (id) selectIndustry(id, false);
    };

    applyLocation();
    window.addEventListener("hashchange", applyLocation);
    window.addEventListener("popstate", applyLocation);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("hashchange", applyLocation);
      window.removeEventListener("popstate", applyLocation);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [selectIndustry]);

  useEffect(() => {
    if (!scrollRequest) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(activeId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeId, scrollRequest]);

  const prefetchImage = (industry: IndustryDetail) => {
    if (prefetchedIds.current.has(industry.id)) return;
    prefetchedIds.current.add(industry.id);
    const { props } = getImageProps({
      src: industry.image,
      alt: industry.imageAlt,
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      sizes: IMAGE_SIZES,
    });
    const image = new window.Image();
    image.sizes = props.sizes ?? IMAGE_SIZES;
    image.srcset = props.srcSet ?? "";
    image.src = props.src;
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "Home" ? 0 : event.key === "End" ? industryDetails.length - 1 : index + (event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1);
    const nextIndex = (direction + industryDetails.length) % industryDetails.length;
    const nextId = industryDetails[nextIndex].id;
    selectIndustry(nextId);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <Section size="md" className="border-t border-white/10 pt-0 text-left">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[16rem_minmax(0,1fr)]">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Industries"
            className="sticky top-[100px] z-30 relative -mx-[var(--spacing-page-x)] mb-10 flex gap-2 overflow-x-auto border-y border-white/10 bg-black/90 px-[var(--spacing-page-x)] py-3 backdrop-blur xl:top-28 xl:mx-0 xl:mb-0 xl:flex-col xl:gap-0 xl:self-start xl:overflow-visible xl:border-y-0 xl:border-l xl:border-white/20 xl:bg-transparent xl:p-0 xl:pl-0"
          >
            {industryDetails.map((industry, index) => {
              const isActive = activeId === industry.id;
              return (
                <button
                  key={industry.id}
                  ref={(tab) => { tabRefs.current[index] = tab; }}
                  id={`tab-${industry.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={industry.id}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectIndustry(industry.id)}
                  onMouseEnter={() => prefetchImage(industry)}
                  onFocus={() => prefetchImage(industry)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white xl:-ml-px xl:w-full xl:rounded-none xl:border-y-0 xl:border-r-0 xl:border-l-2 xl:px-4 xl:py-3 xl:text-left ${
                    isActive ? "border-white bg-white text-black xl:bg-transparent xl:text-white" : "border-white/15 text-white/60 hover:text-white xl:border-transparent xl:hover:border-white/60"
                  }`}
                >
                  {industry.title}
                </button>
              );
            })}
          </div>

          <div className="min-w-0 space-y-16">
            {industryDetails.map((industry, index) => {
              const isActive = activeId === industry.id;
              const eagerImage = index === 0;
              return (
                <section
                  key={industry.id}
                  id={industry.id}
                  role="tabpanel"
                  aria-labelledby={`tab-${industry.id}`}
                  hidden={!isActive}
                  className={`scroll-mt-40 xl:scroll-mt-28 md:grid md:grid-cols-[5fr_7fr] md:gap-10 ${hasInteracted ? "motion-safe:animate-fade-in" : ""}`}
                >
                  <div className="relative mb-8 aspect-[4/3] self-start rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-1 md:sticky md:top-28 md:mb-0 md:aspect-[3/4]">
                    <Image
                      src={industry.image}
                      alt={industry.imageAlt}
                      fill
                      sizes={IMAGE_SIZES}
                      loading={eagerImage ? "eager" : "lazy"}
                      fetchPriority={eagerImage ? "high" : undefined}
                      className="rounded-xl object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <Heading as="h2" size="card" className="type-h3 text-[1.75rem] leading-tight text-white md:text-[2rem]">
                      {industry.title}
                    </Heading>
                    <p className="mt-4 max-w-[46ch] type-body-lg text-white/70">{industry.positioning}</p>

                    <h3 className="mt-10 type-label text-white/60">Key considerations</h3>
                    <dl className="mt-4 divide-y divide-white/10">
                      {industry.considerations.map((consideration) => (
                        <div key={consideration.title} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6">
                          <dt className="type-body font-medium text-white">{consideration.title}</dt>
                          <dd className="type-small leading-relaxed text-white/55">{consideration.description}</dd>
                        </div>
                      ))}
                    </dl>

                    {industry.serviceLinks ? (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {industry.serviceLinks.map((service) => (
                          <Button key={service.href} asChild variant="secondary" size="md">
                            <Link href={service.href}>{service.label}</Link>
                          </Button>
                        ))}
                      </div>
                    ) : null}

                    {industry.faqs ? (
                      <div className="mt-10 border-t border-white/10 pt-6">
                        <h3 className="type-label text-white/60">Frequently asked questions</h3>
                        <div className="mt-4 divide-y divide-white/10">
                          {industry.faqs.map((faq) => (
                            <details key={faq.question} className="group py-4">
                              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left type-body font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                                {faq.question}
                                <Plus className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                              </summary>
                              <p className="mt-3 max-w-[60ch] type-small leading-relaxed text-white/55">{faq.answer}</p>
                            </details>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
