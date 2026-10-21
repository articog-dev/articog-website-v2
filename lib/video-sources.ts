const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.trim().replace(/\/+$/, "") ?? "";

function videoUrl(filename: string) {
  return `${mediaBaseUrl}/videos/optimized/${filename}`;
}

function localVideoUrl(filename: string) {
  return `/videos/optimized/${filename}`;
}

export const VIDEO_SOURCES = {
  pipeline: videoUrl("WA-01.mp4"),
  approach: videoUrl("WA-02.mp4"),
  heroDesktop: videoUrl("WA-03.mp4"),
  heroMobile: videoUrl("WA-03-mobile.mp4"),
} as const;

export const LOCAL_VIDEO_SOURCES = {
  pipeline: localVideoUrl("WA-01.mp4"),
  approach: localVideoUrl("WA-02.mp4"),
  heroDesktop: localVideoUrl("WA-03.mp4"),
  heroMobile: localVideoUrl("WA-03-mobile.mp4"),
} as const;

export const VIDEO_MEDIA_BASE_URL = mediaBaseUrl;
