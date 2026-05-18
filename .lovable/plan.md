## Icons section on `/design-system`

Add a new "Icons" section that lists every `lucide-react` icon used in the project, rendered as **filled** SVGs (strokes expanded to paths, `fill="currentColor"`, no stroke attributes), with a **Download all (.zip)** button.

### 1. Inventory (33 icons in use)

Scanned all `import { ... } from "lucide-react"` across `src/`:

`ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Check, ChevronDown, ChevronDownIcon, ChevronLeft, ChevronLeftIcon, ChevronRight, ChevronRightIcon, ChevronUp, Circle, Copy, ExternalLink, Globe, GripVertical, Heart, Info, Mail, Map, MapPin, Menu, Minus, MoreHorizontal, Navigation, PanelLeft, Phone, Search, Sprout, Tag, Users, X`

(The `*Icon`-suffixed names are aliases of the same icon — they'll be de-duplicated by underlying icon name.)

### 2. Stroke → fill conversion (build-time)

Lucide icons are stroke-only. Expanding strokes into filled outlines (matching what Inkscape's "Stroke to Path" does) requires real path-offsetting geometry, which is not feasible to do reliably in pure browser JS without a heavy lib. We'll do it **once at build time**:

- New script: `scripts/generate-filled-icons.mjs`
- Dependencies: `svg-outline-stroke` (uses `paper-jsdom` under the hood — exactly Inkscape-style stroke-to-path) + `svgo` (cleanup)
- Process per icon:
  1. Pull the source SVG from `lucide-static/icons/<kebab-name>.svg`
  2. Run through `svg-outline-stroke` to convert all strokes into filled paths
  3. Run `svgo` to: drop `stroke*` attributes, strip `sodipodi:*` / `inkscape:*` namespaces and metadata, merge paths, set `fill="currentColor"` on the root
  4. Write to `src/assets/icons/<kebab-name>.svg`
- Emit a tiny `src/assets/icons/index.ts` exporting `{ name, kebab, raw }` for each so the route can import them statically (no glob runtime cost).

Script runs manually via `bun run scripts/generate-filled-icons.mjs` (also added as `"icons:build"` in `package.json`). Generated files are committed.

### 3. New section on `/design-system`

Add to the `sections` array: `{ id: "icons", label: "Icons" }`.

Layout inside `<section id="icons">`:

- Section header (reuse `<SectionHeading />`) — title "Icons", description noting "Lucide icons, stroke expanded to filled paths, `fill=currentColor`".
- Toolbar row:
  - Search input (filter by name, client-side)
  - **Download all SVG (.zip)** button (right-aligned, primary style)
- Grid: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3`
  - Each card: filled-SVG preview (h-12, color = `text-primary` so the stroke color matches the site's brand green), icon name below in mono, hover state reveals a "Copy SVG" mini-button.

The SVGs render via `dangerouslySetInnerHTML` from the imported raw strings; because the root has `fill="currentColor"`, Tailwind `text-primary` controls the color exactly like in the rest of the site.

### 4. Download-all (.zip)

- Add `jszip` dependency.
- Button handler builds a zip in-memory: each entry `<kebab-name>.svg` containing the generated filled SVG, then triggers download via a blob URL + temporary `<a download="lucide-filled-icons.zip">`. Loading state on the button while zipping.

### 5. design.md addendum

Append an "Icons" section to the generated `design.md` listing the icon names and noting that filled SVGs ship under `src/assets/icons/`.

### Technical notes

- All new code is presentation-layer; no routes/data changes elsewhere.
- No network calls — icons are bundled.
- The conversion script is the only Node-only piece; it never ships to the browser. Browser only sees the pre-generated SVG strings + JSZip.
- Stroke color in the preview = `currentColor` driven by `text-primary` (#336645), matching the rest of the site exactly.

### Open questions

1. **Color in the downloaded SVG files**: leave as `fill="currentColor"` (recommended — user picks color when consuming), or bake the site's primary `#336645` into each SVG?
2. Should the icons grid include the **aliased** `*Icon` names as separate entries, or deduplicate to a single card per underlying icon?
