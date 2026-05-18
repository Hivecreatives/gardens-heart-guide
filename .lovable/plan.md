# Add Pages section to Design System

Add a new "Pages" section in `src/routes/design-system.tsx` that maps all routes in the site. Dynamic routes (`$slug`) are represented by a single example link using the first item from the corresponding data array.

## Section data

Static routes:
- `/` — Hem
- `/kategorier` — Kategorier
- `/regioner` — Regioner
- `/producenter` — Producenter
- `/karta` — Karta
- `/blogg-nyheter` — Blogg & Nyheter
- `/om-oss` — Om oss
- `/faq` — FAQ
- `/kontakt` — Kontakt
- `/design-system` — Design System

Dynamic routes (first item only, imported from `@/data/site`):
- `/kategorier/$slug` → first `categories[0].slug` (e.g. `/kategorier/ol`)
- `/regioner/$slug` → first `regions[0].slug`
- `/producenter/$slug` → first `farms[0].slug` (e.g. `/producenter/wine-mechanics`)
- `/blogg-nyheter/$slug` → first `articles[0].slug`

## Implementation

1. Import `categories, regions, farms, articles` from `@/data/site`.
2. Build a `pages` array: `{ label, path, route, type: 'static' | 'dynamic', example? }`.
3. Add `{ id: "pages", label: "Pages" }` to the `sections` array (place before `design-md`).
4. Render a new `<section id="pages">` with `SectionHeading` and a clean table:
   - Columns: Page, Route pattern, Example URL, Open
   - Static rows show route pattern in `Route`, `—` in Example.
   - Dynamic rows show `/foo/$slug` in Route and the resolved `/foo/<first-slug>` in Example.
   - "Open" column = anchor link `<a href={example} target="_blank">↗</a>` styled like other monospace cells.
5. Keep styling consistent with the existing Typography table (`rounded-lg border bg-card`, `bg-section` thead, `font-mono text-xs text-body` for code-like cells).
6. Update the `buildDesignMd()` output to include a `## Pages` markdown table so the copyable `design.md` stays complete.

No other files change. No new dependencies.
