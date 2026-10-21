"use client";

import type { HeroContent } from "@/types";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ReactDOM from "react-dom";
import { Heading } from "@/components/ui";
import { VIDEO_FALLBACK_SOURCES, VIDEO_SOURCES } from "@/lib/video-sources";

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
  const failedSourcesRef = useRef<{ selectedSrc: string; urls: string[] }>({
    selectedSrc: "",
    urls: [],
  });
  const [fallbackSrc, setFallbackSrc] = useState<{ selectedSrc: string; src: string }>();
  const [manualPlayback, setManualPlayback] = useState(false);
  const [showPlaybackButton, setShowPlaybackButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoPreferences = useSyncExternalStore(
    subscribeToVideoPreferences,
    getVideoPreferences,
    getServerVideoPreferences,
  );
  const shouldLoadVideo = videoPreferences.startsWith("load:");
  const isMobileViewport = videoPreferences.endsWith(":mobile");
  const selectedVideoSrc = isMobileViewport
    ? VIDEO_SOURCES.heroMobile
    : VIDEO_SOURCES.heroDesktop;
  const videoSrc =
    fallbackSrc?.selectedSrc === selectedVideoSrc ? fallbackSrc.src : selectedVideoSrc;
  const shouldLoadVideoSource = shouldLoadVideo || manualPlayback;

  ReactDOM.preload("/hero-poster.jpg", { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideoSource) return;

    const attemptPlayback = () => {
      video.muted = true;
      video.defaultMuted = true;
      void video.play().catch((error: unknown) => {
        console.warn("Video playback failed", {
          error,
          errorCode: video.error?.code,
          currentSrc: video.currentSrc,
          networkState: video.networkState,
        });
        setShowPlaybackButton(true);
        if (gestureRetryHandler) return;
        gestureRetryHandler = () => {
          removeGestureRetryListeners();
          attemptPlayback();
        };
        window.addEventListener("touchstart", gestureRetryHandler, { once: true, passive: true });
        window.addEventListener("click", gestureRetryHandler, { once: true });
        window.addEventListener("scroll", gestureRetryHandler, { once: true, passive: true });
      });
    };
    const removeGestureRetryListeners = () => {
      if (!gestureRetryHandler) return;
      window.removeEventListener("touchstart", gestureRetryHandler);
      window.removeEventListener("click", gestureRetryHandler);
      window.removeEventListener("scroll", gestureRetryHandler);
      gestureRetryHandler = undefined;
    };
    let gestureRetryHandler: (() => void) | undefined;

    video.addEventListener("loadeddata", attemptPlayback);
    video.addEventListener("canplay", attemptPlayback);
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.load();
    attemptPlayback();

    return () => {
      removeGestureRetryListeners();
      video.removeEventListener("loadeddata", attemptPlayback);
      video.removeEventListener("canplay", attemptPlayback);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
    };
  }, [shouldLoadVideoSource, videoSrc]);

  const handleVideoError: React.ReactEventHandler<HTMLVideoElement> = (event) => {
    const video = event.currentTarget;
    console.warn("Video source failed", {
      errorCode: video.error?.code,
      currentSrc: video.currentSrc,
      networkState: video.networkState,
    });

    if (failedSourcesRef.current.selectedSrc !== selectedVideoSrc) {
      failedSourcesRef.current = { selectedSrc: selectedVideoSrc, urls: [] };
    }
    const failedSources = failedSourcesRef.current.urls;
    failedSources.push(video.currentSrc, videoSrc);
    const nextSource = VIDEO_FALLBACK_SOURCES.hero.find((candidate) => {
      const absoluteCandidate = new URL(candidate, window.location.href).href;
      return !failedSources.some(
        (failedSource) =>
          failedSource === candidate ||
          failedSource === absoluteCandidate,
      );
    });

    if (nextSource) {
      setFallbackSrc({ selectedSrc: selectedVideoSrc, src: nextSource });
    } else {
      setShowPlaybackButton(true);
    }
  };

  const handlePlaybackButton = () => {
    const video = videoRef.current;
    if (!video) return;

    setShowPlaybackButton(true);
    if (!video.paused) {
      video.pause();
      return;
    }

    setManualPlayback(true);
    video.muted = true;
    video.src = videoSrc;
    video.load();
    void video.play().catch((error: unknown) => {
      console.warn("Video playback failed", {
        error,
        errorCode: video.error?.code,
        currentSrc: video.currentSrc,
        networkState: video.networkState,
      });
    });
  };

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
          src={shouldLoadVideoSource ? videoSrc : undefined}
          onError={handleVideoError}
          poster="/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        {showPlaybackButton || !shouldLoadVideo ? (
          <button
            type="button"
            onClick={handlePlaybackButton}
            aria-label={isPlaying ? "Pause background video" : "Play background video"}
            className="absolute bottom-4 right-4 z-20 rounded-full border border-white/30 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isPlaying ? "Pause video" : "Play video"}
          </button>
        ) : null}

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