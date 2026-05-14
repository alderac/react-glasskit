# PanelSeparator

Spatial divider for split-panel layouts, mimicking the iPadOS multi-window aesthetic. Nearly invisible at rest — subtly revealed on hover or touch.

## Design

The separator is intentionally unobtrusive:

- **At rest**: `opacity: 0.4` — just barely perceptible
- **On hover / active**: `opacity: 0.85` with a focus-ring blue tint
- **Touch devices**: Hit target automatically expands by `±8px` via a CSS pseudo-element (`@media (pointer: coarse)`)
- **Orientation**: Renders as a vertical column (`1px × 100%`) or horizontal row (`100% × 1px`)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Direction of the dividing line |
| `className` | `string` | — | Additional classes |
| `...rest` | `HTMLDivElement` props | — | All native div props (incl. `onMouseDown` for drag logic) |

> PanelSeparator renders with `role="separator"` and `aria-orientation` automatically set.

## Examples

### Vertical (side-by-side panels)

```tsx
import { GlassPanel, PanelSeparator } from 'react-glasskit';

<div style={{ display: 'flex', height: '600px' }}>
  <GlassPanel style={{ flex: 1 }}>Left</GlassPanel>
  <PanelSeparator orientation="vertical" />
  <GlassPanel style={{ flex: 1 }}>Right</GlassPanel>
</div>
```

### Horizontal (stacked panels)

```tsx
<div style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
  <GlassPanel style={{ flex: 1 }}>Top</GlassPanel>
  <PanelSeparator orientation="horizontal" />
  <GlassPanel style={{ flex: 1 }}>Bottom</GlassPanel>
</div>
```

### With Drag-to-Resize

Wire `onMouseDown` to your resize handler. The separator's hit target handles the initial grab; your handler manages the drag delta.

```tsx
const handleMouseDown = (e: React.MouseEvent) => {
  e.preventDefault();
  const startX = e.clientX;
  const startWidth = leftPanelRef.current!.offsetWidth;

  const onMouseMove = (ev: MouseEvent) => {
    const delta = ev.clientX - startX;
    setLeftWidth(Math.max(200, startWidth + delta));
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

<PanelSeparator orientation="vertical" onMouseDown={handleMouseDown} />
```

## Touch Devices

On coarse pointer devices (touchscreens), a CSS `::before` pseudo-element expands the interactive hit area to `±8px` around the visible line without affecting layout. No JavaScript or extra markup required.
