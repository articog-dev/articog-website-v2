interface AiIconProps {
  size?: number;
}

export function ChatGPTIcon({ size = 16 }: AiIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5a4.2 4.2 0 0 0-3.8 2.4 4.3 4.3 0 0 0-5.3 4.2c0 .5.1 1 .3 1.5a4.2 4.2 0 0 0 1.6 7.2 4.3 4.3 0 0 0 4.5 4.1 4.2 4.2 0 0 0 2.7-1 4.2 4.2 0 0 0 6.5-3.1 4.2 4.2 0 0 0 2.1-6.9 4.2 4.2 0 0 0-3.5-6.6 4.3 4.3 0 0 0-5.1-1.8Zm-2.1 4.1 2.7-1.6a2.1 2.1 0 0 1 2.9.8l.4.7-5.3 3.1a1 1 0 0 0-.5.9v5.8l-1.4-.8V9a1 1 0 0 0-.5-.9L5.5 6.5a2.1 2.1 0 0 1 2.9-.8l1.5.9Zm-4.3 1.7 2.6 1.5v1.6l-3.9-2.2.3-.8a2.1 2.1 0 0 1 1-.1Zm11.6 1.3 2.2 1.3a2.1 2.1 0 0 1 .8 2.9l-.4.7-5.3-3.1a1 1 0 0 0-1 0l-5 2.9v-1.6l4.6-2.7a1 1 0 0 0 .5-.9V7.7l1.4.8v.2a1 1 0 0 0 .5.9l1.7 1Zm-9.9 8.2-2.2 1.3a2.1 2.1 0 0 1-2.9-.8l-.4-.7 5.3-3.1a1 1 0 0 0 .5-.9v-5.8l1.4.8v5.4a1 1 0 0 0 .5.9l3.3 1.9-1.4.8-3.2-1.8a1 1 0 0 0-1 0Zm3.6 1.1-1.4-.8 3.9-2.2a1 1 0 0 0 .5-.9v-3.8l1.4.8v3.4a1 1 0 0 0 .5.9l1.2.7a2.1 2.1 0 0 1-2.9.8l-3.2-1.8Zm5.4-3.4v-1.6l1.4-.8a2.1 2.1 0 0 1-1.4 2.4Z" />
    </svg>
  );
}

export function ClaudeIcon({ size = 16 }: AiIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 21 10.5 3h2.4L19 21h-2.8l-1.3-4H8l-1.4 4H4Zm4.8-6.3h5.3l-2.6-7.8-2.7 7.8Zm10.1-9.9 1.9 1.1-6.7 11.6-1.9-1.1 6.7-11.6Z" />
    </svg>
  );
}

export function GeminiIcon({ size = 16 }: AiIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5c1.4 5.7 4.8 9.1 10.5 10.5-5.7 1.4-9.1 4.8-10.5 10.5C10.6 16.8 7.2 13.4 1.5 12 7.2 10.6 10.6 7.2 12 1.5Z" />
    </svg>
  );
}

export function PerplexityIcon({ size = 16 }: AiIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 2h2v5.2l3.6-3.6L18 5l-4.3 4.3h3.8v5.4L22 10v2.8l-4.5 4.5H13v4.7h-2v-4.7H6.5L2 12.8V10l4.5 4.7V9.3h3.8L6 5l1.4-1.4L11 7.2V2Zm-2.5 9.3v4h7v-4h-7Z" />
    </svg>
  );
}