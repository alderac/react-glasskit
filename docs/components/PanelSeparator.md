# PanelSeparator

Spatial divider for split-panel layouts, mimicking the iPadOS multi-window aesthetic. Passive by default; opt into resize affordances when the divider is wired to resize behavior.

## Design

The separator is intentionally unobtrusive:

- **At rest**: `opacity: 0.55` — quietly visible without reading as interactive
- **Passive**: Default cursor and no hover reveal
- **Resizable**: `opacity: 0.85` with a focus-ring blue tint on hover / active
- **Hit target**: Resizable separators expand by `±8px` via an invisible CSS pseudo-element
- **Cursor**: Uses the default cursor unless `resizable` is set
- **Orientation**: Renders as a vertical column (`1px × 100%`) or horizontal row (`100% × 1px`)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Direction of the dividing line |
| `resizable` | `boolean` | `false` | Enables resize cursor, hover reveal, and expanded resize hit target |
| `className` | `string` | — | Additional classes |
| `...rest` | `HTMLDivElement` props | — | All native div props, including `onMouseDown` / `onPointerDown` for drag logic |

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

Wire `onMouseDown` or `onPointerDown` to your resize handler. The separator's hit target handles the initial grab, the component applies the matching resize cursor, and your handler manages the drag delta.

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

<PanelSeparator orientation="vertical" resizable onMouseDown={handleMouseDown} />
```

## Hit Target

When `resizable` is set, a CSS `::before` pseudo-element expands the interactive hit area to `±8px` around the visible line without affecting layout. No JavaScript or extra markup required.
