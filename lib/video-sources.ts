const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim().replace(/\/+$/, "") ?? "";

function videoUrl(filename: string) {
  return `${mediaBaseUrl}/videos/${filename}`;
}

function localVideoUrl(filename: string) {
  return `/videos/optimized/${filename}`;
}

export const VIDEO_SOURCES = {
  pipeline: videoUrl("pipeline-1080.mp4"),
  approach: videoUrl("our-approach-1080.mp4"),
  heroDesktop: videoUrl("hero-1080.mp4"),
  heroMobile: videoUrl("hero-1080.mp4"),
} as const;

export const LOCAL_VIDEO_SOURCES = {
  pipeline: localVideoUrl("WA-01.mp4"),
  approach: localVideoUrl("WA-02.mp4"),
  heroDesktop: localVideoUrl("WA-03.mp4"),
  heroMobile: localVideoUrl("WA-03-mobile.mp4"),
} as const;

export const VIDEO_FALLBACK_SOURCES = {
  pipeline: [LOCAL_VIDEO_SOURCES.pipeline],
  approach: [LOCAL_VIDEO_SOURCES.approach],
  hero: [LOCAL_VIDEO_SOURCES.heroDesktop, LOCAL_VIDEO_SOURCES.heroMobile],
} as const;

export const VIDEO_MEDIA_BASE_URL = mediaBaseUrl;
