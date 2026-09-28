# Articog Website — Version 2

Official marketing website for **Articog**, an AI-native film and creative production company. This repository is **Version 2** of the site (Next.js). The earlier site, built on a previous stack, is preserved as **Version 1** in the `articog-dev/articog-website-v1` repository and is no longer the active codebase.

- Production: https://www.articog.com
- Repository: `articog-dev/articog-website-v2` (Version 2)
- Documentation: [Technical documentation](docs/TECHNICAL_DOCUMENTATION.md) · [Site map](docs/SITE_MAP.md)
- Google Sheet: [Articog Google Sheet](https://docs.google.com/spreadsheets/d/1FqK6pxYtBzuWUDBLrON_0IZSQoKrViYTCGbT4rFfhSg/edit?gid=0#gid=0)
- Calendly (demo booking): https://calendly.com/articog-media/30min

## Version history

| Version | Repository | Status |
| --- | --- | --- |
| Version 1 | `articog-dev/articog-website-v1` | Legacy, archived reference |
| Version 2 | `articog-dev/articog-website-v2` | Current, actively developed |

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.3 (App Router), React 19.2 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`), `tw-animate-css`, CSS design tokens in `app/globals.css` |
| UI primitives | Radix UI (accordion, checkbox, label, select, slot), `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` icons |
| Animation | GSAP 3, custom `FadeIn` / `SlideUp` / `ScrollReveal` components |
| Notifications | Sonner (toasts) |
| Fonts | Sora via `next/font/google` |
| Backend (API routes) | Next.js Route Handlers (`app/api/*`), Node runtime |
| Data / rate limiting | Upstash Redis (`@upstash/redis`) and `@upstash/ratelimit` |
| Email | Resend (REST API) |
| Lead mirror | Google Sheets (Apps Script web app URL) |
| Scheduling | Calendly popup widget on `/book-a-demo` |
| Careers | Static role list (`components/careers/BreezyOpenings.tsx`) with email applications |
| Newsletter | Beehiiv embedded form |
| Analytics | Google Analytics 4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) |
| Unit / integration tests | Vitest 2 |
| End-to-end tests | Playwright |
| Lint | ESLint 9 with `eslint-config-next` |
| CI | GitHub Actions (`.github/workflows/ci.yml`, Node 20) |
| Hosting | Vercel (runtime logs are the observability target); media served from `media.articog.com` |

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit and integration tests |
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run optimize:images` | Run `scripts/optimize-images.mjs` |

## Project structure

```
app/            Routes (App Router pages, API route handlers, sitemap.ts, robots.ts, globals.css)
components/     ui/ (design-system primitives), sections/ (page sections), layout/ (header, footer,
                menus), blog/, careers/, search/, seo/, animations/, newsletter/, analytics/
lib/            Content data, validation, rate limiting, idempotency, lead storage, email, logging
hooks/          React hooks
types/          Shared TypeScript types
public/         Static assets, manifest, robots.txt, llms.txt, search-index.json, posters, videos
scripts/        Build-time utilities
tests/          Vitest suites
e2e/            Playwright specs
docs/           Technical documentation and site map
```

## Key conventions

- **Page hero spacing.** Page titles use the shared `PageHero` / `PageHeroDetail` components and the spacing tokens `--header-offset` and `--spacing-title-gap` so every page has the same space above and below the H1. Do not add one-off spacing around page titles.
- **Design tokens** live in `app/globals.css` (`--spacing-*`, `--gap-*`, colors). Prefer tokens over hard-coded values.
- **Content data** for services, founders, and blog posts lives in `lib/` (`service-pages.ts`, `founders.ts`, `blog.ts`).
- **Careers roles** are a plain string array in `components/careers/BreezyOpenings.tsx`.
- **Redirects** for retired URLs are defined in `next.config.ts`.

## Documentation

- [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md): architecture, routing, data flow, API, security, testing, deployment.
- [docs/SITE_MAP.md](docs/SITE_MAP.md): every page and route of Version 2.

## Contact form configuration

The contact form requires these server-side environment variables:

- `GOOGLE_SHEETS_WEB_APP_URL` mirrors durably stored submissions to the existing Google Sheet.
- `RESEND_API_KEY` enables confirmation and internal alert emails.
- `CONTACT_FROM_EMAIL` is the verified sender address for those emails.
- `CONTACT_INTERNAL_ALERT_EMAIL` receives an alert when saving to Google Sheets fails. It defaults to `articog.media.01@gmail.com` and can be overridden for deployment.

Public form APIs use Upstash Redis for shared serverless rate limiting and durable lead storage. Configure:

- `UPSTASH_REDIS_REST_URL` is the Upstash Redis REST endpoint.
- `UPSTASH_REDIS_REST_TOKEN` authenticates rate-limit requests.

Requests are limited per platform-provided client IP and route. Lead records are stored under the `articog:lead:` keyspace with a generated ID, lead type, source, submission timestamp, and validated form fields. Google Sheets is a secondary mirror. If the shared store is unavailable or not configured, form APIs fail closed with a temporary-unavailable response rather than falling back to process-local memory.

Form retries use route-scoped HMAC fingerprints in the `articog:idempotency:` keyspace. Processing leases expire after 2 minutes; completed submissions are retained for 24 hours. Durable-storage failures release the lease so clients can retry, while successful durable writes prevent duplicate mirrors and notifications.

Server-side API and integration failures are emitted as JSON logs with safe event names, route/operation labels, request IDs, result/status fields, and bounded durations. Request bodies, credentials, provider response bodies, email addresses, and stack traces are excluded. No external error-monitoring provider is configured; Vercel/runtime log collection is the current observability target.

## Production monitoring

Implemented in code: structured operational logs, request IDs, generic API errors, and failure events for rate limits, Redis/storage, idempotency, Sheets, and Resend. Vercel runtime logs are the current production log destination; no Vercel alert rules or external incident integration are configured in this repository. Configure production alerts manually in the Vercel project for repeated API 5xx responses, Redis/storage failures, privacy notification failures, elevated 429 responses, and failed deployments. Configure GitHub notifications or repository rules separately for failed CI runs. Uptime monitoring and external error tracking are not currently configured.

GitHub Actions runs `npm ci`, installs the Playwright Chromium browser, `npm run test:e2e`, TypeScript checks, `npx eslint .`, `npm test`, and `npm run build` for pull requests and pushes to `main`. The workflow uses mocked test integrations and does not require production credentials.

The site-wide GA4 page-view and interaction tracking uses:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics 4 and should be set in the deployment environment when analytics are required.

## Google Search Console

After deploying to `https://articog.com`:

1. Add the production domain or URL-prefix property in Google Search Console.
2. Verify ownership using a Google-supported method configured for the production environment.
3. Submit `https://articog.com/sitemap.xml` under Sitemaps.
4. Use URL Inspection for the homepage and key canonical pages, then request indexing where appropriate.

Search Console verification is a production-account task and is not configured in this repository.

Repository readiness includes `app/sitemap.ts`, `app/robots.ts`, route metadata with canonical URLs, founder profile static params, and structured data. Dynamic `/services/[slug]` pages are not discovered by the filesystem sitemap collector; the static service category pages are included. Decide separately whether those dynamic service pages should become sitemap entries before adding them.

## Bing Webmaster Tools and IndexNow

After deploying the current production build:

1. Add `https://articog.com` to Bing Webmaster Tools.
2. Verify ownership using a supported Bing verification method.
3. Submit `https://articog.com/sitemap.xml` and use URL Inspection for important canonical pages.
4. To enable IndexNow later, generate a real production key, host the key at the required public URL, and submit changed canonical URLs to the IndexNow endpoint.
5. Verify IndexNow responses and the public key URL after deployment.

No Bing verification value, IndexNow key, or IndexNow integration is configured in this repository. Do not add one until the production key is generated and securely managed.

Bing verification, sitemap submission, URL inspection, and any IndexNow key hosting or submission remain manual production-account tasks.


