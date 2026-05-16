# Roadmap

React GlassKit is moving toward a public, workspace-first material layer for glass-style React application layouts. This roadmap is directional, not a release contract. Details may change as the package is tested in real applications.

## Near-Term Direction

- Keep the core component API small and stable.
- Focus the library around workspace-style interfaces: panels, sidebars, separators, overlays, and focused/inactive states.
- Improve the package path for public npm use, including conventional build output, type declarations, and CSS exports.
- Expand the demo into a lightweight docs experience with install guidance, component examples, and copyable recipes.
- Make accessibility support visible through documented fallbacks, tested behavior, and clear consumer responsibilities.

## V1 Priorities

- Keep the public API focused on primitives, hooks, tokens, and documented CSS paths.
- Make the first adoption path obvious through the workspace-in-five-minutes recipe.
- Provide copyable recipes for app shells, workspace panels, and canvas-style overlays.
- Keep accessibility support visible through tested behavior, CSS fallback audits, and clear consumer responsibilities.
- Verify public imports, CSS paths, TypeScript declarations, and packed-package installs in Vite and Next.js consumers.
- Keep public documentation grounded in what the package actually verifies.

## Later Possibilities

- Promote proven recipes into exported layout components when they add more than naming convenience.
- Add deeper examples for Next.js and other common React application setups.
- Broaden visual testing and accessibility verification as the package matures.
- Explore additional material presets if they remain compatible with the core token system.
- Consider richer docs navigation once the public API grows enough to need it.

## Not In Scope

- A full application shell framework.
- Complex docking, tabbing, persistence, or arbitrary workspace composition.
- Blanket accessibility certification for consuming applications.
- Large semantic component catalogs before the underlying patterns have been proven.

## Accessibility Posture

GlassKit aims to make glass UI safer by default, but consuming applications remain responsible for final accessibility outcomes. The library can provide tested primitives, documented fallbacks, and accessible interaction patterns. App teams still own semantic structure, labels, keyboard flows, focus management, content contrast, and any formal WCAG, Section 508, or procurement claims.
