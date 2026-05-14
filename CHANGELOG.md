# Changelog

All notable changes to React GlassKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
