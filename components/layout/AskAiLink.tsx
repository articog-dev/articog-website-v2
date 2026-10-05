"use client";

import { toast } from "sonner";
import { GeminiIcon } from "./AiIcons";
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
      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12]"
    >
      <GeminiIcon size={20} />
    </a>
  );
}