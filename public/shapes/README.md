# Shape assets

The Hero recreates the postcard composition. Until we have real vector art,
the shapes are approximated inline with Tailwind utilities and a placeholder
SVG path.

When the designer's source file is available, export each of these as its
own SVG to this directory:

- `lavender-circle.svg` — top-left dusty lavender circle
- `chartreuse-panel.svg` — chartreuse vertical panel (right of center)
- `teal-panel.svg` — teal vertical panel (far right)
- `maroon-blob.svg` — the dominant maroon organic shape
- `rust-shape.svg` — bottom-right rust/burnt-orange shape

Export guidelines:

- Optimize with SVGO (drop XML decl, comments, metadata).
- Single path per file where possible — easier to animate `pathLength`.
- Keep `viewBox` proportional to the original art; do NOT bake in width/height.
- Strip fill from the SVG and apply via Tailwind/CSS (`fill="currentColor"`)
  so the palette stays in one place.
- File size target: under 5 KB each.

After replacing the placeholders in `components/sections/Hero.tsx`, the Motion
variants will animate them automatically — no other changes needed.
