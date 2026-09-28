import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { Link } from "@/components/ui/Link";
import { Container, Heading, PageHero } from "@/components/ui";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { YouTubeEmbed } from "@/components/blog/YouTubeEmbed";
import { getBlogPostBySlug, getNativeBlogPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

function formatDate(dateString: string) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));

  return new Date(dateString).getFullYear() < new Date().getFullYear()
    ? `Archive · ${formattedDate}`
    : formattedDate;
}

export function generateStaticParams() {
  return getNativeBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post | Articog",
    };
  }

  const canonicalUrl = post.canonicalUrl;

  return {
    title: `${post.title} | Articog Blog`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Articog",
      logo: {
        "@type": "ImageObject",
        url: "https://www.articog.com/articog-logo-white.png",
      },
    },
    mainEntityOfPage: `https://www.articog.com/blog/${post.slug}`,
  };

  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageHero contentOnly>
        <Container className="max-w-4xl">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-sans text-white/60 transition-colors hover:text-white"
            >
              ← Back to blog
            </Link>
          </div>

          <div className="text-center mb-[var(--spacing-title-gap)]">
            <Heading as="h1" size="hero" className="text-white">
              {post.title}
            </Heading>
            <div className="mt-[var(--gap-heading-to-text)] flex flex-wrap items-center gap-4 type-small text-white/55">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="mb-12 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-[360px] w-full object-cover md:h-[480px]"
            />
          </div>

          <article className="mx-auto max-w-3xl">
            <div className="space-y-8 text-white/80">
              {post.content.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={`${block.type}-${index}`}
                      className="type-body leading-8 md:text-lg"
                    >
                      {block.value}
                    </p>
                  );
                }

                if (block.type === "heading") {
                  if (block.level === 3) {
                    return (
                      <h3
                        key={`${block.type}-${index}`}
                        className="mt-8 font-display font-semibold text-white"
                      >
                        {block.value}
                      </h3>
                    );
                  }

                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      className="mt-8 font-display font-semibold text-white"
                    >
                      {block.value}
                    </h2>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={`${block.type}-${index}`}
                      className="border-l border-white/15 pl-5 type-body-lg italic text-white/70 md:text-xl"
                    >
                      “{block.value}”
                    </blockquote>
                  );
                }

                if (block.type === "youtube") {
                  return (
                    <div key={`${block.type}-${index}`} className="pt-2">
                      <YouTubeEmbed url={block.youtubeUrl} title={post.title} />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </article>

          <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
        </Container>
      </PageHero>
    </div>
  );
}
