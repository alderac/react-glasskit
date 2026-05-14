# Changelog

All notable changes to React GlassKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
