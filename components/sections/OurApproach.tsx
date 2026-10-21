"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Container, Section, Heading } from "@/components/ui";
import { ScrollReveal } from "@/components/animations";
import { useBufferedAutoplay } from "@/hooks/use-buffered-autoplay";
import { VIDEO_SOURCES } from "@/lib/video-sources";

const approachItems = [
  {
    title: "AI-native production",
    description:
      "Less shooting, less production time and lower production budget where suitable.",
  },
  {
    title: "AI-Native Production",
    description:
      "Our production workflow uses generative tools to develop characters, environments, product shots, motion, and creative variations under human creative direction.",
  },
  {
    title: "Production Ready Finish",
    description:
      "Creative directors and editors refine deliverables through compositing, editing, sound, quality control, and platform-specific finishing before delivery.",
  },
];

export function OurApproach() {
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

  const { showPlaybackButton, isPlaying, togglePlayback } = useBufferedAutoplay(videoRef, {
    enabled: shouldLoad,
  });

  return (
    <Section size="md" className="border-t border-white/[0.05]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Heading as="h2" size="section" className="mb-6">
              Brand storytelling
            </Heading>
            <p
              className="type-body md:text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              AI speeds up production; people protect the brand, story and final quality.
            </p>
          </div>
        </ScrollReveal>

      </Container>

      {/* Edge-to-edge video: full width, no rounded corners, no border */}
      <div className="relative mb-16 h-[min(100svh,56.25vw)] w-full overflow-hidden bg-black">
        <video
          ref={(video) => {
            videoRef.current = video;
            if (video) {
              video.defaultMuted = true;
              video.muted = true;
            }
          }}
          muted
          autoPlay
          playsInline
          loop
          controls={false}
          preload="metadata"
          src={shouldLoad ? VIDEO_SOURCES.approach : undefined}
          poster="/our-approach-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        {showPlaybackButton ? (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause approach background video" : "Play approach background video"}
            className="absolute bottom-4 right-4 z-20 rounded-full border border-white/30 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPlaying ? "Pause video" : "Play video"}
          </button>
        ) : null}
      </div>

      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          {approachItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="space-y-4 rounded-xl border border-white/[0.05] p-6 transition-transform duration-200 hover:-translate-y-1">
                <Heading as="h3" size="card" className="text-white">
                  {item.title}
                </Heading>
                <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}