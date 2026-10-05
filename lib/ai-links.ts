import {
  ChatGPTIcon,
  ClaudeIcon,
  GeminiIcon,
  PerplexityIcon,
} from "../components/layout/AiIcons";

export const ARTICOG_AI_PROMPT =
  "As a brand or marketing team looking for AI-native film and creative production, I want to understand Articog (articog.com). Summarize its services (AI video production, ad creative, social creative), value proposition, industries served, and how it supports brand campaigns and marketing outcomes.";

const q = encodeURIComponent(ARTICOG_AI_PROMPT);

export const aiLinks = [
  { label: "ChatGPT", href: `https://chatgpt.com/?q=${q}`, Icon: ChatGPTIcon },
  { label: "Claude", href: `https://claude.ai/new?q=${q}`, Icon: ClaudeIcon },
  {
    label: "Google (AI Mode)",
    href: `https://www.google.com/search?udm=50&q=${q}`,
    Icon: GeminiIcon,
  },
  {
    label: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${q}`,
    Icon: PerplexityIcon,
  },
];