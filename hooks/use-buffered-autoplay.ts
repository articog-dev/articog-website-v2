import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

const FALLBACK_START_MS = 3_000;
const STALL_RETRY_MS = 800;

interface Options {
  enabled?: boolean;
  keepPlaying?: boolean;
  waitForBuffer?: boolean;
}

type SaveDataConnection = EventTarget & { saveData?: boolean };

function isAutoplayBlocked() {
  const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    Boolean(connection?.saveData)
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

export function useBufferedAutoplay(
  videoRef: RefObject<HTMLVideoElement | null>,
  { enabled = true, keepPlaying = false, waitForBuffer = true }: Options = {},
) {
  const autoplayBlocked = useSyncExternalStore(
    subscribeToAutoplayPreference,
    isAutoplayBlocked,
    () => true,
  );
  const [showPlaybackButton, setShowPlaybackButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    const handlePlaying = () => {
      setIsPlaying(true);
      clearStallTimer();
    };
    const handlePauseEvent = () => setIsPlaying(false);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePauseEvent);

    if (autoplayBlocked) {
      video.pause();
      return () => {
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("pause", handlePauseEvent);
      };
    }

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    let started = false;
    let playPromise: Promise<void> | null = null;
    let fallbackTimer: number | undefined;
    let stallTimer: number | undefined;
    let gestureRetryHandler: (() => void) | undefined;

    const play = () => {
      if (!video.paused || playPromise) return;
      video.muted = true;
      playPromise = video.play()
        .then(() => setIsPlaying(true))
        .catch((error: unknown) => {
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
            play();
          };
          window.addEventListener("touchstart", gestureRetryHandler, { once: true, passive: true });
          window.addEventListener("click", gestureRetryHandler, { once: true });
          window.addEventListener("scroll", gestureRetryHandler, { once: true, passive: true });
        })
        .finally(() => {
          playPromise = null;
        });
    };
    const removeGestureRetryListeners = () => {
      if (!gestureRetryHandler) return;
      window.removeEventListener("touchstart", gestureRetryHandler);
      window.removeEventListener("click", gestureRetryHandler);
      window.removeEventListener("scroll", gestureRetryHandler);
      gestureRetryHandler = undefined;
    };

    const start = () => {
      started = true;
      window.clearTimeout(fallbackTimer);
      play();
    };

    const clearStallTimer = () => window.clearTimeout(stallTimer);

    const handleStall = () => {
      clearStallTimer();
      stallTimer = window.setTimeout(() => {
        if (document.visibilityState !== "visible") return;
        // Nudge playback forward slightly to break out of a stuck buffer.
        try {
          video.currentTime = video.currentTime;
        } catch {
          // ignore
        }
        play();
      }, STALL_RETRY_MS);
    };

    const handleVisibilityChange = () => {
      if (started && document.visibilityState === "visible") play();
    };

    const handlePause = () => {
      if (keepPlaying && started && document.visibilityState === "visible") play();
    };

    const handlePlaybackReady = () => play();
    video.addEventListener("loadedmetadata", handlePlaybackReady);
    video.addEventListener("loadeddata", handlePlaybackReady);
    video.addEventListener("canplay", handlePlaybackReady);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleStall);
    video.addEventListener("stalled", handleStall);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePauseEvent);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!waitForBuffer || video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
    } else {
      video.addEventListener("canplay", start, { once: true });
      fallbackTimer = window.setTimeout(start, FALLBACK_START_MS);
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      clearStallTimer();
      removeGestureRetryListeners();
      video.removeEventListener("canplay", start);
      video.removeEventListener("loadedmetadata", handlePlaybackReady);
      video.removeEventListener("loadeddata", handlePlaybackReady);
      video.removeEventListener("canplay", handlePlaybackReady);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleStall);
      video.removeEventListener("stalled", handleStall);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePauseEvent);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoRef, enabled, keepPlaying, waitForBuffer, autoplayBlocked]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = true;
      void video.play().then(() => {
        setIsPlaying(true);
      }).catch((error: unknown) => {
        console.warn("Video playback failed", {
          error,
          errorCode: video.error?.code,
          currentSrc: video.currentSrc,
          networkState: video.networkState,
        });
        setShowPlaybackButton(true);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return {
    showPlaybackButton: showPlaybackButton || autoplayBlocked,
    isPlaying,
    togglePlayback,
  };
}