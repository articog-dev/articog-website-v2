import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Section } from "./Section";

type PageHeroProps = {
  title?: React.ReactNode;
  titleContent?: React.ReactNode;
  id?: string;
  breadcrumbs?: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  showcase?: React.ReactNode;
  children?: React.ReactNode;
  contentOnly?: boolean;
  compact?: boolean;
  className?: string;
  titleClassName?: string;
  titleBlockClassName?: string;
  containerClassName?: string;
};

export function PageHero({
  title,
  titleContent,
  id,
  breadcrumbs,
  eyebrow,
  subtitle,
  actions,
  media,
  showcase,
  children,
  contentOnly = false,
  className,
  titleClassName,
  titleBlockClassName,
  containerClassName,
}: PageHeroProps) {
  return (
    <Section
      id={id}
      size="md"
      className={cn(
        "relative w-full overflow-hidden bg-black pt-[calc(var(--header-offset)+var(--spacing-title-gap))] pb-0",
        media && "relative",
        className,
      )}
    >
      {media ? <div className="absolute inset-0 z-0">{media}</div> : null}
      {contentOnly ? children : (
        <Container className={cn("relative z-10 text-center", containerClassName)}>
          {breadcrumbs}
          <div className={cn("mx-auto max-w-3xl text-center", titleBlockClassName, !children && !showcase && "mb-[var(--spacing-title-gap)]")}>
            {eyebrow ? <div className="mb-4 type-label text-white/50">{eyebrow}</div> : null}
            {titleContent ?? (
              <Heading as="h1" size="hero" className={cn("text-white", titleClassName)}>
                {title}
              </Heading>
            )}
            {subtitle ? <p className="mx-auto mt-[var(--gap-heading-to-text)] max-w-2xl type-body-lg text-white/70">{subtitle}</p> : null}
            {actions ? <div className="mt-[var(--gap-heading-to-text)] flex flex-wrap justify-center gap-component-gap">{actions}</div> : null}
          </div>
          {children ? <div className="mt-[var(--spacing-title-gap)]">{children}</div> : null}
          {showcase ? <div className="mt-[var(--spacing-title-gap)]">{showcase}</div> : null}
        </Container>
      )}
    </Section>
  );
}
