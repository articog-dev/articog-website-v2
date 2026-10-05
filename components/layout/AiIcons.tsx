interface AiIconProps {
  size?: number;
}

function MaskIcon({ size, src }: { size: number; src: string }) {
  return (
    <span
      aria-hidden="true"
      className="block bg-current"
      style={{
        width: size,
        height: size,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export function ChatGPTIcon({ size = 16 }: AiIconProps) {
  return <MaskIcon size={size} src="/ai-icons/chatgpt.svg" />;
}

export function ClaudeIcon({ size = 16 }: AiIconProps) {
  return <MaskIcon size={size} src="/ai-icons/claude.svg" />;
}

export function GeminiIcon({ size = 16 }: AiIconProps) {
  return <MaskIcon size={size} src="/ai-icons/gemini.svg" />;
}

export function PerplexityIcon({ size = 16 }: AiIconProps) {
  return <MaskIcon size={size} src="/ai-icons/perplexity.svg" />;
}
