# Tailwind CSS

GlassKit does not require Tailwind, but Tailwind projects can compose GlassKit primitives naturally. Use Tailwind utilities for layout, spacing, typography, and local state. Use GlassKit tokens for the glass material itself.

## Setup

Import GlassKit tokens once in your app root:

```ts
import 'react-glasskit/css/tokens.css';
```

Then use GlassKit components with Tailwind classes:

```tsx
import {
  GlassPanel,
  PanelSeparator,
  useResizablePanels,
} from 'react-glasskit';

export function TailwindWorkspace() {
  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 60,
    minSize: 30,
    maxSize: 75,
  });

  return (
    <main
      ref={panels.containerRef}
      className="flex min-h-96 gap-0 p-4 text-slate-950 dark:text-slate-50"
    >
      <GlassPanel
        id="editor-panel"
        className="grid min-w-0 content-start gap-3 p-5"
        style={panels.primaryPanelStyle}
      >
        <h2 className="text-lg font-semibold">Editor</h2>
        <p className="text-sm opacity-75">Tailwind owns layout and text.</p>
      </GlassPanel>

      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector panels"
        {...panels.separatorProps}
      />

      <GlassPanel
        className="grid min-w-0 content-start gap-3 p-5"
        style={panels.secondaryPanelStyle}
      >
        <h2 className="text-lg font-semibold">Inspector</h2>
        <p className="text-sm opacity-75">GlassKit owns the material layer.</p>
      </GlassPanel>
    </main>
  );
}
```

## Dark Mode

GlassKit tokens respond to Tailwind's common class-based dark mode convention:

```html
<html class="dark">
```

The tokens also respond to:

```html
<html data-theme="dark">
```

If your app uses another selector, override the tokens under that selector in your global CSS.

## Token Overrides

Put overrides after the GlassKit token import:

```css
:root {
  --glass-radius: 0.75rem;
  --glass-blur-regular: 24px;
  --glass-focus-ring: rgb(59 130 246 / 0.5);
}

.dark {
  --glass-bg-panel: rgb(15 23 42 / 0.72);
  --glass-border: rgb(255 255 255 / 0.12);
}
```

## Utility Classes Versus Material Tokens

Use Tailwind utilities for:

- spacing
- layout
- sizing
- typography
- app-specific colors inside the panel
- responsive behavior

Use GlassKit tokens for:

- backdrop blur
- surface opacity
- border treatment
- focus ring color
- fallback colors
- animation timing

This avoids depending on CSS output order to override internal material rules.

## daisyUI Note

daisyUI is Tailwind-based. Use daisyUI for controls and theme structure, then override GlassKit tokens in the same global theme layer when you want GlassKit surfaces to match.
