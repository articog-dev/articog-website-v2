"use client";

import { toast } from "sonner";
import { ClaudeIcon, GeminiIcon } from "./AiIcons";
import { FOOTER_ICON_BUTTON, FOOTER_ICON_SIZE } from "./footer-icon-styles";
import { ARTICOG_AI_PROMPT } from "@/lib/ai-links";

interface AskAiLinkProps {
  href: string;
  label?: "Claude" | "Gemini";
}

export function AskAiLink({ href, label = "Gemini" }: AskAiLinkProps) {
  const accessibleLabel = `Ask ${label} about Articog`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(ARTICOG_AI_PROMPT);
      toast.success(`Prompt copied, paste it in ${label}`);
    } catch {
      // Clipboard access may be unavailable; allow the AI link to open normally.
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      title={accessibleLabel}
      onClick={() => { void copyPrompt(); }}
      className={FOOTER_ICON_BUTTON}
    >
      {label === "Claude" ? (
        <ClaudeIcon size={FOOTER_ICON_SIZE} />
      ) : (
        <GeminiIcon size={FOOTER_ICON_SIZE} />
      )}
    </a>
  );
}