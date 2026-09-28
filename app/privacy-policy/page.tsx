import type { Metadata } from "next";
import { Heading, PageHero } from "@/components/ui";
import { ChevronDown, ChevronUp } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/privacy-policy" },
  title: "Privacy Policy | Articog",
  description:
    "How Articog collects, uses, shares, retains, and protects personal information when you use our website and services.",
};

const PRIVACY_EMAIL = "info@articog.com";
const EFFECTIVE_DATE = "August 2026";
const LAST_UPDATED = "August 2026";

type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; title?: string; items: string[] };

type PolicySection = {
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

const sections: PolicySection[] = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    blocks: [
      {
        kind: "p",
        text: "This Privacy Policy explains how Articog Tech LLP (" +
          "\"Articog\", \"we\", \"us\", or \"our\") collects, uses, shares, " +
          "retains, and protects personal information when you visit our website, " +
          "submit a contact or enquiry form, request a demo, communicate with us, " +
          "or otherwise use our website and related services.",
      },
      {
        kind: "p",
        text: "Articog is committed to handling personal information responsibly " +
          "and taking reasonable measures to protect it against unauthorized access, " +
          "loss, misuse, or disclosure.",
      },
      {
        kind: "p",
        text: "This Privacy Policy is intended for website visitors, clients, " +
          "customers, prospects, and other individuals who interact with Articog " +
          "through our customer facing website and services.",
      },
    ],
  },

  {
    id: "information-we-collect",
    number: "2",
    title: "Information We Collect",
    blocks: [
      {
        kind: "p",
        text: "The information we collect depends on how you interact with Articog " +
          "and the services you use.",
      },
      {
        kind: "list",
        title: "Information you provide to us",
        items: [
          "Name and contact information",
          "Work email address",
          "Company name",
          "Job title or role",
          "Service interests",
          "Project requirements",
          "Budget and timeline information",
          "Information submitted through contact, enquiry, or demo-request forms",
          "Information you provide when communicating with us",
        ],
      },
      {
        kind: "list",
        title: "Information collected automatically",
        items: [
          "Device and browser information",
          "IP address",
          "Website usage information",
          "Cookies and similar technologies",
          "Technical and security information relating to website usage",
        ],
      },
      {
        kind: "p",
        text: "You may choose not to provide optional information. However, if " +
          "information is necessary for us to respond to an enquiry, provide a " +
          "requested service, or complete a requested interaction, we may not be " +
          "able to do so without that information.",
      },
    ],
  },

  {
    id: "how-we-use-information",
    number: "3",
    title: "How We Use Your Information",
    blocks: [
      {
        kind: "p",
        text: "We process personal information for purposes reasonably necessary " +
          "to operate our business, provide our services, communicate with users, " +
          "maintain website security, and comply with applicable law.",
      },
      {
        kind: "list",
        items: [
          "Respond to enquiries and requests",
          "Schedule and manage demo calls",
          "Provide requested services",
          "Communicate about Articog services and projects",
          "Manage client and prospective-client relationships",
          "Improve our website and user experience",
          "Understand website usage and performance",
          "Maintain website, system, and service security",
          "Prevent fraud, abuse, unauthorized access, or misuse",
          "Maintain business and operational records",
          "Comply with applicable legal and regulatory obligations",
          "Respond to lawful requests from government or other authorities",
        ],
      },
    ],
  },

  {
    id: "legal-basis",
    number: "4",
    title: "Legal Basis for Processing",
    blocks: [
      {
        kind: "p",
        text: "Depending on the circumstances and applicable law, Articog may process " +
          "personal information on the basis of your consent, where consent is the " +
          "applicable legal ground, and where processing is otherwise permitted or " +
          "required under applicable data-protection and other laws.",
      },
      {
        kind: "p",
        text: "Where processing is necessary to provide a service you request, " +
          "respond to an enquiry, protect our systems, comply with legal obligations, " +
          "or perform other lawful business activities, we may process the relevant " +
          "information for those purposes to the extent permitted by applicable law.",
      },
    ],
  },

  {
    id: "how-we-share-information",
    number: "5",
    title: "How We Share Information",
    blocks: [
      {
        kind: "p",
        text: "We may share personal information where reasonably necessary to " +
          "operate our website, provide services, manage business operations, " +
          "protect our systems, or comply with applicable law.",
      },
      {
        kind: "list",
        title: "Recipients may include",
        items: [
          "Authorized Articog personnel",
          "Hosting and cloud-service providers",
          "IT and technology service providers",
          "Communication and email service providers",
          "Analytics and website-performance providers",
          "Scheduling and demo providers",
          "Professional advisers and service providers",
          "Clients or project partners where necessary for authorized project access or delivery",
          "Government, statutory, law-enforcement, or judicial authorities where required by law",
        ],
      },
      {
        kind: "p",
        text: "We expect service providers and other recipients who process " +
          "information on our behalf to protect personal information appropriately " +
          "and to use it only for authorized purposes.",
      },
      {
        kind: "p",
        text: "Articog does not sell personal data. Any processing is handled " +
          "according to this Privacy Policy and applicable law.",
      },
    ],
  },

  {
    id: "cross-border-processing",
    number: "6",
    title: "Cross-Border Processing",
    blocks: [
      {
        kind: "p",
        text: "Articog may use technology providers or business systems that store " +
          "or process information outside India. Where personal information is " +
          "transferred or processed across borders, Articog will do so in accordance " +
          "with applicable data protection requirements and reasonable security safeguards.",
      },
    ],
  },

  {
    id: "cookies",
    number: "7",
    title: "Cookies and Tracking Technologies",
    blocks: [
      {
        kind: "p",
        text: "We and our service providers may use cookies and similar technologies " +
          "to support website functionality, understand website usage, measure " +
          "performance, maintain security, and support other legitimate purposes " +
          "where applicable.",
      },
      {
        kind: "p",
        text: "Most browsers allow you to manage, refuse, or delete cookies through " +
          "browser settings. Where applicable, Articog may also provide additional " +
          "cookie or privacy controls. Disabling certain cookies may affect website functionality.",
      },
    ],
  },

  {
    id: "data-retention",
    number: "8",
    title: "Data Retention",
    blocks: [
      {
        kind: "p",
        text: "Articog retains personal information only for as long as reasonably " +
          "necessary for the purposes for which it was collected, including service " +
          "delivery, business administration, legal and regulatory requirements, " +
          "record keeping, dispute resolution, and enforcement of agreements.",
      },
      {
        kind: "p",
        text: "Different categories of information may have different retention " +
          "periods depending on the purpose for which the information is maintained " +
          "and applicable legal or operational requirements.",
      },
      {
        kind: "p",
        text: "When personal information is no longer required, we take reasonable " +
          "steps to delete it or otherwise render it non-identifiable, subject to " +
          "applicable legal, regulatory, security, or legitimate business requirements.",
      },
    ],
  },

  {
    id: "data-security",
    number: "9",
    title: "Data Security",
    blocks: [
      {
        kind: "p",
        text: "Articog takes reasonable security measures designed to protect personal " +
          "information against unauthorized access, loss, misuse, alteration, or disclosure.",
      },
      {
        kind: "p",
        text: "Security measures may include appropriate technical, organizational, " +
          "access-control, and operational safeguards consistent with the nature of " +
          "the information and the risks involved.",
      },
      {
        kind: "p",
        text: "No method of transmission, storage, or processing is completely secure. " +
          "Accordingly, we cannot guarantee absolute security of information transmitted " +
          "to or from the website.",
      },
    ],
  },

  {
    id: "your-privacy-rights",
    number: "10",
    title: "Your Privacy Rights",
    blocks: [
      {
        kind: "p",
        text: "Depending on your location and applicable law, you may have rights " +
          "relating to your personal information.",
      },
      {
        kind: "list",
        items: [
          "Requesting access to information relating to you, where applicable",
          "Requesting correction of inaccurate information",
          "Requesting that outdated information be updated",
          "Requesting deletion or erasure where retention is no longer legally or operationally required",
          "Withdrawing consent where processing is based solely on consent",
          "Requesting grievance redressal",
        ],
      },
      {
        kind: "p",
        text: "The availability and scope of these rights may vary depending on " +
          "applicable law and your circumstances. We may need to verify your identity " +
          "before processing a privacy request.",
      },
      {
        kind: "p",
        text: `To submit a privacy request or grievance, contact us at ${PRIVACY_EMAIL}.`,
      },
    ],
  },

  {
    id: "data-breach",
    number: "11",
    title: "Data Breach",
    blocks: [
      {
        kind: "p",
        text: "If Articog becomes aware of a personal-data breach, we will take " +
          "reasonable measures to contain, investigate, and address the incident.",
      },
      {
        kind: "p",
        text: "Where notification is required under applicable law, Articog will " +
          "provide the relevant notifications in accordance with those requirements.",
      },
    ],
  },

  {
    id: "dpdp-alignment",
    number: "12",
    title: "Digital Personal Data Protection Act",
    blocks: [
      {
        kind: "p",
        text: "Articog's privacy practices are intended to align with the Digital " +
          "Personal Data Protection Act, 2023 and applicable rules, subject to their " +
          "phased commencement and any subsequent legal or regulatory changes.",
      },
      {
        kind: "p",
        text: "Where applicable, Articog will update its privacy practices and this " +
          "Privacy Policy to reflect material changes in applicable data-protection requirements.",
      },
    ],
  },

  {
    id: "california-privacy-rights",
    number: "13",
    title: "California Privacy Rights",
    blocks: [
      {
        kind: "p",
        text: "If you are a California resident, applicable California privacy laws " +
          "may provide you with additional rights regarding your personal information, " +
          "including rights relating to access, correction, deletion, and other applicable " +
          "privacy choices.",
      },
      {
        kind: "p",
        text: `To submit a California privacy request, contact us at ${PRIVACY_EMAIL}. ` +
          "We may need to verify your identity before processing the request. " +
          "Where permitted by applicable law, an authorized agent may submit a request on your behalf.",
      },
    ],
  },

  {
    id: "childrens-privacy",
    number: "14",
    title: "Children's Privacy",
    blocks: [
      {
        kind: "p",
        text: "The Articog website is intended primarily for a business audience and " +
          "is not directed to children. We do not knowingly collect personal information " +
          "from children where prohibited by applicable law.",
      },
      {
        kind: "p",
        text: "If you believe that a child has provided personal information to Articog, " +
          "please contact us so that we can review the matter and take appropriate action.",
      },
    ],
  },

  {
    id: "third-party-websites",
    number: "15",
    title: "Third-Party Websites and Services",
    blocks: [
      {
        kind: "p",
        text: "Our website may contain links to third-party websites, platforms, or " +
          "services that are not controlled by Articog. This Privacy Policy does not " +
          "apply to those third parties.",
      },
      {
        kind: "p",
        text: "We encourage you to review the privacy policies and terms of any third-party " +
          "website or service before providing personal information to them.",
      },
    ],
  },

  {
    id: "changes",
    number: "16",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        kind: "p",
        text: "Articog may update this Privacy Policy from time to time to reflect " +
          "changes to our services, privacy practices, technology, applicable law, " +
          "or regulatory requirements.",
      },
      {
        kind: "p",
        text: 'When we make changes, we will update the "Last Updated" date shown at ' +
          "the top of this page. We encourage you to review this Privacy Policy periodically.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <PageHero contentOnly>
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1060px]">
            <header className="mb-[var(--spacing-title-gap)]">
              <Heading as="h1" size="hero">
                Privacy Policy
              </Heading>

              <dl className="mt-[var(--gap-heading-to-text)] grid gap-8 border-t border-white/[0.08] pt-8 sm:grid-cols-2 sm:gap-16">
                <div className="min-w-0">
                  <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-safe">
                    Effective Date
                  </dt>

                  <dd className="mt-2 type-small text-white/70">
                    {EFFECTIVE_DATE}
                  </dd>
                </div>

                <div className="min-w-0">
                  <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-safe">
                    Last Updated
                  </dt>

                  <dd className="mt-2 type-small text-white/70">
                    {LAST_UPDATED}
                  </dd>
                </div>
              </dl>
            </header>

            <div className="flex flex-col">
              <section
                id="introduction"
                className="border-t border-white/[0.07] py-10 md:py-14"
              >
                <div className="min-w-0">
                  <div className="min-w-0">
                    <h2 className="mb-5 type-h3 text-white md:text-2xl">
                      Introduction
                    </h2>

                    <div className="flex flex-col gap-6">
                      {sections[0].blocks
                        .filter((block): block is Extract<Block, { kind: "p" }> => block.kind === "p")
                        .map((block, i) => (
                        <p
                          key={i}
                          className="max-w-[68ch] type-body leading-[1.75] text-white/60 md:text-base"
                        >
                          {block.text}
                        </p>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {sections.slice(1).map((section, index) => (
                <details
                  key={section.id}
                  id={section.id}
                  className="group border-t border-white/[0.07]"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-7 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:py-8 [&::-webkit-details-marker]:hidden">
                    <span
                      aria-hidden="true"
                      className="type-h4 tabular-nums text-accent"
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </span>

                    <h2 className="min-w-0 flex-1 type-h3 text-white md:text-2xl">
                      {section.title}
                    </h2>

                    <ChevronDown
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-white/50 group-open:hidden"
                    />
                    <ChevronUp
                      aria-hidden="true"
                      className="hidden h-5 w-5 shrink-0 text-white/50 group-open:block"
                    />
                  </summary>

                  <div className="grid gap-4 pb-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 md:pb-14">
                    <span aria-hidden="true" className="hidden md:block" />

                    <div className="min-w-0">
                      <div className="flex flex-col gap-6">
                        {section.blocks.map((block, i) =>
                          block.kind === "p" ? (
                            <p
                              key={i}
                              className="max-w-[68ch] type-body leading-[1.75] text-white/60 md:text-base"
                            >
                              {block.text}
                            </p>
                          ) : (
                            <div key={i}>
                              {block.title && (
                                <h3 className="type-label mb-3 text-white/45">
                                  {block.title}
                                </h3>
                              )}

                              <ul className="grid gap-2.5 sm:grid-cols-2">
                                {block.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex min-w-0 items-start gap-3 type-body leading-[1.6] text-white/60"
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent"
                                    />

                                    <span className="min-w-0">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </details>
              ))}

              <details
                id="contact-us"
                className="group border-t border-white/[0.07]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 py-7 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:py-8 [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden="true"
                    className="type-h4 tabular-nums text-accent"
                  >
                    16
                  </span>

                  <h2 className="min-w-0 flex-1 type-h3 text-white md:text-2xl">
                    Contact Us
                  </h2>

                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-white/50 group-open:hidden"
                  />
                  <ChevronUp
                    aria-hidden="true"
                    className="hidden h-5 w-5 shrink-0 text-white/50 group-open:block"
                  />
                </summary>

                <div className="grid gap-4 pb-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 md:pb-14">
                  <span aria-hidden="true" className="hidden md:block" />

                  <div className="min-w-0">

                    <p className="mb-8 max-w-[68ch] type-body leading-[1.75] text-white/60 md:text-base">
                      If you have questions about this Privacy Policy, want to
                      exercise an applicable privacy right, or have a privacy
                      grievance, please contact us.
                    </p>

                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
                      <h3 className="type-h4 text-white">
                        Privacy Questions
                      </h3>

                      <p className="mt-2 type-small text-white/50">
                        Articog Tech LLP
                      </p>

                      <p className="mt-1 type-small text-white/50">
                        Articog HQ, Plot No. 125, 1st Floor, Road No. 6, Venkat Rao Nagar
                        Colony, Kukatpally, Hyderabad, Telangana 500072
                      </p>

                      <p className="mt-4 min-w-0 break-words type-small text-white/60">
                        Email:{" "}
                        <a
                          href={`mailto:${PRIVACY_EMAIL}`}
                          className="text-white underline underline-offset-4 decoration-white/30 transition-colors hover:decoration-white"
                        >
                          {PRIVACY_EMAIL}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </PageHero>
    </div>
  );
}