"use client";

import { toast } from "sonner";
import { GeminiIcon } from "./AiIcons";
import { FOOTER_ICON_BUTTON, FOOTER_ICON_SIZE } from "./footer-icon-styles";
import { ARTICOG_AI_PROMPT } from "@/lib/ai-links";

interface AskAiLinkProps {
  href: string;
}

export function AskAiLink({ href }: AskAiLinkProps) {
  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(ARTICOG_AI_PROMPT);
      toast.success("Prompt copied, paste it in Gemini");
    } catch {
      // Clipboard access may be unavailable; allow the Gemini link to open normally.
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ask Gemini about Articog"
      title="Ask Gemini about Articog"
      onClick={() => { void copyPrompt(); }}
      className={FOOTER_ICON_BUTTON}
    >
      <GeminiIcon size={FOOTER_ICON_SIZE} />
    </a>
  );
}