import { cn } from "@/lib/utils";
import { Link } from "./Link";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Section } from "./Section";

type PageHeroDetailProps = {
  title: React.ReactNode;
  backLink?: { href: string; label: React.ReactNode };
  subtitle?: React.ReactNode;
  detail?: React.ReactNode;
  media?: React.ReactNode;
  className?: string;
};

export function PageHeroDetail({
  title,
  backLink,
  subtitle,
  detail,
  media,
  className,
}: PageHeroDetailProps) {
  return (
    <Section
      size="md"
      className={cn(
        "relative w-full overflow-hidden bg-black pt-[calc(var(--header-offset)+var(--spacing-title-gap))] pb-0",
        media && "relative",
        className,
      )}
    >
      {media ? <div className="absolute inset-0 z-0">{media}</div> : null}
      <Container className="relative z-10 text-center">
        <div className="mx-auto max-w-6xl">
          {backLink ? (
            <Link
              href={backLink.href}
              className="mb-10 inline-flex text-sm text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {backLink.label}
            </Link>
          ) : null}
          <div className={cn("mx-auto max-w-3xl text-center", !detail && "mb-[var(--spacing-title-gap)]")}>
            <Heading as="h1" size="hero" className="text-white">
              {title}
            </Heading>
            {subtitle ? <p className="mx-auto mt-[var(--gap-heading-to-text)] max-w-2xl type-body-lg text-white/60">{subtitle}</p> : null}
          </div>
          {detail ? <div className="mt-[var(--spacing-title-gap)]">{detail}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
