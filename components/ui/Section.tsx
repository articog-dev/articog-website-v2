import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  size = "md",
  style,
}: SectionProps) {
  return (
    <Tag
      id={id}
      style={style}
      className={cn(
        "relative w-full",
        size === "sm" && "py-section-sm",
        size === "md" && "py-section",
        size === "lg" && "py-section-lg",
        className
      )}
    >
      {children}
    </Tag>
  );
}
