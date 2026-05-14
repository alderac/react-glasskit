# Getting Started

This guide walks through integrating React GlassKit into an existing React project.

## Prerequisites

- React ≥ 18
- A React bundler that supports CSS imports
- TypeScript ≥ 5.4 (recommended, not required for JS-only usage)

## 1. Install

### Local path (monorepo or same machine)

```json
{
  "dependencies": {
    "react-glasskit": "file:../path/to/glasskit"
  }
}
```

### Git dependency

```json
{
  "dependencies": {
    "react-glasskit": "git+https://github.com/alderac/react-glasskit.git"
  }
}
```

Then run `npm install`.

## 2. Import Design Tokens

Add this **once** in your app entry point (`main.tsx`, `_app.tsx`, `layout.tsx`):

```ts
import 'react-glasskit/css/tokens.css';
```

This registers all `--glass-*` CSS custom properties at `:root`. React GlassKit components read from these tokens — no other global CSS is needed.

## 3. Use Components

```tsx
import { GlassRegular, GlassClear, GlassPanel, PanelSeparator } from 'react-glasskit';
```

### Sidebar

```tsx
<GlassRegular as="nav" className="sidebar">
  <a href="/">Home</a>
  <a href="/settings">Settings</a>
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

## 4. Dark Mode

React GlassKit handles dark mode automatically via two mechanisms:

| Method | How |
|--------|-----|
| System preference | `@media (prefers-color-scheme: dark)` — zero config |
| Class-based | Add `class="dark"` or `data-theme="dark"` to `<html>` |

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

- Browse the [Component Reference](../README.md#component-reference) for detailed prop tables and examples
- Review [design-tokens.md](./design-tokens.md) to understand every tunable parameter
- Read [accessibility.md](./accessibility.md) to understand the a11y guarantees
