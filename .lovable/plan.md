## Goal

Regenerate the filled icons in `src/assets/icons/` so each one looks like the Cpu example you pasted — true geometric stroke-to-path expansion (clean outlined paths with `fill-rule="evenodd"` for holes), not the potrace-traced blobs the current generator produces.

## Why the current output is wrong

`scripts/generate-filled-icons.mjs` uses `svg-outline-stroke`, which **rasterizes then traces** the SVG with potrace. That's why your current `heart.svg`, `map-pin.svg`, etc. have organic, slightly lumpy single paths instead of crisp outlined strokes with proper inner holes.

What you want (and what Inkscape's "Stroke to Path" does) is **geometric** outlining: take each stroked path and compute the exact polygon that the stroke would paint, preserving sharp corners, line caps, joins, and producing even-odd holes where strokes overlap.

## Approach

Replace the potrace pipeline with a real geometric stroke expander. Two viable options:

**Option A — Inkscape CLI (matches your reference exactly)**
- Install via `nix run nixpkgs#inkscape`
- For each Lucide source SVG, run:
  `inkscape --actions="select-all;object-stroke-to-path;export-plain-svg" --export-filename=out.svg in.svg`
- Then run SVGO to strip Inkscape/sodipodi metadata, remove `stroke*` attrs, force `fill="currentColor"`, add `fill-rule="evenodd"`, drop width/height, keep viewBox.
- Pros: exactly the algorithm + output style you referenced.
- Cons: heavier dependency (only at build time, not shipped).

**Option B — Pure JS with `paper-jsdom-canvas`**
- Use Paper.js `PathItem` API: parse each `<path>`, call `path.strokeWidth = N; path = path.toPath()` then boolean-union overlapping outlines.
- Pros: no native binary, runs anywhere bun runs.
- Cons: subtle differences from Inkscape on line joins; needs more glue code.

**Recommendation: Option A.** It is what your reference SVG was produced with, so output will match the Cpu example's character (sharp corners, `fill-rule="evenodd"`, two-path structure for icons with holes like `Circle`, `MapPin`, `Tag`, `Info`).

## Changes

1. **Rewrite `scripts/generate-filled-icons.mjs`**
   - Drop `svg-outline-stroke` + `optTolerance` config.
   - For each icon in `NAMES`: copy `lucide-static/icons/<kebab>.svg` to a temp file, invoke Inkscape with `select-all;object-stroke-to-path;export-plain-svg`, read the result.
   - Pipe through SVGO with these plugins:
     - `preset-default` (keep viewBox)
     - `removeDimensions`
     - `removeAttrs` for `(stroke.*|sodipodi:.*|inkscape:.*|xmlns:sodipodi|xmlns:inkscape|id|class)`
     - Custom plugin: set `fill="currentColor"` on root `<svg>`, add `fill-rule="evenodd"` to every `<path>`, delete inner `fill="black"` / `fill="#000"`.
   - Write to `src/assets/icons/<kebab>.svg`.
   - Regenerate `index.ts` (unchanged shape).

2. **No changes to `src/routes/design-system.tsx`**
   - It already imports `filledIcons` and renders each via `dangerouslySetInnerHTML`. Once the underlying SVG files are regenerated, the Icons section and the "Download all SVG (.zip)" button automatically serve the new geometry. Color still inherits via `text-primary` on the wrapper.

3. **No runtime dependency changes**
   - `jszip` stays. `svg-outline-stroke` can be removed from `package.json` (build-time only). Inkscape is invoked via `nix run` — not added to `package.json`.

## Acceptance check

After regenerating, spot-check 4 icons by opening the new SVG files and confirming:
- Root `<svg>` has `fill="currentColor"`, viewBox preserved, no width/height.
- Paths have `fill-rule="evenodd"` where the icon has holes (e.g. `circle`, `map-pin`, `info`, `tag`).
- No `stroke`, `stroke-width`, `stroke-linecap`, `sodipodi:*`, or `inkscape:*` attributes anywhere.
- Visual: open `/design-system#icons` in preview and confirm icons look like crisp outlined strokes (not blobby traces), matching the Cpu reference's character.

## Open question

Want me to also bake `fill="currentColor"` into the **inner paths** explicitly (Cpu example does this on each `<path>`), or keep it only on the root `<svg>` and let inheritance handle it? Root-only is cleaner; per-path matches your reference byte-for-byte. I'll default to per-path to match your example unless you say otherwise.
