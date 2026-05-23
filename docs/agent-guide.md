# Agent Guide

This guide is for AI coding agents and automation that need to add React
GlassKit to a consuming app without inventing local glass-system behavior.

## What GlassKit Is

React GlassKit is a small React material layer for glass-style workspace
interfaces. Use it for polished panels, overlays, split surfaces, focus states,
resizable separators, and accessibility-oriented material fallbacks.

## What GlassKit Is Not

GlassKit is not a full UI kit, application shell framework, modal manager,
docking system, animation engine, Tailwind package, shadcn/ui package, or
framework-specific adapter package.

Use GlassKit for the glass material layer. Keep buttons, forms, menus, routing,
modal behavior, focus traps, app-shell structure, and product-specific keyboard
flows in the consuming app or its existing UI libraries.

## Install

```bash
npm install react-glasskit
```

## Required CSS Import

Import tokens once in the application root, before GlassKit surfaces render:

```ts
import 'react-glasskit/css/tokens.css';
```

Do not import tokens from source paths.

## Public Runtime Imports

Import components and hooks from the package barrel:

```tsx
import {
  GlassClear,
  GlassPanel,
  GlassRegular,
  GlassScrim,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
```

## Supported App Shapes

GlassKit expects a React app with a bundler that understands JavaScript, type
declarations, and CSS imports. See [support-matrix.md](./support-matrix.md) for
the current verified support model.

## Correct Usage

Use GlassKit surfaces with app-owned layout, semantics, and behavior:

```tsx
import { GlassPanel } from 'react-glasskit';
import 'react-glasskit/css/tokens.css';

export function InspectorPanel() {
  return (
    <GlassPanel as="section" aria-labelledby="inspector-title" className="p-4">
      <h2 id="inspector-title">Inspector</h2>
      <button type="button">Apply</button>
    </GlassPanel>
  );
}
```

Use `GlassScrim` as backdrop material, not as modal behavior:

```tsx
import { GlassPanel, GlassScrim } from 'react-glasskit';

export function DrawerSurface() {
  return (
    <>
      <GlassScrim strength="regular" aria-hidden="true" />
      <GlassPanel as="aside" aria-label="Filters">
        Filters
      </GlassPanel>
    </>
  );
}
```

## Wrong Usage

Do not import source files:

```ts
import 'react-glasskit/[source-path]/css/tokens.css';
```

Do not import component internals:

```tsx
import { GlassPanel } from 'react-glasskit/dist/components/GlassPanel';
```

Do not treat GlassKit as a UI kit:

```tsx
import { GlassButton, GlassDialog, GlassTabs } from 'react-glasskit';
```

Do not make accessibility claims for the whole app based only on GlassKit:

```txt
This product is WCAG compliant because it uses GlassKit.
```

## Customization Contract

Customize layout and typography with `className` and `style`. Customize the
material layer with `--glass-*` CSS custom properties after importing
`react-glasskit/css/tokens.css`.

Do not depend on generated CSS Module class names. Use documented props, public
CSS entrypoints, and documented tokens instead.

## Known Limitations

Read [known-limitations.md](./known-limitations.md) before adding new behavior
around dialogs, animation, layout systems, server-only code paths, or accessibility
claims.

## Stability

Read [api-stability.md](./api-stability.md) before relying on exports, CSS
entrypoints, token names, or documented behavior as public API.
