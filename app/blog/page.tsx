import type { Metadata } from "next";

import { BlogFilterList } from "@/components/blog/BlogFilterList";
import { Container, PageHero } from "@/components/ui";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/blog" },
  title: "AI-Native Production Insights | Articog",
  description: "Insights on AI-native production, creative strategy, brand storytelling, and growth marketing for modern teams.",
};

export default function BlogPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageHero title="Blog" compact />
      <div>
        <Container>
          <BlogFilterList posts={blogPosts} />
        </Container>
      </div>
    </div>
  );
}
