## Goal

Replace every occurrence of `producent` / `producenter` (any case) in `src/` with `gårdsförsäljare` / `gårdsförsäljare` equivalents, preserving Swedish capitalization and grammar. URL `/gardsforsaljare` is already in place — no route changes.

## Replacement rules (case-preserving)

| From | To |
|---|---|
| `Producenter` | `Gårdsförsäljare` |
| `producenter` | `gårdsförsäljare` |
| `Producentens` | `Gårdsförsäljarens` |
| `producentens` | `gårdsförsäljarens` |
| `Producenten` | `Gårdsförsäljaren` |
| `producenten` | `gårdsförsäljaren` |
| `Producent` | `Gårdsförsäljare` |
| `producent` | `gårdsförsäljare` |

Order matters — apply longest forms first (`Producenter` before `Producent`, `producentens` before `producenten` before `producent`) so shorter patterns don't truncate longer ones.

Compound words also get rewritten: `dryckesproducenter` → `dryckesgårdsförsäljare`, `egenproducerade` is left alone (different stem: "producera", not "producent").

## Files affected (from grep)

- `src/routes/gardsforsaljare.$slug.tsx` — meta title, og:title, notFound heading, back-link
- `src/routes/gardsforsaljare.index.tsx` — kicker, hero title, hero lead, search label, result count
- `src/routes/regioner.$slug.tsx` — meta title, og:description, count text, empty state
- `src/routes/regioner.index.tsx` — likely meta/copy (will verify)
- `src/routes/kategorier.$slug.tsx` — meta title/desc, count, empty state
- `src/routes/kategorier.index.tsx` — meta desc, og:desc, card meta `{c.count} producenter`
- `src/routes/karta.tsx` — hero title, lead, result count
- `src/routes/om-oss.tsx` — og:desc, hero lead, feature copy, body prose, "Är du producent?" CTA
- `src/routes/faq.tsx` — meta description, ~40 occurrences across question/answer strings, section title "Producenter och kategorier", "På plats hos producenten"
- `src/routes/blogg-nyheter.index.tsx` — og:desc, hero lead
- `src/routes/blogg-nyheter.$slug.tsx` — meta description fallback
- `src/components/FarmsMap.tsx` — popup link text "Visa producent →"
- `src/components/InfoBanner.tsx` — "dubbelkolla med producenten…"
- `src/routes/design-system.tsx` — any remaining "Producent" labels

## What does NOT change

- URLs / route file names (`/gardsforsaljare` already done)
- Data files (`src/data/site.ts`) — content data unaffected
- The verb form `producerade` / `egenproducerade` / `närproducerat` (different root)
- Variable names, type names, imports, comments

## Implementation approach

Single Node script run via `code--exec` that:
1. Walks `src/**/*.{ts,tsx}` (skip `routeTree.gen.ts`).
2. For each file, applies the 8 ordered regex replacements (whole words via `\b`).
3. Leaves `produc(era|erad|erade|erande|tion|ent-...code-identifiers)` untouched by anchoring on the exact stems above.
4. Writes file only if content changed; logs the diff count.

Then a verification grep confirms zero remaining `producent` matches in `src/` (excluding generated files and the verb stem).

Total expected edits: ~80 string replacements across ~14 files. No behavior, route, or type changes.