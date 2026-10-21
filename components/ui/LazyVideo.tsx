"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type LazyVideoSource = {
  src: string;
  type: string;
  media?: string;
};

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  sources?: LazyVideoSource[];
}

type SaveDataConnection = EventTarget & {
  saveData?: boolean;
  effectiveType?: string;
};

function shouldSkipAutoplay() {
  const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Boolean(
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g",
    )
  );
}

function subscribeToAutoplayPreference(onChange: () => void) {
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;

  reducedMotionQuery.addEventListener("change", onChange);
  connection?.addEventListener("change", onChange);

  return () => {
    reducedMotionQuery.removeEventListener("change", onChange);
    connection?.removeEventListener("change", onChange);
  };
}

export function LazyVideo({
  sources,
  src,
  preload = "metadata",
  onError,
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourcesRef = useRef(sources);
  const autoplaySkipped = useSyncExternalStore(
    subscribeToAutoplayPreference,
    shouldSkipAutoplay,
    () => true,
  );
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [activeSources, setActiveSources] = useState<LazyVideoSource[]>();
  const [showPlaybackButton, setShowPlaybackButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoplaySkipped) return;
    if (hasFailed) return;

    let idleHandle: number | undefined;
    let fallbackTimer: number | undefined;
    let loadHandler: (() => void) | undefined;
    const loadWhenIdle = () => {
      setActiveSources(sourcesRef.current?.filter((source) =>
        !source.media || window.matchMedia(source.media).matches,
      ));
      const requestIdle = window.requestIdleCallback?.bind(window);
      if (requestIdle) {
        idleHandle = requestIdle(() => setShouldLoad(true), { timeout: 3000 });
      } else {
        fallbackTimer = window.setTimeout(() => setShouldLoad(true), 1500);
      }
    };
    const scheduleLoad = () => {
      if (document.readyState === "complete") {
        loadWhenIdle();
      } else {
        loadHandler = loadWhenIdle;
        window.addEventListener("load", loadWhenIdle, { once: true });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scheduleLoad();
        observer.disconnect();
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      if (loadHandler) window.removeEventListener("load", loadHandler);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
    };
  }, [hasFailed, autoplaySkipped]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || hasFailed) return;

    const playVideo = () => {
      if (!video.paused) return;
      video.muted = true;
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
          playVideo();
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

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        playVideo();
      }
    };
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (video.readyState >= 2) {
      playVideo();
    }

    video.addEventListener("canplay", playVideo, { once: true });
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      removeGestureRetryListeners();
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldLoad, hasFailed]);

  const handleError: React.ReactEventHandler<HTMLVideoElement> = (event) => {
    const video = event.currentTarget;
    console.warn("Video source failed", {
      errorCode: video.error?.code,
      currentSrc: video.currentSrc,
      networkState: video.networkState,
    });
    setHasFailed(true);
    setShowPlaybackButton(true);
    onError?.(event);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    setShowPlaybackButton(true);
    if (!video.paused) {
      video.pause();
      return;
    }

    const selectedSources = sourcesRef.current?.filter(
      (source) => !source.media || window.matchMedia(source.media).matches,
    );
    setActiveSources(selectedSources);
    setShouldLoad(true);
    setHasFailed(false);
    video.muted = true;
    const selectedSrc = selectedSources?.[0]?.src ?? src;
    if (typeof selectedSrc === "string") {
      video.src = selectedSrc;
      video.load();
    }
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
    <>
      <video
        ref={videoRef}
        {...props}
        preload={shouldLoad ? preload : "none"}
        src={shouldLoad && !hasFailed ? activeSources?.[0]?.src ?? src : undefined}
        onError={handleError}
      />
      {showPlaybackButton || autoplaySkipped ? (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-4 right-4 z-20 rounded-full border border-white/30 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isPlaying ? "Pause video" : "Play video"}
        </button>
      ) : null}
    </>
  );
}