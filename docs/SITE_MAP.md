# Articog Website (Version 2): Site Map

Base URL: https://www.articog.com. Routes come from the `app/` directory. "Redirect" means the URL returns a 301 and is not a page.

## Primary navigation

| Menu | Destination |
| --- | --- |
| Services (dropdown) | `/services` and its sub-pages, plus the solutions pages |
| Industries | `/industries` |
| Work | `/work` |
| Why Articog | `/why-articog` |
| Blog | `/blog` |
| Company (dropdown) | `/about`, `/careers`, `/press`, `/help`, `/contact` |
| Book a Demo (button) | `/book-a-demo` |

## 1. Home

| Route | Page |
| --- | --- |
| `/` | Home (hero video, capabilities, pipeline, case studies, CTA) |

## 2. Services

| Route | Page |
| --- | --- |
| `/services` | Services overview |
| `/services/ai-video-production` | AI Video Production |
| `/services/ad-creative` | Ad Creative |
| `/services/social-creative` | Social Creative |
| `/services/product-visuals` | Product Visuals |
| `/services/audio` | Audio & Sound |
| `/services/creative-strategy` | Creative Strategy & Concepting |
| `/services/post-production` | Post-Production |
| `/services/[slug]` | Not reachable: all 37 slugs redirect (301) to a category page above |

Legacy service slugs (`lib/service-pages.ts`), all redirected in `next.config.ts`: brand-films, product-commercials, performance-ads, social-reel-production, product-launch-videos, localization-variants, performance-video-ads, testing-variants, campaign-key-visuals, monthly-social-content, creative-repurposing, product-visual-content, ai-product-photography, custom-image-libraries, ecommerce-visuals, ai-voiceover, music-sound-design, campaign-strategy, concept-development, storyboarding-previs, motion-graphics, ai-post-production, upscaling-mastering, ai-compositing, video-editing, commercials, product-films, explainers, paid-ads, ugc-style-creative, reels-short-form, creative-variants, campaign-imagery, ooh-display, social-assets, creative-automation, multi-format-adaptation.

Note: `app/sitemap.ts` still lists these 37 URLs in sitemap.xml even though they redirect; remove them from the XML sitemap.

## 3. Solutions

| Route | Page |
| --- | --- |
| `/solutions` | Solutions overview |
| `/solutions/monthly-creative-subscription` | Monthly Subscription |
| `/solutions/performance-marketing` | Performance Marketing |
| `/solutions/enterprise` | Enterprise Solutions |
| `/solutions/product-launch` | Product Launch |
| `/solutions/creative-team-overflow` | Creative Team Overflow |

## 4. Industries

| Route | Page |
| --- | --- |
| `/industries` | Industries overview with anchors: `#dtc-ecommerce`, `#saas-technology`, `#automotive-mobility`, `#food-beverage`, `#fashion-lifestyle`, `#real-estate`, `#consumer-electronics`, `#beauty-skincare` |

## 5. Work

| Route | Page |
| --- | --- |
| `/work` | Portfolio overview |
| `/work/video-ads` | Video ads |
| `/work/social` | Social content |
| `/work/product-visuals` | Product visuals |
| `/work/industries` | Redirect to `/industries` |

## 6. Why Articog and how it works

| Route | Page |
| --- | --- |
| `/why-articog` | Overview with sections `#production-economics`, `#how-it-works`, `#trust` |
| `/how-it-works/ai-creative-pipeline` | AI creative pipeline |
| `/compare/vs-traditional-production` | Comparison with traditional production |
| `/compare/vs-ai-tools` | Comparison with AI tools |
| `/why-articog/production-economics` | Redirect to `/why-articog#production-economics` |
| `/how-it-works` | Redirect to `/why-articog#how-it-works` |
| `/trust` | Redirect to `/why-articog#trust` |

## 7. Trust

| Route | Page |
| --- | --- |
| `/trust/ai-and-ip` | AI and IP |
| `/trust/data-handling` | Data handling |
| `/trust/rights-licensing` | Rights and licensing |
| `/trust/security` | Security |

## 8. Blog

| Route | Page |
| --- | --- |
| `/blog` | Blog list with All / Articles / Videos filter (7 entries) |
| `/blog/how-ai-creative-teams-ship-faster-without-sacrificing-brand-quality` | Native article |
| `/blog/the-4-systems-behind-high-velocity-campaign-production` | Native article |
| External cards | 5 entries linking out (4 Medium, 1 YouTube) |

## 9. Company

| Route | Page |
| --- | --- |
| `/about` | About Articog |
| `/about/founder/sai-teja-inampudi` | Founder profile |
| `/about/founder/dr-harika-govada` | Founder profile |
| `/founder-leadership` | Founder and leadership |
| `/careers` | Careers: 6 open roles (AI Business Development Analyst, AI Visual Designer, AI Filmmaker, AI Video Editor & Generator, AI Engineer, Software Developer) |
| `/press` | Press and media |
| `/help` | Help center |
| `/contact` | Contact form |
| `/newsletter` | Newsletter signup (Beehiiv) |

## 10. Conversion pages

| Route | Page |
| --- | --- |
| `/book-a-demo` | Demo request form with Calendly scheduling |
| `/thank-you` | Confirmation (excluded from sitemap.xml) |
| `/thank-you/demo` | Demo confirmation (excluded from sitemap.xml) |

## 11. Legal and privacy

| Route | Page |
| --- | --- |
| `/privacy-policy` | Privacy policy |
| `/privacy/california` | California privacy notice |
| `/privacy/request` | Privacy request form |
| `/privacy-choices` | Privacy choices |
| `/legal/terms-of-service` | Terms of service |
| `/legal/cookie-policy` | Cookie policy |
| `/legal/accessibility` | Accessibility statement |
| `/copyright` | Copyright |

## 12. Utility and system routes

| Route | Purpose |
| --- | --- |
| `/sitemap` | HTML sitemap page (excluded from sitemap.xml) |
| `/sitemap.xml` | Generated XML sitemap (`app/sitemap.ts`) |
| `/robots.txt` | Generated robots file (`app/robots.ts`) |
| `/llms.txt`, `/manifest.webmanifest`, `/search-index.json` | Static files in `public/` |
| `not-found`, `error` | 404 and error boundaries |

## 13. API routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/demo` | POST | Demo request submissions |
| `/api/contact` | POST | Contact form submissions |
| `/api/privacy-request` | POST | Privacy request submissions |

## 14. Retired URLs (301 redirects)

`next.config.ts` redirects old service, solution, industry, pricing (`/pricing*` to `/book-a-demo`), resource (`/resources`, `/guides`, `/playbooks`, `/reports`, `/events` to `/blog`), customer (`/customers`, `/ai-ad-library` to `/work`), legal (`/privacy`, `/accessibility`, `/legal/*` to current pages), and compare URLs to their current equivalents.
