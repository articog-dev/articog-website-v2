# Articog Component Inventory and Source Mapping

Date: 2026-09-10

## Governing decision

Use the official shadcn/ui component patterns for generic UI primitives and use 21st.dev only as a source/reference for marketing composition patterns where it adds value. Keep Articog-specific content, media, animation, routing, analytics, and provider integrations intact. 21st.dev components are source code rather than a runtime dependency, so no 21st.dev package is required.

## Global typography system

- **Fonts:** Sora for display/headings; Inter for body and UI.
- **H1:** `type-h1`, fluid 36px mobile to 64px desktop, weight 600, line-height 1.08.
- **H2:** `type-h2`, fluid approximately 30px mobile to 48px desktop, weight 600, line-height 1.14.
- **H3/card:** `type-h3`, 18px mobile to 20px desktop, weight 600, line-height 1.3.
- **H4:** `type-h4`, 16px mobile to 18px desktop, weight 600, line-height 1.35.
- **Body:** `type-body`, 16px, line-height 1.6.
- **Body large:** `type-body-lg`, 18px, line-height 1.6.
- **Small:** `type-small`, 14px, line-height 1.5.
- **Label/eyebrow:** `type-label`, 11px, weight 600, uppercase, 0.16em tracking.
- **Buttons:** shared shadcn Button with Inter, 14px for compact/default, 16px for large.
- **Navigation:** Inter, 13px desktop and 14px mobile, medium weight.
- **Captions/metadata:** Inter, 14px or 11px label depending on context.

## Component mapping

| Component | Current implementation | shadcn/ui equivalent | 21st.dev reference | Decision | Pages affected |
|---|---|---|---|---|---|
| Button | `components/ui/Button.tsx` | Button | Button patterns | Keep and align with shadcn API/classes | Site-wide |
| Accordion/FAQ | `components/ui/accordion.tsx` using Radix | Accordion | FAQ/accordion blocks | Keep; already shadcn/Radix-derived | Help, service FAQ |
| Card | Route-local bordered divs | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | Cards & grids | Add shadcn Card primitives; migrate high-value repeated card surfaces incrementally | Blog, trust, work, capabilities |
| Badge/label | Route-local spans and paragraphs | Badge | Badge/chip patterns | Add shadcn Badge; use for status/category metadata where appropriate | Blog, work, careers |
| Alert | Route-local status/error blocks | Alert | Alert blocks | Add shadcn Alert primitives for reusable status messaging | Forms, error states |
| Input | Route-local `<input>` classes | Input | Form field patterns | Add shadcn Input and use in shared contact/privacy form controls | Contact, privacy request |
| Textarea | Route-local `<textarea>` classes | Textarea | Form field patterns | Add shadcn Textarea and use in shared contact form | Contact |
| Select | Native route-local `<select>` | Select | Select/filter patterns | Keep native select where browser-native form behavior is required; add shadcn Select for custom UI only when a current route needs it | Contact/form routes |
| Dialog/modal | Custom image lightboxes in `HomeVisualShowcase`, `CreativeDocument` | Dialog | Gallery/lightbox patterns | Keep custom media interaction because it owns keyboard/animation/image behavior; align structure to shadcn Dialog semantics without replacing media logic | Home, Work |
| Dropdown/navigation menu | Custom Header desktop dropdown panels | Dropdown Menu / Navigation Menu | Navigation/header patterns | Retain custom mega-menu because it is content/navigation-specific; use shadcn semantics as reference | Header, all routes |
| Mobile navigation | Custom `MobileMenu.tsx` | Sheet / Navigation Menu | Mobile navigation patterns | Retain custom menu to preserve existing route grouping and behavior; add shared primitive only if behavior is changed later | All routes |
| Tabs | No shared implementation found | Tabs | Tabbed marketing blocks | No current usage; do not add unused UI | None |
| Table | Route-local semantic tables/content grids | Table | Data table patterns | Add Table primitive only for future true tables; do not rewrite content grids as tables | Legal/content routes |
| Hero | `components/sections/Hero.tsx` | No direct shadcn primitive | 21st.dev hero/marketing blocks | Retain Articog hero and animation; use centralized typography | Home |
| Section heading | `Heading.tsx` | Typography/heading patterns | 21st.dev section heading patterns | Keep Articog wrapper; separate semantic tag from visual size and use global tokens | Site-wide |
| Text/body | `Text.tsx` plus route-local classes | Typography patterns | 21st.dev type scale patterns | Keep wrapper and global tokens; migrate repeated body classes over time | Site-wide |
| Container/Section | `Container.tsx`, `Section.tsx` | Layout primitives are not official shadcn components | 21st.dev section/container patterns | Retain because they are layout foundations, not replaceable widgets | Site-wide |
| Header/footer | `Header.tsx`, `Footer.tsx` | Navigation Menu, Sheet, separator patterns | 21st.dev navigation/footer blocks | Retain Articog-specific IA and links; normalize typography and primitive usage without changing routes | Site-wide |
| Feature sections | Shared sections and route-local markup | Card/Accordion/Button as applicable | 21st.dev feature sections | Retain Articog compositions; normalize primitives and type tokens | Services, solutions, trust |
| CTA | `FinalCTA.tsx` and route-local CTAs | Button/Card patterns | 21st.dev CTA blocks | Retain Articog CTA destinations and copy; use shared Button and typography | Site-wide |
| Blog | `BlogFilterList.tsx`, blog route components | Card, Badge, Input if filtering expands | 21st.dev editorial/card patterns | Keep content logic; use Card/Badge primitives for repeated post surfaces | Blog |
| Case studies | `CaseStudies.tsx` and route-local cards | Card, Badge | 21st.dev case-study/card patterns | Keep Articog metrics/content; use Card primitives without changing claims or layout | Home, Work |
| Trust | Trust route cards and detail sections | Card, Badge, Alert | 21st.dev trust/feature patterns | Keep content and links; normalize repeated cards | Trust |
| Work/portfolio | `CreativeDocument`, `WorkVideoShowcase`, route-local cards | Card, Dialog | 21st.dev gallery/card patterns | Keep custom visual collage and video embed; use generic primitives only around metadata/cards | Work |
| Loading states | Next.js loading/error boundaries and route-local states | Skeleton, Spinner | 21st.dev loading patterns | Add/use Skeleton only where a loading state exists; do not add unused components | Careers/forms |
| Error states | `app/error.tsx`, `app/not-found.tsx`, `NotFound.tsx` | Alert, Button | 21st.dev not-found page reference | Keep Articog error content; use shared Button/Alert semantics | Error routes |
| Empty states | No standalone shared empty-state component found | Empty | 21st.dev empty-state patterns | No current generic usage; document only, do not add unused UI | None |
| Toasts | `sonner` integration | Sonner | Toast patterns | Keep existing provider/library because it is already used and functional | Contact/forms |
| Analytics/provider components | Google Analytics, Breezy, Beehiiv | Not UI primitives | Not applicable | Retain unchanged | Integrations |

## Approved implementation scope

1. Extend the centralized typography system with H4, navigation, caption, and metadata tokens.
2. Make `Heading` semantic level and visual size independently controllable.
3. Add shadcn-derived generic primitives that are directly relevant: Card, Badge, Alert, Input, Textarea, and Table.
4. Preserve custom Hero, Header mega-menu, MobileMenu, Footer, media lightboxes, video showcase, analytics, forms' business logic, and provider integrations.
5. Migrate the highest-impact repeated card and form surfaces only where the primitive replacement is behavior-preserving.
6. Do not add Tabs, Dialog, Dropdown, Select, Skeleton, or Empty implementations unless an existing route actually needs them; document these as available mappings rather than adding dead code.

## Source references reviewed

- shadcn/ui Button: https://ui.shadcn.com/docs/components/button
- shadcn/ui Card: https://ui.shadcn.com/docs/components/card
- shadcn/ui Accordion: https://ui.shadcn.com/docs/components/accordion
- shadcn/ui Dialog: https://ui.shadcn.com/docs/components/dialog
- shadcn/ui Dropdown Menu: https://ui.shadcn.com/docs/components/dropdown-menu
- shadcn/ui Tabs: https://ui.shadcn.com/docs/components/tabs
- shadcn/ui Table: https://ui.shadcn.com/docs/components/table
- shadcn/ui Input: https://ui.shadcn.com/docs/components/input
- shadcn/ui Textarea: https://ui.shadcn.com/docs/components/textarea
- shadcn/ui Select: https://ui.shadcn.com/docs/components/select
- 21st.dev component registry: https://21st.dev/

## Implementation update

### Verified shadcn/Radix adoptions

- `Button`, `Accordion`, `Card`, `Alert`, `Input`, `Textarea`, and `Table` are implemented in the shared UI layer using the shadcn/Radix composition style.
- Added and adopted `Label`, `Checkbox`, and `Select` because existing normal form controls required them.
- `Input` is used by Book a Demo, Contact, and Privacy Request.
- `Textarea` is used by Contact and Privacy Request.
- `Select` is used by Book a Demo, Contact, and Privacy Request.
- `Checkbox` is used by the Book a Demo service-interest controls.
- `Alert` is used by Contact errors.
- `Table` is used by both comparison routes.
- `Card` is now used by the Trust card grid. Other complex media surfaces remain custom.

### 21st.dev source status

No 21st.dev component source body was available through the accessible public page output. The named public component pages reviewed were:

- `Vercel Hero` by Ali Imam: https://21st.dev/@designali-in/components/vercel-hero
- `Footer Section` by Efferd UI: https://21st.dev/@sshahaider/components/footer-section
- `Not Found Page` by Efferd UI: https://21st.dev/@sshahaider/components/not-found-page-1

These pages exposed usage contracts, authorship, dependencies, and source references, but not copyable source code in the available response. Existing Articog Hero and NotFound components remain custom to avoid falsely attributing source or damaging site-specific behavior.

### Verified 21st.dev components adopted

The catalog pages subsequently exposed usable published component implementations and exact source URLs. These two components were actually adapted into the project:

| Articog file | 21st.dev component | Source | Adaptation |
|---|---|---|---|
| `components/layout/Footer.tsx` | Tailark `Footer` | https://21st.dev/@meschacirung/components/footer | Adopted the published five-column/grid footer structure and bottom utility row. Preserved Articog's existing logo text, navigation arrays, social URLs, legal links, dark palette, and typography. |

The existing Articog Hero, Header, MobileMenu, media galleries, and CTA behavior were not replaced because they contain site-specific functionality or because no verified source implementation was needed to preserve them safely.

### Remaining typography exceptions

- Raw route-local `text-3xl`, `text-4xl`, and `text-xl` classes remain in older content sections. Global heading selectors enforce the centralized computed H1-H4 scale, but source-level migration remains incomplete.
- `text-[10px]` and `text-[11px]` remain for labels and metadata.
- Large inline metric sizes remain for case-study statistics and are intentional data-display exceptions.
- `leading-none` remains on compact icon/plus controls.
- Custom navigation/menu sizes remain intentional UI-specific exceptions.

### Remaining custom UI surfaces

- Header mega-menu and MobileMenu remain custom because their route grouping, hover persistence, and responsive behavior are Articog-specific.
- Home visual lightbox, CreativeDocument modal, YouTube embeds, BlogFilterList, WorkVideoShowcase, BreezyOpenings, BeehiivForm, GoogleAnalytics, Cal.com, and related provider integrations remain custom/provider-specific.
- Native hidden honeypots remain intentionally native.
 - Complex service, solution, comparison-grid, work, blog, and case-study surfaces still contain route-local card markup and are not forced into Card where doing so would alter their current structure.
