# Accessibility

React GlassKit implements all three mandatory OS accessibility media queries automatically. No configuration is required in consuming applications — the fallbacks are embedded directly in `glass.module.css`.

## 1. `prefers-reduced-transparency`

**Behavior:** Fully disables `backdrop-filter` and reverts all glass surfaces to solid, opaque backgrounds.

```
User sets: Settings → Accessibility → Reduce Transparency
```

| Surface | Fallback Background |
|---------|-------------------|
| GlassRegular | `var(--glass-solid-bg)` — `rgb(245,245,245)` light / `rgb(17,20,35)` dark |
| GlassClear | `var(--glass-solid-bg-alt)` — `rgb(240,240,240)` light / `rgb(22,26,42)` dark |
| GlassPanel | `var(--glass-solid-bg)` — same as Regular |

The `clearDimmed` overlay is also hidden, as it's no longer meaningful without the blur.

## 2. `prefers-reduced-motion`

**Behavior:** Disables the `crystallize` materialization animation on GlassPanel. All CSS transitions are also removed so state changes (focus, inactive) snap instantly.

```
User sets: Settings → Accessibility → Reduce Motion
```

> **Note:** The `animate` prop on GlassPanel continues to be safe to use — it produces no animation when reduced motion is active.

## 3. `prefers-contrast: more`

**Behavior:** Replaces translucent, hint-style decorations with solid, high-contrast equivalents.

| Element | High Contrast Treatment |
|---------|------------------------|
| All borders | `2px solid var(--glass-high-contrast-border)` |
| All shadows | Removed (`box-shadow: none`) |
| PanelSeparator | `opacity: 1`, solid border color |
| Focus ring on GlassPanel | `0 0 0 3px var(--glass-high-contrast-focus)` |

## Responsibility Matrix

| Area | GlassKit Owns | Consuming App Owns |
|------|---------------|--------------------|
| Glass fallbacks | CSS media-query fallbacks for reduced transparency, reduced motion, and increased contrast | Final review of content contrast after app-specific tokens and backgrounds |
| Focus visuals | Focus treatment for `GlassPanel` and resizable `PanelSeparator` | App-level focus order, focus restoration, and skip-link behavior |
| Resizable separators | APG-oriented separator props from `useResizablePanels` | Meaningful `aria-label`, panel semantics, and workflow-specific keyboard paths |
| Recipes | Copyable accessible starting points | Product-specific landmarks, headings, labels, and validation |
| Compliance claims | Evidence of package behavior | Final WCAG, Section 508, VPAT, procurement, and product claims |

## Resizable Workspace Separators

Interactive resize behavior follows the WAI-ARIA APG Window Splitter pattern when `PanelSeparator` is paired with `useResizablePanels`.

GlassKit supplies:

- `role="separator"`
- keyboard focus through `tabIndex={0}`
- `aria-orientation`
- `aria-controls`
- `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`
- arrow-key, Home, End, PageUp, and PageDown resizing
- visible focus styling for the resizable separator

Consumers supply:

- the separator's accessible name
- panel content semantics
- app-level focus management after a resize
- final page-level WCAG or Section 508 claims

## Evidence Summary

Current package confidence comes from:

- component tests for public class/state behavior
- hook tests for active panel state, resize math, pointer resize, and keyboard resize
- `npm run build`, which emits package JS, declarations, and CSS assets
- `npm run smoke:package`, which installs the packed package into a generated Vite app
- `npm run audit:css`, which verifies the documented CSS fallback rules remain present

## Overriding Fallback Colors

All fallback colors are CSS custom properties. Override them per-theme in your global stylesheet:

```css
/* Custom high-contrast focus color */
:root {
  --glass-high-contrast-focus: rgb(0, 100, 255);
}
```

## Testing Accessibility

### macOS
- **Reduce Transparency**: System Settings → Accessibility → Display → Reduce Transparency
- **Reduce Motion**: System Settings → Accessibility → Display → Reduce Motion
- **Increase Contrast**: System Settings → Accessibility → Display → Increase Contrast

### Windows
- **Reduce Transparency**: Settings → Personalization → Colors → Transparency effects (off)
- **Reduce Motion**: Settings → Accessibility → Visual effects → Animation effects (off)
- **High Contrast**: Settings → Accessibility → High contrast

### Browser DevTools (Chromium)
Open DevTools → Rendering panel → Emulate CSS media feature → select the relevant query.
