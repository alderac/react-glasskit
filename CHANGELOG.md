# Changelog

All notable changes to React GlassKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.21] - 2026-05-16

### Changed
- Clarified supported v1 install paths before and after npm publication.
- Added package lifecycle and release check scripts for pre-publish verification.

## [0.1.20] - 2026-05-19

### Added
- Added explicit light mode support through `.light` and `[data-theme="light"]`, matching the existing dark mode override path.
- Added component-level light and dark surface overrides so app theme toggles remain reliable across CSS load order differences.
- Added a demo light/dark mode toggle and a theme audit for forced theme selectors.

### Changed
- Documented system, forced light, and forced dark theme behavior across the README and docs.

## [0.1.19] - 2026-05-15

### Changed
- Relaxed the dist CSS import assertion to tolerate harmless bundler formatting while preserving the package contract.
- Clarified that the packed Next.js smoke fixture pins dependencies intentionally for reproducible PR CI.

## [0.1.18] - 2026-05-15

### Added
- Added PR-time CI for package checks, accessibility audit, packed Vite and Next smoke tests, and demo build.

### Changed
- Updated README and roadmap release-readiness guidance around actual v1 trust checks.

## [0.1.17] - 2026-05-15

### Added
- Added a packed Next.js consumer smoke test for public component, hook, and CSS token imports.

## [0.1.16] - 2026-05-15

### Added
- Added a CSS accessibility fallback audit for documented media-query and focus treatments.

### Changed
- Clarified GlassKit-owned versus consumer-owned accessibility responsibilities.
- Replaced the demo's hardcoded package version badge with version-neutral v1 positioning.

## [0.1.15] - 2026-05-15

### Changed
- Expanded the demo into a lightweight v1 docs surface with install guidance, workspace adoption path, recipe links, and package trust evidence.

## [0.1.14] - 2026-05-15

### Added
- Added copyable v1 recipes for a five-minute workspace, app shell, and canvas HUD.

### Changed
- Linked the recipes from README and getting-started guidance.

## [0.1.13] - 2026-05-15

### Added
- Added post-build package assertions for dist artifacts, CSS entry wiring, declaration exports, and package export paths.

## [0.1.12] - 2026-05-15

### Changed
- Reframed the README around GlassKit as a focused workspace material layer rather than a broad design system.
- Added clearer guidance for when to use GlassKit, when not to use it, and how it fits alongside broader React UI libraries.

## [0.1.11] - 2026-05-14

### Changed
- Updated README and getting-started guidance for the public `dist` package path, CSS token import, and v1 workspace hooks.

## [0.1.10] - 2026-05-14

### Changed
- Updated the GitHub Pages workflow so demo deploys are gated by package typecheck, tests, build, packed-package smoke test, and demo build.

## [0.1.9] - 2026-05-14

### Added
- Added a packed Vite consumer smoke test that verifies public package imports, type declarations, and CSS token imports from the npm tarball.

### Changed
- Kept source-path escape hatches in the package while excluding source test files from packed artifacts.

## [0.1.8] - 2026-05-14

### Changed
- Updated the demo to use `useActivePanel` and `useResizablePanels` for workspace focus and resize examples.
- Replaced the demo's ad hoc resize code sample with the public v1 hook path.

## [0.1.7] - 2026-05-14

### Added
- Added visible focus styling for resizable separators, including high-contrast focus treatment.
- Documented passive versus interactive `PanelSeparator` use and resizable separator accessibility responsibilities.

## [0.1.6] - 2026-05-14

### Added
- Added `useResizablePanels` with APG-oriented separator props, pointer resizing, keyboard resizing, and panel flex styles.

### Fixed
- Guarded resize behavior against stale constraints, pointer cancellation leaks, and zero-size pointer math.

## [0.1.5] - 2026-05-14

### Added
- Added pure resize math helpers for clamped panel sizing, pointer-derived percentages, and keyboard resize steps.

## [0.1.4] - 2026-05-14

### Added
- Added `useActivePanel` for workspace panel activation state, focused/inactive helpers, and activation callbacks.

## [0.1.3] - 2026-05-14

### Added
- Added the initial Vitest and React Testing Library harness for component behavior tests.
- Added focused tests for `GlassRegular`, `GlassPanel`, and `PanelSeparator`.

## [0.1.2] - 2026-05-14

### Added
- Added the initial public package build path with compiled `dist` output, generated declarations, and CSS assets.

### Changed
- Updated the default package entry and export map to resolve through `dist` while preserving source-path escape hatches.

## [0.1.1] - 2026-05-14

### Added
- **PanelSeparator `resizable` mode** — opt-in resize handle behavior with orientation-aware cursor, expanded hit target, and hover/active reveal.

### Fixed
- **GlassPanel focus layering** — focused panel rings now render above adjacent split-panel siblings.
- **PanelSeparator passive behavior** — default separators now remain passive visual dividers without resize cursor or hover reveal.
- **Demo fidelity** — component showcases now use stronger calibration backdrops, complete code samples, and syntax-colored snippets.

## [0.1.0] - 2026-05-14

### Added
- **CSS Design Tokens** — `tokens.css` with full `:root` custom properties for geometry, blur, saturation, opacity, animation, and surface colors
- **Dark mode** — dual support for system preference (`prefers-color-scheme`) and class-based (`.dark`, `[data-theme="dark"]`)
- **GlassRegular** — polymorphic `as` prop, medium-transparency navigation-layer glass
- **GlassClear** — high-transparency overlay glass with `dimmed` prop for media-rich backgrounds
- **GlassPanel** — workspace panel container with `focused`, `inactive`, and `animate` (crystallize) props
- **PanelSeparator** — spatial divider with `orientation` prop and automatic coarse-pointer hit target expansion
- **Accessibility fallbacks** — `prefers-reduced-transparency`, `prefers-reduced-motion`, `prefers-contrast: more`
- **Documentation** — getting-started guide, design token reference, accessibility guide, per-component reference
