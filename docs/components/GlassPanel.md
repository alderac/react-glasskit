# GlassPanel

Container for individual tool panels in split or workspace layouts. Supports macOS Tahoe-style focus/inactive state treatment and the "crystallize" materialization animation.

## Specification

| Property | Value |
|----------|-------|
| Backdrop Blur | `20px` (same as Regular) |
| Saturation | `180%` |
| Background (light) | `rgba(255, 255, 255, 0.68)` |
| Background (dark) | `rgba(17, 29, 53, 0.72)` |
| Inactive Opacity | `0.92` |
| Inactive Saturate | `0.85` |

## Use Cases

- Individual panes in a horizontal or vertical split workspace
- Floating tool windows
- Editor panels with focus management

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focused` | `boolean` | `false` | Applies a focus-ring border and glow — marks the active panel |
| `inactive` | `boolean` | `false` | Drops opacity to 0.92, desaturates to 0.85 — macOS Tahoe inactive treatment |
| `animate` | `boolean` | `false` | Triggers the crystallize materialization animation on mount |
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Panel content |
| `...rest` | `HTMLDivElement` props | — | All native div props |

## The Crystallize Animation

When `animate={true}`, the panel materializes into existence:

1. Starts at `scale(0.97)`, `opacity: 0`, `blur: 0`
2. Eases to `scale(1)`, `opacity: 1`, `blur: 20px` with a slight spring overshoot
3. Duration: `400ms`, easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

The animation is automatically suppressed when `prefers-reduced-motion: reduce` is active.

## The Inactive State (macOS Tahoe)

When `inactive={true}`:
- Opacity drops to `0.92` — the panel visually recedes
- `filter: saturate(0.85)` — colors desaturate slightly
- This mirrors the behavior of unfocused window panes on macOS Sequoia/Tahoe

## Examples

### Split Layout

```tsx
import { GlassPanel, PanelSeparator } from 'react-glasskit';

<div style={{ display: 'flex', height: '100%' }}>
  <GlassPanel focused animate style={{ flex: 1 }} className="p-4">
    <h2>Active Panel</h2>
  </GlassPanel>

  <PanelSeparator orientation="vertical" />

  <GlassPanel inactive style={{ flex: 1 }} className="p-4">
    <h2>Inactive Panel</h2>
  </GlassPanel>
</div>
```

### Animated Mount (e.g., modal or drawer)

```tsx
<GlassPanel animate className="w-96 h-full p-6">
  Drawer content
</GlassPanel>
```

### Focus Management

```tsx
const [focusedPanel, setFocusedPanel] = useState<'left' | 'right'>('left');

<div style={{ display: 'flex', height: '100%' }}>
  <GlassPanel
    focused={focusedPanel === 'left'}
    inactive={focusedPanel !== 'left'}
    onClick={() => setFocusedPanel('left')}
    style={{ flex: 1 }}
  >
    Left
  </GlassPanel>
  <PanelSeparator />
  <GlassPanel
    focused={focusedPanel === 'right'}
    inactive={focusedPanel !== 'right'}
    onClick={() => setFocusedPanel('right')}
    style={{ flex: 1 }}
  >
    Right
  </GlassPanel>
</div>
```
