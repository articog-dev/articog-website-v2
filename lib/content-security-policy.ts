export function createContentSecurityPolicy(isDevelopment: boolean): string {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com https://articog.breezy.hr https://subscribe-forms.beehiiv.com`,
    "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https://media.articog.com https://images.unsplash.com https://img.youtube.com https://miro.medium.com",
    "media-src 'self' https://media.articog.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.resend.com https://*.googleapis.com https://articog.breezy.hr https://calendly.com https://*.calendly.com https://assets.calendly.com",
    "frame-src 'self' https://calendly.com https://*.calendly.com https://www.youtube.com https://www.youtube-nocookie.com",
    "form-action 'self'",
  ].join("; ");
}