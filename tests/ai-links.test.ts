import { describe, expect, it, vi } from "vitest";
import { AskAiLink } from "../components/layout/AskAiLink";
import { ARTICOG_AI_PROMPT, aiLinks } from "../lib/ai-links";

describe("AI assistant links", () => {
  it("uses the expected platform URLs and encodes prompts where supported", () => {
    const expectedLinks = [
      { label: "ChatGPT", prefix: "https://chatgpt.com/?q=", hasPrompt: true },
      { label: "Claude", prefix: "https://claude.ai/new", hasPrompt: false },
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

  it("copies the shared Articog prompt when Claude is clicked and opens the Claude app without a q parameter", async () => {
    const claudeLink = aiLinks.find(({ label }) => label === "Claude");

    expect(claudeLink).toBeDefined();
    expect(claudeLink?.href).toBe("https://claude.ai/new");
    expect(claudeLink?.href.includes("?q=")).toBe(false);

    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis, "navigator", {
      value: { clipboard: { writeText } },
      configurable: true,
    });

    const element = AskAiLink({ href: claudeLink!.href });
    expect(element.props.target).toBe("_blank");
    expect(element.props.rel).toBe("noopener noreferrer");

    element.props.onClick();
    await Promise.resolve();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith(ARTICOG_AI_PROMPT);
  });
});