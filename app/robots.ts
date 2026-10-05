import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
      ...[
        "GPTBot",
        "OAI-SearchBot",
        "ChatGPT-User",
        "ClaudeBot",
        "Claude-User",
        "Claude-SearchBot",
        "anthropic-ai",
        "PerplexityBot",
        "Perplexity-User",
        "Google-Extended",
        "Googlebot",
        "Bingbot",
      ].map((userAgent) => ({
        userAgent,
        allow: ["/"],
        disallow: ["/api/", "/thank-you"],
      })),
    ],
    sitemap: "https://www.articog.com/sitemap.xml",
  };
}