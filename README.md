# React GlassKit

A small React material layer for building glass-style workspace interfaces.

GlassKit is for apps that need polished panels, overlays, split surfaces, and focus states without becoming a full UI framework. It gives you the glass-specific pieces that are easy to get wrong: material tokens, reduced-transparency fallbacks, focused/inactive panel states, and accessible resizable separators.

Use it alongside shadcn/ui, Radix, React Aria, MUI, or your own components. GlassKit is not trying to replace your buttons, forms, menus, tables, or app shell.

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

## What It Exports

| Export | Use Case |
|--------|----------|
| [`GlassRegular`](./docs/components/GlassRegular.md) | Navigation-layer glass for sidebars, toolbars, modals, and panel headers |
| [`GlassClear`](./docs/components/GlassClear.md) | Clear overlay glass for canvas, media, map, and floating-control surfaces |
| [`GlassPanel`](./docs/components/GlassPanel.md) | Workspace panel containers with focused, inactive, and animation states |
| [`PanelSeparator`](./docs/components/PanelSeparator.md) | Passive or resizable spatial dividers between panels |
| `useActivePanel` | Lightweight active-panel state for focused/inactive workspace treatment |
| `useResizablePanels` | APG-oriented split-panel resize behavior and separator props |

## Installation

### Option A: Local path

For monorepos or same-machine development, add this to your consuming project's `package.json`:

```json
{
  "dependencies": {
    "react-glasskit": "file:../../glasskit"
  }
}
```

### Option B: Git dependency

```json
{
  "dependencies": {
    "react-glasskit": "git+https://github.com/alderac/react-glasskit.git"
  }
}
```

Then run `npm install` in the consuming app.

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
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
```

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

```bash
npm run typecheck
npm test
npm run build
npm run smoke:package
```

The packed-package smoke test installs the tarball into a generated Vite app and verifies public imports, type declarations, and CSS token imports.

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
│       └── PanelSeparator/   # Spatial dividers for split-panel layouts
└── docs/
    ├── getting-started.md
    ├── design-tokens.md
    ├── accessibility.md
    ├── roadmap.md
    └── components/
```
