# Getting Started

This guide walks through integrating React GlassKit into an existing React project.

## Prerequisites

- React ≥ 18
- A React bundler that supports CSS imports
- TypeScript ≥ 5.4 (recommended, not required for JS-only usage)

## 1. Install

### Published package

```bash
npm install react-glasskit
```

### Packed tarball for release-candidate checks

When testing a release candidate locally, build and pack GlassKit:

```bash
npm run build
npm pack
```

Then install the generated tarball in your consuming app:

```bash
# npm pack prints the generated tarball filename.
npm install /absolute/path/to/the-generated-react-glasskit-tarball.tgz
```

Git dependencies are not the supported v1 path because the public package uses compiled `dist` output and `dist/` is not committed to git. Use a packed tarball for local release-candidate checks and the npm package for real consumer installs.

## 2. Import Design Tokens

Add this **once** in your app entry point (`main.tsx`, `_app.tsx`, `layout.tsx`):

```ts
import 'react-glasskit/css/tokens.css';
```

This registers all `--glass-*` CSS custom properties at `:root`. React GlassKit components read from these tokens — no other global CSS is needed.

## 3. Use Components

```tsx
import { GlassRegular, GlassClear, GlassPanel, GlassScrim, PanelSeparator } from 'react-glasskit';
```

### Sidebar

```tsx
<GlassRegular as="nav" className="sidebar">
  <a href="/">Home</a>
  <a href="/settings">Settings</a>
</GlassRegular>
```

### Edge-to-edge header

```tsx
<GlassRegular as="header" radius="none" className="header">
  <a href="/">Home</a>
  <nav aria-label="Primary">...</nav>
</GlassRegular>
```

### Split workspace with focus management

```tsx
import { GlassPanel, PanelSeparator, useActivePanel } from 'react-glasskit';

function Workspace() {
  const activePanels = useActivePanel<'left' | 'right'>({
    initialPanelId: 'left',
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <GlassPanel
        focused={activePanels.isFocused('left')}
        inactive={activePanels.isInactive('left')}
        animate
        onClick={() => activePanels.activatePanel('left')}
        style={{ flex: 1, padding: 16 }}
      >
        Left panel
      </GlassPanel>

      <PanelSeparator orientation="vertical" />

      <GlassPanel
        focused={activePanels.isFocused('right')}
        inactive={activePanels.isInactive('right')}
        animate
        onClick={() => activePanels.activatePanel('right')}
        style={{ flex: 1, padding: 16 }}
      >
        Right panel
      </GlassPanel>
    </div>
  );
}
```

### Resizable workspace split

```tsx
import { GlassPanel, PanelSeparator, useResizablePanels } from 'react-glasskit';

function ResizableWorkspace() {
  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 58,
    minSize: 32,
    maxSize: 72,
  });

  return (
    <div ref={panels.containerRef} style={{ display: 'flex', height: '100vh' }}>
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

### Floating HUD over a canvas

```tsx
<div style={{ position: 'relative' }}>
  <canvas id="my-canvas" />
  <GlassClear
    dimmed
    style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}
    className="toolbar"
  >
    <button>Brush</button>
    <button>Eraser</button>
  </GlassClear>
</div>
```

## 4. Light and Dark Mode

React GlassKit follows the user's system preference by default, and it also supports forced light or dark modes through a class or `data-theme` on any parent element.

| Method | How |
|--------|-----|
| Force light | Add `class="light"` or `data-theme="light"` to `<html>` or an app shell |
| System preference | `@media (prefers-color-scheme: dark)` — zero config |
| Force dark | Add `class="dark"` or `data-theme="dark"` to `<html>` or an app shell |

```html
<html data-theme="light">
```

The forced selectors are defined after the system media query, so `data-theme="light"` can keep a surface light even when the OS preference is dark.

## 5. Customizing Tokens

Override any token in your own CSS, **after** the tokens import:

```css
:root {
  --glass-radius: 16px;
  --glass-blur-regular: 32px;
  --glass-crystallize-duration: 600ms;
}
```

See [design-tokens.md](./design-tokens.md) for the full reference.

## 6. Accessibility

All OS accessibility fallbacks are built into the CSS module automatically. See [accessibility.md](./accessibility.md) for details on what each media query triggers.

## Next Steps

- Build the [Workspace In Five Minutes](./recipes/workspace-in-five-minutes.md) recipe first.
- Browse the [Component Reference](../README.md#what-it-exports) for detailed prop tables and examples.
- Use [App Shell](./recipes/app-shell.md) or [Canvas HUD](./recipes/canvas-hud.md) when your layout matches those patterns.
- Review [design-tokens.md](./design-tokens.md) to understand every tunable parameter.
- Read [accessibility.md](./accessibility.md) to understand what GlassKit owns and what your app still owns.
- Check [repository-boundaries.md](./repository-boundaries.md) when deciding whether a change belongs in public docs, package metadata, or repo-only maintainer notes.
