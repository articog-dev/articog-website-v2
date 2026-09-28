# Articog Website (Version 2): Technical Documentation

## 1. Overview

Version 2 is a Next.js App Router application. Most pages are statically rendered React Server Components; three route groups use `generateStaticParams` (`/services/[slug]`, `/blog/[slug]`, `/about/founder/[slug]`). Three server API routes handle form submissions. Content (services, blog, founders) is stored as typed data in `lib/`, so there is no CMS or database for page content.

```
Browser ──> Next.js (Vercel)
              ├─ Static / server-rendered pages (app/**/page.tsx)
              ├─ API routes: /api/demo, /api/contact, /api/privacy-request
              │     ├─ Upstash Redis: rate limit, idempotency, durable lead storage
              │     ├─ Google Sheets (Apps Script URL): secondary lead mirror
              │     └─ Resend: confirmation and internal alert emails
              └─ Third-party embeds: Calendly, Beehiiv, YouTube, Google Analytics 4
```

## 2. Technology stack

See the table in the root `README.md`. Versions are pinned in `package.json`: Next.js 16.3.2, React 19.2.8, TypeScript 5, Tailwind CSS 4, Vitest 2, Playwright 1.63.

## 3. Repository layout

| Path | Contents |
| --- | --- |
| `app/` | Routes. Each folder with a `page.tsx` is a URL. `layout.tsx` is the root layout; `sitemap.ts` and `robots.ts` generate `/sitemap.xml` and `/robots.txt`. |
| `app/api/` | `demo`, `contact`, `privacy-request` route handlers (POST). |
| `components/ui/` | Design-system primitives: `Section`, `Container`, `Heading`, `Text`, `Button`, `Link`, `Grid`, `PageHero`, `PageHeroDetail`, `SectionHeader`, form controls (`input`, `textarea`, `select`, `checkbox`, `label`, `FormField`), `accordion`, `card`, `table`, `badge`, `alert`, media components (`MediaFrame`, `LazyVideo`, `DeviceFrame`, `MediaOverlay`). |
| `components/sections/` | Reusable page sections: `Hero`, `Capabilities`, `Pipeline`, `CaseStudies`, `Comparison`, `FinalCTA`, `FounderProfile`, `IndustryDetails`, `ServiceDetails`, `SolutionDetails`, `OurApproach`, `Problems`, `WorkVideoShowcase`, `HomeVisualShowcase`, `ServiceDeviceShowcase`. |
| `components/layout/` | `Header`, `Footer`, `AnnouncementBar`, `MobileMenu`, `ServiceMenuCards`, `MenuImagePreload`, `CookieBanner`, `NotFound`. |
| `components/blog/` | `BlogFilterList` (All / Articles / Videos tabs and cards), `YouTubeEmbed`. |
| `components/careers/` | `BreezyOpenings`: the open roles list and application instructions. |
| `components/search/` | `SearchCommand`: site search, backed by `public/search-index.json`. |
| `components/seo/` | `JsonLd`, `Breadcrumbs`. |
| `components/animations/` | `FadeIn`, `SlideUp`, `ScrollReveal`. |
| `components/newsletter/` | `BeehiivForm`. |
| `components/analytics/` | `GoogleAnalytics`. |
| `lib/` | See section 7. |
| `tests/`, `e2e/` | 18 Vitest suites and 1 Playwright spec. |

## 4. Rendering and routing

- **App Router** with a shared root layout that renders `AnnouncementBar`, `Header`, page content, `Footer`, the cookie banner, the toaster, GA4, and site-wide JSON-LD.
- **Dynamic routes** (all pre-rendered with `generateStaticParams`):
  - `/services/[slug]`: pre-renders the 37 slugs in `lib/service-pages.ts`, but every slug is redirected in `next.config.ts`, so these pages are not reachable.
  - `/blog/[slug]`: native Articog blog articles from `lib/blog.ts`.
  - `/about/founder/[slug]`: founder profiles from `lib/founders.ts`.
- **Redirects** are declared in `next.config.ts` (`redirects()`): retired service, solution, industry, pricing, resource, and legal URLs return 301 to their current equivalents. `app/work/industries/page.tsx` also redirects to `/industries`.
- **Sitemap** (`app/sitemap.ts`) walks the `app/` directory for static routes, then adds founder, native blog, and dedicated service URLs (the service URLs all redirect and should be removed). It excludes redirected routes, `/thank-you`, `/thank-you/demo`, and `/sitemap`.

## 5. Page layout system

- Section spacing uses design tokens defined in `app/globals.css` (`--spacing-section-sm`, `--spacing-section`, `--spacing-section-lg`, `--spacing-title-gap`, `--gap-heading-to-text`, `--header-offset`).
- Every page title is rendered through `PageHero` (or `PageHeroDetail` for detail pages). The top spacing is `--header-offset + --spacing-title-gap` and the space below the title block is `--spacing-title-gap`, matching the `/book-a-demo` reference design.
- `PageHero` props: `title`, `subtitle`, `breadcrumbs`, `eyebrow`, `actions`, `media`, `showcase`, `children`, `contentOnly` (renders custom hero content inside the standard spacing), `className`, `titleClassName`, `titleBlockClassName`, `containerClassName`. When no `children` or `showcase` is passed, it adds the bottom gap itself.
- `Section` supports `sm`, `md`, `lg` sizes; `Container` sets the horizontal page width and gutters.
- The Announcement Bar is fixed at the top; the header sits below it. `--header-offset` accounts for both, and `SectionNav` on `/why-articog` overrides it at runtime.

## 6. Forms and API

All three routes accept `POST` with JSON and share the same pipeline:

| Step | Detail |
| --- | --- |
| 1. Rate limit | `checkPublicFormRateLimit(request, route)` (Upstash), keyed by client IP and route. If the shared store is unavailable the route fails closed (temporary-unavailable response). Exceeding the limit returns `429` with `Retry-After`. |
| 2. Validation | Payload validation in `lib/api-validation.ts` and `lib/contact-payload.ts`. Includes a honeypot field (`website`) and required consent. Errors return generic messages. |
| 3. Idempotency | `acquireIdempotency` uses an HMAC fingerprint of the payload (`articog:idempotency:` keys). Leases last 2 minutes; completed submissions are remembered for 24 hours. Storage failures release the lease so the client can retry. |
| 4. Durable save | `saveLead` writes a record under `articog:lead:` in Redis (ID, lead type, source, timestamp, validated fields). |
| 5. Mirror | Lead is mirrored to Google Sheets. If that fails, an internal alert email is sent. |
| 6. Email | `sendResendEmail` sends a confirmation to the submitter and internal notifications. |
| 7. Logging | `logOperational` emits structured JSON logs with request IDs. Bodies, credentials, email addresses, and stack traces are never logged. |

| Route | Used by | Notes |
| --- | --- | --- |
| `POST /api/demo` | `/book-a-demo` | After success the page opens the Calendly popup (prefilled name and email). |
| `POST /api/contact` | `/contact` | Sends an alert to `CONTACT_INTERNAL_ALERT_EMAIL` if the Sheets mirror fails. |
| `POST /api/privacy-request` | `/privacy/request`, `/privacy-choices` | Alerts go to `PRIVACY_REQUEST_ALERT_EMAIL`. |

## 7. Library modules (`lib/`)

| File | Purpose |
| --- | --- |
| `content.ts` | Shared site copy and content constants |
| `service-pages.ts` | Data for 37 legacy service slugs (all redirected) |
| `service-navigation.ts` | Top-level service links used by menus and pages |
| `blog.ts` | Blog entries: 2 native articles plus 5 external cards (4 Medium, 1 YouTube) |
| `founders.ts` | Founder profiles |
| `structured-data.ts` | JSON-LD schema builders |
| `api-validation.ts`, `contact-payload.ts` | Request validation and sanitizing |
| `rate-limit.ts` | Upstash rate limiting (with in-memory test hooks) |
| `idempotency.ts` | Duplicate-submission protection |
| `lead-storage.ts` | Durable lead storage in Redis with timeout handling |
| `resend.ts` | Email sending through Resend |
| `observability.ts`, `request-context.ts` | Structured logs and request IDs |
| `analytics.ts`, `cookie-consent.ts` | GA4 event helpers and consent handling |
| `calendly.ts` | Calendly URL and trusted-event checks |
| `error-page.ts` | Error page helpers |
| `utils.ts` | `cn()` class-name helper |

## 8. Environment variables

Set these in the hosting environment (never commit values):

| Variable | Purpose |
| --- | --- |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate limiting, idempotency, durable lead storage |
| `RESEND_API_KEY` | Email delivery |
| `CONTACT_FROM_EMAIL` | Verified sender address |
| `CONTACT_INTERNAL_ALERT_EMAIL` | Recipient of contact-form Sheets-failure alerts |
| `PRIVACY_REQUEST_ALERT_EMAIL` | Recipient of privacy-request alerts |
| `GOOGLE_SHEETS_WEB_APP_URL` | Google Sheets mirror endpoint |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Enables Google Analytics 4 |

## 9. Security

Configured in `next.config.ts` `headers()` for all routes:

- Content-Security-Policy restricting scripts, styles, images, media, frames, and connections to `self` plus the allow-listed providers (Google Analytics/Tag Manager, Calendly, Beehiiv, Breezy, YouTube, `media.articog.com`, Resend).
- `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security` (1 year, includeSubDomains), `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` disabling camera, microphone, and geolocation.
- Long-lived immutable caching for `/videos`, `/services` images, posters, and logos. Rename a file when its content changes.
- Form APIs fail closed, return generic errors, and hold no secrets in client code.

## 10. Images and media

`next/image` is configured for AVIF and WebP with fixed device sizes and remote patterns for `media.articog.com`, Unsplash, YouTube thumbnails, and Medium. Hero, approach, and pipeline videos live in `public/videos`, with poster images alongside. `LazyVideo` and `hooks/use-buffered-autoplay.ts` control video loading.

## 11. SEO and discoverability

- Per-route `metadata` with canonical URLs; root metadata sets Open Graph, Twitter cards, and the Google verification token.
- `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`, `public/manifest.webmanifest`.
- JSON-LD from `lib/structured-data.ts` (site entity in the root layout) and `Breadcrumbs`.
- Google Search Console and Bing Webmaster steps are manual production tasks (see the README).

## 12. Testing and CI

- `npm test` runs Vitest suites covering: navigation and internal links, services routing, SEO indexing, structured data, security hardening, form API validation, contact API, idempotency, rate limiting, Resend integration, observability, cookie consent, email preferences, accessibility and responsive rules, media SEO, performance, content shortening, and the service device showcase.
- `npm run test:e2e` runs Playwright (`e2e/public-flows.spec.ts`) against public user flows.
- GitHub Actions (`ci.yml`) runs on pushes and pull requests to `main`: `npm ci`, Playwright Chromium install, e2e tests, `tsc --noEmit`, ESLint, unit tests, and `npm run build`. Tests use mocked integrations and need no production credentials.

## 13. Deployment and operations

- Deploy from `main` to Vercel. Set the environment variables in section 8 first.
- Runtime logs (structured JSON) are the current monitoring target. Alerts, uptime monitoring, and external error tracking are not configured in code and must be set up in the hosting dashboard.
- Before merging layout changes, run `npm run lint`, `npm test`, and `npm run build`, then check `/`, `/blog`, `/careers`, and `/book-a-demo` at 375 px, 768 px, and 1440 px widths.

## 14. Common maintenance tasks

| Task | Where |
| --- | --- |
| Add or remove a careers role | `roles` array in `components/careers/BreezyOpenings.tsx` |
| Add a blog article | `lib/blog.ts` (native articles get a `/blog/[slug]` page) |
| Add or edit a service page | `lib/service-pages.ts` |
| Add a founder | `lib/founders.ts` |
| Change navigation | `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `lib/service-navigation.ts` |
| Retire a URL | Add a 301 in `next.config.ts` `redirects()` |
| Update site search | `public/search-index.json` |
| Change page-title spacing | Tokens in `app/globals.css` and `components/ui/PageHero.tsx` only |
