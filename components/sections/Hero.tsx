"use client";

import type { HeroContent } from "@/types";
import { useEffect, useRef, useSyncExternalStore } from "react";
import ReactDOM from "react-dom";
import { Heading } from "@/components/ui";

interface HeroProps {
  content: HeroContent;
}

type VideoPreferences = `${"load" | "skip"}:${"mobile" | "desktop"}`;
type SaveDataConnection = EventTarget & { saveData?: boolean };

function getVideoPreferences(): VideoPreferences {
  const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;
  const shouldSkip =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData;
  const viewport = window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";

  return `${shouldSkip ? "skip" : "load"}:${viewport}`;
}

function subscribeToVideoPreferences(onChange: () => void) {
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;

  mobileQuery.addEventListener("change", onChange);
  reducedMotionQuery.addEventListener("change", onChange);
  connection?.addEventListener("change", onChange);

  return () => {
    mobileQuery.removeEventListener("change", onChange);
    reducedMotionQuery.removeEventListener("change", onChange);
    connection?.removeEventListener("change", onChange);
  };
}

function getServerVideoPreferences(): VideoPreferences {
  return "skip:desktop";
}

export function Hero({ content }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPreferences = useSyncExternalStore(
    subscribeToVideoPreferences,
    getVideoPreferences,
    getServerVideoPreferences,
  );
  const shouldLoadVideo = videoPreferences.startsWith("load:");
  const isMobileViewport = videoPreferences.endsWith(":mobile");

  ReactDOM.preload("/hero-poster.jpg", { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    const attemptPlayback = () => {
      void video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    video.load();
    attemptPlayback();

    return () => {
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
    };
  }, [shouldLoadVideo, isMobileViewport]);

  return (
    <section
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background: "#000000",
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          controls={false}
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        >
          {shouldLoadVideo ? (
            <>
              <source
                src="https://media.articog.com/videos/backgrounds/WA-03-mobile.mp4"
                media="(max-width: 767px)"
                type="video/mp4"
              />
              {!isMobileViewport ? (
                <source
                  src="https://media.articog.com/videos/backgrounds/WA-03.mp4"
                  type="video/mp4"
                />
              ) : null}
            </>
          ) : null}
        </video>

        {/* Light vignette for text readability without washing out the video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.18) 100%)",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-5xl text-center">
          <p className="type-small mb-4 tracking-[0.2em] text-white/55 uppercase">
            {content.eyebrow}
          </p>
          {/* Headline */}
          <Heading as="h1" size="hero" className="hero-heading text-white">
            {content.headline.split("\n").map((line, i, lines) => (
              <span key={i} className="block">
                {line}{i < lines.length - 1 ? " " : ""}
              </span>
            ))}
          </Heading>

        </div>
      </div>
    </section>
  );
}