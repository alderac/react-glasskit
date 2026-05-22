# React GlassKit

A small React material layer for building glass-style workspace interfaces.

GlassKit is for apps that need polished panels, overlays, split surfaces, and focus states without becoming a full UI framework. It gives you the glass-specific pieces that are easy to get wrong: material tokens, reduced-transparency fallbacks, focused/inactive panel states, and accessible resizable separators.

Use it alongside Tailwind CSS, shadcn/ui, Radix UI, React Aria, MUI, or your own components. GlassKit is not trying to replace your buttons, forms, menus, tables, or app shell. See the [integration guide](./docs/integrations/index.md) for the compatibility model.

## Use This When

- You are building a React workspace, editor, creative tool, dashboard, map UI, media tool, or internal operations surface.
- You want glass panels and overlays to feel intentional, not decorative.
- You need split-pane surfaces, active/inactive panel states, or floating controls over canvas/media.
- You want accessibility fallbacks for reduced motion, reduced transparency, and increased contrast built into the material layer.
- You prefer primitives and recipes over a full application shell framework.

## Don't Use This When

- You need a full UI kit with buttons, forms, menus, tables, and date pickers.
- You want a complete application shell framework.
- You need docking, tabs, persistence, nested pane composition, or drag reordering.
- You only need one-off glass CSS for a marketing page.

## Why Not Hand-Roll The CSS?

Hand-rolled glass CSS is a good choice for one decorative surface. GlassKit is for repeated workspace surfaces where the material layer also needs interaction states, fallbacks, and package reliability.

| Need | Hand-rolled CSS | GlassKit |
|------|-----------------|----------|
| One marketing card or hero overlay | Usually enough | More package than you need |
| Repeated panels, inspectors, sidebars, and overlays | Easy to drift across files | Shared primitives and tokens |
| Reduced motion, reduced transparency, and increased contrast | You own every fallback | Fallbacks ship with the material layer |
| Active and inactive workspace states | App-specific CSS conventions | `GlassPanel` and `useActivePanel` share the state shape |
| Accessible split-panel behavior | You implement pointer, keyboard, and ARIA behavior | `PanelSeparator` plus `useResizablePanels` covers the v1 splitter path |
| Public package confidence | Your app owns packaging | Packed Vite and Next.js smoke tests verify public imports and CSS paths |

Use GlassKit when glass is part of the workspace system. Write local CSS when the effect is isolated and decorative.

## What It Exports

| Export | Use Case |
|--------|----------|
| [`GlassRegular`](./docs/components/GlassRegular.md) | Navigation-layer glass for sidebars, toolbars, modals, and panel headers |
| [`GlassClear`](./docs/components/GlassClear.md) | Clear overlay glass for canvas, media, map, and floating-control surfaces |
| [`GlassPanel`](./docs/components/GlassPanel.md) | Workspace panel containers with focused, inactive, and animation states |
| [`GlassScrim`](./docs/components/GlassScrim.md) | Blur/dim backdrop material for overlays, drawers, mobile navigation, and modal stacks |
| [`PanelSeparator`](./docs/components/PanelSeparator.md) | Passive or resizable spatial dividers between panels |
| `useActivePanel` | Lightweight active-panel state for focused/inactive workspace treatment |
| `useResizablePanels` | APG-oriented split-panel resize behavior and separator props |

## Installation

### Published package

After the first public npm release:

```bash
npm install react-glasskit
```

### Packed tarball for pre-release dogfood

Before the first npm release, install from a packed tarball so the consuming app uses the same compiled `dist` output that npm will publish.

From this repository:

```bash
npm run build
npm pack
```

Then install the generated tarball in the consuming app:

```bash
# npm pack prints the generated tarball filename.
npm install /absolute/path/to/the-generated-react-glasskit-tarball.tgz
```

### Git dependencies

Git dependencies are not the supported v1 install path. The public package resolves to compiled `dist` files, and `dist/` is intentionally not tracked in git. Use a packed tarball before publication and the npm package after publication.

## Setup

Import the design tokens once at your application root, such as `main.tsx`, `_app.tsx`, or `layout.tsx`:

```ts
import 'react-glasskit/css/tokens.css';
```

Then import the primitives and hooks you need:

```tsx
import {
  GlassRegular,
  GlassClear,
  GlassPanel,
  GlassScrim,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
```

## Light and Dark Mode

GlassKit follows the user's system color scheme by default. Apps can also force either mode by setting a class or `data-theme` on `<html>` or an app shell:

```html
<html data-theme="light">
```

Supported selectors are `.light`, `[data-theme="light"]`, `.dark`, and `[data-theme="dark"]`. The forced selectors are defined after the system preference media query, so a product theme toggle can override the OS preference.

## Quick Start

This is the core GlassKit use case: a focused, resizable workspace split.

```tsx
import {
  GlassPanel,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';

type WorkspacePanel = 'editor' | 'inspector';

function WorkspaceSplit() {
  const activePanels = useActivePanel<WorkspacePanel>({
    initialPanelId: 'editor',
  });

  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 58,
    minSize: 32,
    maxSize: 72,
  });

  return (
    <main ref={panels.containerRef} style={{ display: 'flex', minHeight: 320 }}>
      <GlassPanel
        id="editor-panel"
        focused={activePanels.isFocused('editor')}
        inactive={activePanels.isInactive('editor')}
        animate
        style={{ ...panels.primaryPanelStyle, padding: 20 }}
        onClick={() => activePanels.activatePanel('editor')}
      >
        Editor
      </GlassPanel>

      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector panels"
        {...panels.separatorProps}
      />

      <GlassPanel
        focused={activePanels.isFocused('inspector')}
        inactive={activePanels.isInactive('inspector')}
        animate
        style={{ ...panels.secondaryPanelStyle, padding: 20 }}
        onClick={() => activePanels.activatePanel('inspector')}
      >
        Inspector
      </GlassPanel>
    </main>
  );
}
```

## Recipes

Start with [Workspace In Five Minutes](./docs/recipes/workspace-in-five-minutes.md) when you want the quickest working split-pane example. Use [App Shell](./docs/recipes/app-shell.md) for sidebar/header layouts and [Canvas HUD](./docs/recipes/canvas-hud.md) for floating controls over media or canvas surfaces.

Already using Tailwind, shadcn/ui, Radix UI, React Aria, or a CSS-variable design system? Start with the [integration guide](./docs/integrations/index.md).

## Other Patterns

Use `GlassRegular` for chrome that should read as part of the application frame:

```tsx
<GlassRegular as="nav" aria-label="Primary" className="sidebar">
  <a href="/dashboard">Dashboard</a>
  <a href="/projects">Projects</a>
  <a href="/settings">Settings</a>
</GlassRegular>
```

Use `GlassClear` for floating controls over vibrant content:

```tsx
<GlassClear dimmed className="toolbar">
  <button type="button">Move</button>
  <button type="button">Pen</button>
  <button type="button">Shape</button>
</GlassClear>
```

## Accessibility Posture

GlassKit makes glass UI safer by default, but it does not certify consuming applications. The package owns material-layer behavior; the app still owns semantic structure, labels, keyboard flows, focus management, and final compliance claims.

GlassKit includes CSS fallbacks for:

| Query | Behavior |
|-------|----------|
| `prefers-reduced-transparency` | Disables backdrop-filter and reverts glass surfaces to solid backgrounds |
| `prefers-reduced-motion` | Disables crystallize animation and snaps transitions |
| `prefers-contrast: more` | Hardens borders and focus indicators |

GlassKit's accessibility posture is evidence-based rather than certification-based. The package verifies its own CSS fallbacks, component behavior, hook behavior, and packed-package imports, while consuming apps remain responsible for final product-level accessibility claims.

Interactive separators follow the WAI-ARIA APG window splitter shape when `PanelSeparator` is paired with `useResizablePanels`: focusability, `aria-controls`, value attributes, arrow keys, Home, End, PageUp, and PageDown. The consuming app still supplies meaningful labels and product-level accessibility review.

See [docs/accessibility.md](./docs/accessibility.md) for the full responsibility boundary.

## Package Checks

The v1 package path is verified with:

```bash
npm run typecheck
npm test
npm run build
npm run audit:css
npm run audit:themes
npm run audit:geometry
npm run smoke:package
npm run smoke:next
npm run smoke:tailwind
npm --prefix demo run build
```

The packed-package smoke tests install the tarball into generated Vite and Next.js apps and verify public imports, type declarations, and CSS token imports.

Run the full release gate with:

```bash
npm run release:check
```

## Release Workflow

Changesets owns version and changelog updates going forward.

For package-facing changes, add a changeset before opening a PR:

```bash
npm run changeset
```

Use `patch` for fixes, package docs, compatibility proof, and small behavior corrections; `minor` for new compatible exports or supported feature paths; and `major` for breaking changes to exports, CSS entrypoints, peer ranges, or documented behavior.

After changesets merge to `main`, the Release workflow opens a version PR that updates `package.json`, `package-lock.json`, and `CHANGELOG.md`. Publishing is still manual after that PR merges:

```bash
npm run release:publish
git push --follow-tags
```

The workflow does not publish to npm automatically.

## Roadmap

React GlassKit is moving toward a public, workspace-first material layer for glass-style React application layouts. See [docs/roadmap.md](./docs/roadmap.md) for the current public direction.

## Architecture

React GlassKit is intentionally framework-minimal. The public package resolves to compiled `dist` output with generated type declarations and CSS assets, while source paths remain available for advanced local integration.

```
glasskit/
├── src/
│   ├── index.ts              # Source API barrel
│   ├── types.ts              # Shared TypeScript utilities
│   ├── css/
│   │   ├── tokens.css        # Design tokens (:root custom properties)
│   │   └── glass.module.css  # All glass material styles (single source of truth)
│   └── components/
│       ├── GlassRegular/     # Navigation-layer glass
│       ├── GlassClear/       # Media-overlay glass
│       ├── GlassPanel/       # Workspace panel container
│       ├── GlassScrim/       # Overlay backdrop material
│       └── PanelSeparator/   # Spatial dividers for split-panel layouts
└── docs/
    ├── getting-started.md
    ├── design-tokens.md
    ├── accessibility.md
    ├── roadmap.md
    └── components/
```
