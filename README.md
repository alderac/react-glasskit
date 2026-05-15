# React GlassKit — Liquid Glass Design System

A cross-repository, project-agnostic design system for visually layering elements via translucent frosted glass materials. Inspired by the macOS Tahoe and iPadOS spatial computing aesthetic.

## Architecture

React GlassKit is intentionally **framework-minimal**. The public package resolves to compiled `dist` output with generated type declarations and CSS assets, while source paths remain available for advanced local integration.

```
glasskit/
├── src/
│   ├── index.ts              # Source API barrel
│   ├── types.ts              # Shared TypeScript utilities
│   ├── css/
│   │   ├── tokens.css        # Design tokens (:root custom properties)
│   │   └── glass.module.css  # All glass material styles (single source of truth)
│   └── components/
│       ├── GlassRegular/     # Navigation-layer glass (sidebars, toolbars, modals)
│       ├── GlassClear/       # Media-overlay glass (canvas controls, floating HUD)
│       ├── GlassPanel/       # Workspace panel container with focus/inactive states
│       └── PanelSeparator/   # Spatial dividers for split-panel layouts
└── docs/
    ├── getting-started.md
    ├── design-tokens.md
    ├── accessibility.md
    ├── roadmap.md
    └── components/
```

## Installation

### Option A — Local path (monorepo / same machine)

In your consuming project's `package.json`:

```json
{
  "dependencies": {
    "react-glasskit": "file:../../glasskit"
  }
}
```

### Option B — Git dependency

```json
{
  "dependencies": {
    "react-glasskit": "git+https://github.com/alderac/react-glasskit.git"
  }
}
```

## Setup

**1. Import the design tokens once at your application root** (e.g., `main.tsx`, `_app.tsx`, `layout.tsx`):

```ts
import 'react-glasskit/css/tokens.css';
```

**2. Import components and hooks:**

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

```tsx
import { GlassPanel, GlassRegular, GlassClear, PanelSeparator } from 'react-glasskit';

// Navigation sidebar
<GlassRegular as="nav" className="w-64 h-full p-4">
  Sidebar
</GlassRegular>

// Workspace split layout
<div style={{ display: 'flex', height: '100%' }}>
  <GlassPanel focused animate className="flex-1 p-4">
    Active panel
  </GlassPanel>
  <PanelSeparator orientation="vertical" />
  <GlassPanel inactive className="flex-1 p-4">
    Inactive panel
  </GlassPanel>
</div>

// Floating toolbar over a canvas
<GlassClear dimmed className="px-3 py-2 flex gap-2">
  <button>Tool A</button>
  <button>Tool B</button>
</GlassClear>
```

### Resizable Workspace

```tsx
import { GlassPanel, PanelSeparator, useResizablePanels } from 'react-glasskit';

function WorkspaceSplit() {
  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 58,
    minSize: 32,
    maxSize: 72,
  });

  return (
    <div ref={panels.containerRef} style={{ display: 'flex', height: 320 }}>
      <GlassPanel id="editor-panel" style={panels.primaryPanelStyle}>
        Editor
      </GlassPanel>
      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector panels"
        {...panels.separatorProps}
      />
      <GlassPanel style={panels.secondaryPanelStyle}>Inspector</GlassPanel>
    </div>
  );
}
```

## Dark Mode

React GlassKit supports both modes out of the box:

| Method | How |
|--------|-----|
| **System preference** | Automatic via `@media (prefers-color-scheme: dark)` |
| **Class-based** | Add `class="dark"` or `data-theme="dark"` to `<html>` |

## Accessibility

All three mandatory OS accessibility media queries are handled automatically — no consumer configuration required. See [docs/accessibility.md](./docs/accessibility.md).

| Query | Behavior |
|-------|----------|
| `prefers-reduced-transparency` | Disables backdrop-filter, reverts to solid backgrounds |
| `prefers-reduced-motion` | Disables crystallize animation, snaps transitions |
| `prefers-contrast: more` | Hardens borders and focus indicators |

## Type Checking

```bash
npm run typecheck
```

## Roadmap

React GlassKit is moving toward a public, workspace-first React UI kit for glass-style application layouts. See [docs/roadmap.md](./docs/roadmap.md) for the current public direction.

## Component Reference

| Component | Use Case |
|-----------|----------|
| [`GlassRegular`](./docs/components/GlassRegular.md) | Sidebars, toolbars, modals, panel headers |
| [`GlassClear`](./docs/components/GlassClear.md) | Canvas overlays, floating controls, script HUDs |
| [`GlassPanel`](./docs/components/GlassPanel.md) | Workspace panel containers in split layouts |
| [`PanelSeparator`](./docs/components/PanelSeparator.md) | Spatial dividers between panels |
