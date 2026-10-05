export type FounderProfile = {
  slug: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  circular?: boolean;
  roleLines: string[];
  metaLines?: string[];
  paragraphs: string[];
  sections: {
    title: string;
    paragraphs?: string[];
    items?: string[];
  }[];
  linkedin: string;
};

export const founders: FounderProfile[] = [
  {
    slug: "sai-teja-inampudi",
    name: "Sai Teja Inampudi",
    imageSrc: "/sai-teja-inampudi.png",
    imageAlt: "Sai Teja Inampudi",
    roleLines: [
      "CEO & Founder, Articog, AI-Native Film & Production Company",
      "Co-Founder, AFIN (AI Film India Network)",
    ],
    paragraphs: [
      "Sai Teja Inampudi is the CEO & Founder of Articog, an AI-native film and production company building next-generation creative workflows for brands, agencies, and marketing teams. He is also the Co-Founder of AFIN (AI Film India Network), a community bringing together AI filmmakers and creative professionals. He works at the intersection of generative AI, filmmaking, creative direction, visual storytelling, and technology, with a focus on transforming how commercials, brand films, product content, and cinematic experiences are produced.",
    ],
    sections: [
      {
        title: "Experience",
        paragraphs: [
          "Sai Teja has a multidisciplinary background across AI filmmaking, creative technology, visual design, video production, editing, UI/UX, and entrepreneurship. At Articog, he leads the development of AI-native production pipelines combining generative AI with human creative direction, storytelling, editing, sound, and post-production. His experience also includes leadership in technology and creative communities, cultural production, startup projects, and team building.",
        ],
      },
      {
        title: "Core Areas",
        paragraphs: [
          "AI Filmmaking • Generative AI • Creative Direction • Brand & Commercial Films • AI Video Production • Visual Storytelling • Creative Technology • Video Editing & Post-Production • UI/UX & Visual Design • Startup Leadership • Creative Production Workflows",
        ],
      },
    ],
    linkedin: "https://www.linkedin.com/in/-saitejainampudi/",
  },
  {
    slug: "dr-harika-govada",
    name: "Dr. Harika Govada",
    imageSrc: "/harika-govada.png.png",
    imageAlt: "Dr. Harika Govada",
    circular: true,
    roleLines: [
      "MD & Co-Founder, Articog | Driving Business Growth & Client Success in AI-Led Creative Production",
    ],
    paragraphs: [
      "Dr. Harika Govada is the Managing Director and Co-Founder of Articog, where she leads business development, client management, and strategic growth. Passionate about building AI-led creative production systems, she specializes in engaging with clients to identify their core challenges and delivering sharp, scalable, and automated creative solutions. By bridging the gap between innovative technology and real-world brand storytelling, Harika ensures that Articog’s clients achieve measurable business impact.",
      "Her leadership is rooted in a decade-long track record of operational excellence and business scaling. At Govada Creations, she grew from an intern in 2013 to Vice President, mastering every facet of the business from coordination and social media direction to high-level strategic execution. This hands-on journey shaped her core business philosophy: keep things simple, sharp, and fiercely focused on execution.",
      "Uniquely equipped with a medical degree (MBBS) and a deep, ongoing interest in the intersection of the medical and business fields, Harika brings a physician's level of analytical problem-solving to the boardroom. This rare blend of clinical discipline and entrepreneurial vision allows her to navigate complex client portfolios and drive sustainable customer acquisition with precision and empathy.",
    ],
    sections: [],
    linkedin: "https://www.linkedin.com/in/dr-harika-govada/",
  },
];

export function getFounderBySlug(slug: string) {
  return founders.find((founder) => founder.slug === slug);
}
