import { describe, expect, it } from "vitest";
import { ARTICOG_AI_PROMPT, aiLinks } from "../lib/ai-links";

describe("AI assistant links", () => {
  it("uses the expected platform URLs with the prompt encoded in q", () => {
    const expectedLinks = [
      ["ChatGPT", "https://chatgpt.com/?q="],
      ["Claude", "https://claude.ai/new?q="],
      ["Google (AI Mode)", "https://www.google.com/search?udm=50&q="],
      ["Perplexity", "https://www.perplexity.ai/search?q="],
    ];
    const encodedPrompt = encodeURIComponent(ARTICOG_AI_PROMPT);

    expect(aiLinks).toHaveLength(expectedLinks.length);
    expect(aiLinks.map(({ label }) => label)).toEqual(expectedLinks.map(([label]) => label));

    aiLinks.forEach(({ href }, index) => {
      expect(href).toBe(`${expectedLinks[index][1]}${encodedPrompt}`);
      expect(new URL(href).searchParams.get("q")).toBe(ARTICOG_AI_PROMPT);
    });
  });
});