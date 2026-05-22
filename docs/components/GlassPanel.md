# GlassPanel

Container for individual tool panels in split or workspace layouts. Supports
focus/inactive state treatment and the "crystallize" materialization animation.

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
| `as` | `React.ElementType` | `'div'` | Renders as any HTML element while preserving type safety |
| `focused` | `boolean` | `false` | Applies a focus-ring border and glow, marking the active panel |
| `inactive` | `boolean` | `false` | Drops opacity to 0.92 and desaturates to 0.85 for inactive treatment |
| `animate` | `boolean` | `false` | Triggers the crystallize materialization animation on mount |
| `radius` | `'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` | `--glass-radius` | Applies a named radius token. Omit it to preserve the global legacy radius token path. |
| `className` | `string` | - | Additional classes |
| `children` | `ReactNode` | - | Panel content |
| `...rest` | Native props | - | All native props for the target element |

## The Crystallize Animation

When `animate={true}`, the panel materializes into existence:

1. Starts at `scale(0.97)`, `opacity: 0`, `blur: 0`
2. Eases to `scale(1)`, `opacity: 1`, `blur: 20px` with a slight spring overshoot
3. Duration: `400ms`, easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

The animation is automatically suppressed when `prefers-reduced-motion: reduce`
is active.

## The Inactive State

When `inactive={true}`:

- Opacity drops to `0.92`, so the panel visually recedes
- `filter: saturate(0.85)`, so colors desaturate slightly
- This gives unfocused workspace panes a quieter treatment while preserving layout

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

### Semantic Section

```tsx
<GlassPanel as="section" aria-labelledby="activity-heading" focused radius="lg" className="p-5">
  <h2 id="activity-heading">Recent activity</h2>
  <p>Workspace events and review notes.</p>
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
