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
      "CEO and Founder, Articog | Founder, AI Film India Network (AFIN) | Bridging Generative AI and Visual Storytelling",
    ],
    paragraphs: [
      "Sai Teja Inampudi is the CEO and Founder of Articog, a pioneering AI native film and creative production company that is fundamentally rewriting how modern marketing teams and growth stage brands scale their creative output.",
      "His journey as a builder and leader began early. Driven by a strong interest in entrepreneurship, he founded an NGO called Aara Learn during his college days, taking on multiple organizing and leadership roles. This early entrepreneurial drive naturally merged with his continuous, lifelong passion for technology and traditional filmmaking.",
      "Operating at the dynamic intersection of generative AI and the visual arts, Sai Teja analyzed a critical bottleneck in the industry. He recognized that brands could drastically improve their creative output by integrating new technology directly into their workflows, and he started building Articog to solve this exact problem.",
      "Today, he leads the development of next generation production pipelines that fuse cutting edge AI with expert human storytelling, editing, and sound design. Under his leadership, Articog acts as a dedicated AI production studio, enabling brands to produce commercials, brand films, and social content at an unprecedented pace, moving from brief to deliverable in a matter of days.",
      "Beyond his work at Articog, Sai Teja is the Co Founder of the AI Film India Network (AFIN), a thriving community dedicated to uniting AI filmmakers and creative professionals. His commitment to community building ensures that India remains at the forefront of the global creative AI industry.",
      "Sai Teja brings a deeply multidisciplinary background to his leadership, encompassing creative technology, UI/UX and visual design, video editing, and entrepreneurship. Because his technical acumen is built on a foundational love for film, he is uniquely equipped to design workflows that eliminate production bottlenecks while fiercely protecting a brand's visual identity, story arc, and final cinematic quality. Whether he is shaping the creative direction for a complex product launch or guiding startup teams, Sai Teja is defined by his relentless curiosity and his drive to build the future of cinematic experiences.",
    ],
    sections: [],
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
