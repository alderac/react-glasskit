# Known Limitations

React GlassKit intentionally keeps a narrow public surface. These limitations
are part of the package design, not unfinished UI-kit work.

## Scope Boundaries

- GlassKit is not a complete UI kit.
- GlassKit is not an application shell framework.
- GlassKit is not a modal, dialog, popover, menu, or focus-trap manager.
- GlassKit is not a docking, tabbing, persistence, or drag-reorder system.
- GlassKit is not an animation engine or gesture library.
- GlassKit is not a Tailwind, shadcn/ui, Radix, or framework-specific adapter package.

## App Responsibilities

The consuming app owns:

- landmarks, headings, labels, and document structure
- focus order, focus restoration, and keyboard workflows
- modal/dialog semantics and focus traps
- routing, persistence, and layout composition
- final color contrast review after app-specific backgrounds and token overrides
- final WCAG, Section 508, VPAT, procurement, or product accessibility claims

GlassKit owns material-layer primitives, documented props, CSS token defaults,
CSS fallbacks, and the resizable separator behavior exposed by
`PanelSeparator` plus `useResizablePanels`.

## Environment Limits

GlassKit expects a React app with a bundler that supports CSS imports. Raw
Node.js scripts, server-only modules, and non-bundled runtimes are not supported
consumer environments for rendering GlassKit UI.

Git source dependencies are not the public v1 install path because the package
publishes compiled `dist` output and does not rely on checked-in build artifacts.
Install from npm for normal app usage.

## Visual Limits

Glass material depends on the content behind it. A surface over a flat or empty
background will look less glass-like than the same surface over layered,
high-contrast, or image-rich content.

Browsers without `backdrop-filter` support may render a flatter material. OS
accessibility preferences can also intentionally reduce transparency, motion, or
decorative contrast.

## Token Limits

`--glass-*` token names are public API when documented, but generated CSS Module
class names are not. Override documented tokens after importing
`react-glasskit/css/tokens.css`; do not target internal generated class names.
