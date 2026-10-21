import { VIDEO_MEDIA_BASE_URL } from "./video-sources";

export function createContentSecurityPolicy(isDevelopment: boolean): string {
  const configuredMediaOrigin = VIDEO_MEDIA_BASE_URL
    ? ` ${new URL(VIDEO_MEDIA_BASE_URL).origin}`
    : "";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://app.cal.com https://articog.breezy.hr https://subscribe-forms.beehiiv.com`,
    "style-src 'self' 'unsafe-inline' https://app.cal.com",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://app.cal.com https://cal.com https://media.articog.com https://images.unsplash.com https://img.youtube.com https://miro.medium.com",
    `media-src 'self' https://media.articog.com${configuredMediaOrigin}`,
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.resend.com https://*.googleapis.com https://articog.breezy.hr https://app.cal.com https://api.cal.com https://cal.com",
    "frame-src 'self' https://app.cal.com https://cal.com https://www.youtube.com https://www.youtube-nocookie.com",
    "form-action 'self'",
  ].join("; ");
}