import Image from "next/image";
import { Heading } from "@/components/ui";
import type { FounderProfile as FounderProfileData } from "@/lib/founders";

export function FounderProfile({ founder }: { founder: FounderProfileData }) {
  const isCircularProfile = founder.circular === true;

  return (
    <article
      className={`grid grid-gap-loose border-t border-white/[0.08] pt-10 ${
        isCircularProfile
          ? "items-start lg:grid-cols-[18rem_minmax(0,1fr)]"
          : "lg:grid-cols-[16rem_minmax(0,1fr)]"
      }`}
    >
      <div
        className={`mx-auto w-full overflow-hidden border border-white/[0.08] bg-white/[0.02] lg:mx-0 ${
          isCircularProfile
            ? "aspect-square max-w-[18rem] self-start rounded-full bg-black"
            : "max-w-xs rounded-2xl"
        }`}
      >
        <Image
          src={founder.imageSrc}
          alt={founder.imageAlt}
          width={603}
          height={603}
          className={isCircularProfile ? "h-full w-full rounded-full object-cover" : "h-auto w-full"}
          sizes={isCircularProfile
            ? "(max-width: 1023px) min(calc(100vw - 3rem), 18rem), 18rem"
            : "(max-width: 1023px) min(calc(100vw - 3rem), 20rem), 16rem"}
        />
      </div>
      <div className={`min-w-0 text-[1.05rem] leading-[1.9] text-white/60 ${isCircularProfile ? "space-y-6 text-center" : "space-y-8"}`}>
        <div className="text-center">
          <Heading
            as="h2"
            size="section"
            className={isCircularProfile ? "mb-2 text-white" : "mb-3 text-white"}
          >
            {founder.name}
          </Heading>
          <p className={isCircularProfile ? "mx-auto max-w-[58ch] text-base font-medium leading-relaxed text-white/70" : undefined}>
            {founder.roleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          {founder.metaLines?.map((line) => (
            <p key={line} className="mt-2 text-base text-white/45">
              {line}
            </p>
          ))}
        </div>

        {isCircularProfile ? (
          <div className="mx-auto max-w-[58ch] space-y-5">
            {founder.paragraphs.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))
        )}

        {founder.sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <Heading as="h3" size="card" className="text-white">{section.title}</Heading>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${founder.name} on LinkedIn`}
          className="inline-flex text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          LinkedIn
        </a>
      </div>
    </article>
  );
}
