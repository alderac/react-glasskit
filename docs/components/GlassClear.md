# GlassClear

High-transparency frosted glass for media-rich overlays. Designed for surfaces that **must physically sit directly over vibrant or image content**.

## Specification

| Property | Value |
|----------|-------|
| Backdrop Blur | `12px` |
| Saturation | `120%` |
| Background (light) | `rgba(255, 255, 255, 0.45)` |
| Background (dark) | `rgba(10, 17, 40, 0.40)` |

## Use Cases

- Canvas toolbars floating over drawing/media content
- Script overlay controls
- Set builder floating HUD panels
- Video player controls

## Strict Architecture Requirements

1. **Must sit directly over media-rich or vibrant content.** GlassClear over a flat background looks nearly invisible — use `GlassRegular` in that case.
2. **Use `dimmed` when placing text or controls over colorful backgrounds.** The dimming overlay prevents color bleeding through the glass from interfering with legibility.
3. **Content must be bold and high-contrast.** The low opacity of the material means light text or icons can get lost — use sufficient weight and color contrast.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dimmed` | `boolean` | `false` | Adds a semi-transparent darkening overlay beneath children |
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Content |
| `...rest` | `HTMLDivElement` props | — | All native div props |

## Examples

### Basic Overlay

```tsx
import { GlassClear } from 'react-glasskit';

// Floating over a canvas or video
<div style={{ position: 'relative' }}>
  <canvas />
  <GlassClear
    dimmed
    style={{ position: 'absolute', bottom: 8, left: 8, right: 8 }}
    className="flex gap-2 px-3 py-2"
  >
    <button>Pen</button>
    <button>Eraser</button>
  </GlassClear>
</div>
```

### Script Reading HUD

```tsx
<GlassClear dimmed className="px-4 py-2 flex items-center justify-between">
  <span className="text-white font-bold">Act 2, Scene 3</span>
  <button className="text-white">Close</button>
</GlassClear>
```

## The `dimmed` Prop — When to Use

| Situation | Use `dimmed`? |
|-----------|--------------|
| Over a photo or video | ✅ Yes |
| Over a vibrant gradient | ✅ Yes |
| Over a Konva canvas with colors | ✅ Yes |
| Over a neutral white/dark background | ❌ No — use GlassRegular instead |
