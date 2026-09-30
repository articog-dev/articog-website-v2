"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Container, Section, Heading } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";
import type { PipelineStep } from "@/types";
import { useBufferedAutoplay } from "@/hooks/use-buffered-autoplay";

interface PipelineProps {
  steps: PipelineStep[];
  align?: "left" | "center";
  showDetails?: boolean;
}

export function Pipeline({ steps, align = "left", showDetails = false }: PipelineProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const hasLoadedRef = useRef(false);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || hasLoadedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasLoadedRef.current) return;
        hasLoadedRef.current = true;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useBufferedAutoplay(videoRef, {
    enabled: shouldLoad,
    src: "https://media.articog.com/videos/backgrounds/WA-03.mp4",
    waitForBuffer: false,
  });

  return (
    <Section id="pipeline" className="relative flex min-h-[min(100svh,56.25vw)] items-center overflow-hidden" style={{ padding: 0 }}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          controls={false}
          preload="none"
          poster={shouldLoad ? "/pipeline-poster.jpg" : undefined}
          className="h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Subtle base overlay */}
        <div className="absolute inset-0 z-10 bg-black/6" />
      </div>

      <Container className="relative z-20 w-full py-16 md:py-24">
        {/* Header */}
        <ScrollReveal>
          <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-lg"}>
            <Heading
              as="h2"
              size="section"
              className="mb-0"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,0.9)",
              }}
            >
              From brief to live.
            </Heading>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-white/[0.12] bg-transparent backdrop-blur-[2px] sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={showDetails ? "group relative flex min-h-64 cursor-default flex-col justify-start gap-4 border-b p-6 text-left transition-colors duration-200 last:border-b-0 hover:bg-white/[0.04] sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0" : "group relative flex cursor-default flex-col items-center justify-center gap-4 border-b p-7 text-center transition-colors duration-200 last:border-b-0 hover:bg-white/[0.04] sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0"}
            >
              <ScrollReveal delay={index * 0.1}>
                <div className={showDetails ? "flex h-full flex-col gap-4" : "flex flex-col items-center justify-center gap-4"}>
                  <div
                    className="absolute left-0 right-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: "#ffffff" }}
                  />
                  {!showDetails ? <div className="absolute bottom-[-1.5rem] left-[2.15rem] top-14 w-px bg-white/[0.18] last:hidden sm:hidden" aria-hidden="true" /> : null}
                  <div
                    className={showDetails ? "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] font-display text-sm font-bold text-white/80" : "flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold"}
                    style={{
                      border: showDetails ? undefined : "1px solid rgba(255,255,255,0.20)",
                      color: showDetails ? undefined : "rgba(255,255,255,0.95)",
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {step.step}
                  </div>
                  {showDetails && step.tag ? <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 type-label text-white/55">{step.tag}</span> : null}
                  <Heading
                    as="h3"
                    size="card"
                    className={showDetails ? "text-base font-bold text-white" : "text-base font-bold text-white"}
                    style={{
                      textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    }}
                  >
                    {step.title}
                  </Heading>
                  {showDetails ? <p className="type-small leading-relaxed text-white/75" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>{step.description}</p> : null}
                </div>
              </ScrollReveal>
              {showDetails && index < steps.length - 1 ? <div className="absolute right-[-1px] top-1/2 hidden h-px w-2 bg-white/20 lg:block" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
