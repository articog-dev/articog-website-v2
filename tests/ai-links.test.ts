import { describe, expect, it } from "vitest";
import { ARTICOG_AI_PROMPT, aiLinks } from "../lib/ai-links";

describe("AI assistant links", () => {
  it("uses the expected platform URLs and encodes prompts where supported", () => {
    const expectedLinks = [
      { label: "ChatGPT", prefix: "https://chatgpt.com/?q=", hasPrompt: true },
      { label: "Claude", prefix: "https://claude.ai/new?q=", hasPrompt: true },
      { label: "Gemini", prefix: "https://gemini.google.com/app", hasPrompt: false },
      { label: "Perplexity", prefix: "https://www.perplexity.ai/search?q=", hasPrompt: true },
    ];
    const encodedPrompt = encodeURIComponent(ARTICOG_AI_PROMPT);

    expect(aiLinks).toHaveLength(expectedLinks.length);
    expect(aiLinks.map(({ label }) => label)).toEqual(expectedLinks.map(({ label }) => label));

    aiLinks.forEach(({ href }, index) => {
      const expected = expectedLinks[index];
      expect(href).toBe(expected.hasPrompt ? `${expected.prefix}${encodedPrompt}` : expected.prefix);
      expect(new URL(href).searchParams.get("q")).toBe(expected.hasPrompt ? ARTICOG_AI_PROMPT : null);
    });
  });
});