## Design System Guide page

Create a new route `/design-system` that documents the project's design tokens in a clean, developer-friendly layout inspired by Figma docs.

### Route & navigation
- New file: `src/routes/design-system.tsx` wrapped in `PageLayout`
- Add a "Design System" link in `SiteHeader` (optionally only in footer if you'd rather keep main nav clean — see open question)
- Per-route `head()` with title + description (no og:image)

### Page layout
- Two-column on desktop (`lg:grid-cols-[220px_1fr]`), single column on mobile
- Left: sticky sidebar (`sticky top-20`) with anchor links to each section (Typography, Colors, Shadows, Borders, design.md). Active section highlighted via `IntersectionObserver`
- On mobile: sidebar collapses into a horizontal scrollable top nav (sticky under header)
- Each section: `<section id="...">` with a large heading + short description + thin `border-b` divider

### Sections

**1. Typography**
Table with columns: Name · Font Family · Size · Weight · Line Height · Preview.
Scales: Display (3.5rem/Playfair/600), H1 (3rem), H2 (2.25rem), H3 (1.5rem), Body Large (1.125rem/DM Sans), Body (1rem), Caption (0.875rem/muted).
Preview cell renders sample text in the actual style.

**2. Colors**
Responsive grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`). Each card:
- Large filled swatch (h-32) using the token
- Token name (e.g. `--primary`)
- HEX (from `styles.css`)
- HSL (computed)
Groups: Brand (primary, primary-hover, accent), Neutrals (background, section, card, foreground, body, muted-foreground, border, footer), Semantic (success #2F7D4F, warning #C49A2C, error/destructive #B23A2A, info #2F6FA3 — added as fallbacks since project doesn't define them yet).

**3. Shadows**
Grid of cards. Each: a white box with the shadow applied, the name, and a `<code>` snippet.
Tokens: `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, plus the project's custom card hover shadow.

**4. Borders**
Grid showing: solid 1px, dashed, thick 2px, rounded-sm, rounded-md (13px — project radius), rounded-full. Each with name + CSS snippet.

**5. design.md code block**
Full markdown documentation rendered inside `<pre><code class="font-mono">` with a dark background. Sticky "Copy" button top-right using `navigator.clipboard.writeText`. Content includes markdown tables for all tokens above.

### Styling
- Reuse existing tokens from `src/styles.css` (no hardcoded colors except the new semantic ones)
- Monospace font: add `--font-mono: "JetBrains Mono", ui-monospace, monospace` to `styles.css` and use `font-mono` utility for all code snippets
- Section headings use existing `font-display`
- Code blocks: `bg-foreground text-background` for the design.md block; inline snippets use `bg-section` with `border`

### Technical notes
- Hex→HSL conversion done at module scope (small helper, ~15 lines)
- Copy button uses local `useState` for "Copied!" feedback
- Active-section tracking: single `IntersectionObserver` with `rootMargin: "-30% 0px -60% 0px"`
- No new dependencies

### Open questions
1. Add the link to the main header nav, or only to the footer (more common for internal docs)?
2. Should the semantic colors (success/warning/error/info) also be added as real CSS variables in `src/styles.css`, or only shown on this page as reference values?
