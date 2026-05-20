# GlassScrim

Backdrop layer for overlays, drawers, mobile navigation, and modal stacks.
`GlassScrim` owns the blur and dimming material behind foreground UI.

## Material Boundary

`GlassScrim` is material only. It does not create an accessible modal, drawer,
or navigation system by itself.

Your app still owns open state, focus management, scroll locking, inert
background behavior, modal semantics, Escape handling, and route transitions.

## Specification

| Property | Value |
|----------|-------|
| Position | `fixed` |
| Inset | `0` |
| Backdrop Blur | `10px` |
| Saturation | `140%` |
| Strengths | `soft`, `regular`, `strong` |
| Default radius | `none` |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `'div'` | Renders as any HTML element while preserving type safety |
| `strength` | `'soft' | 'regular' | 'strong'` | `'regular'` | Controls the dimming opacity of the scrim |
| `radius` | `'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` | `'none'` | Applies a named radius token |
| `className` | `string` | - | Additional classes merged onto the scrim |
| `children` | `ReactNode` | - | Optional content, usually empty |
| `...rest` | Native props | - | All native props for the target element |

## Examples

### Passive Scrim

```tsx
import { GlassScrim } from 'react-glasskit';

<GlassScrim aria-hidden="true" strength="regular" />
```

### Click-To-Close Scrim

```tsx
<GlassScrim
  as="button"
  type="button"
  aria-label="Close navigation menu"
  strength="strong"
  onClick={() => setOpen(false)}
/>
```

Keep the accessible dialog, drawer, or menu behavior in the app layer. Pair the
scrim with your own labels, focus trap, scroll lock, Escape handler, focus
return, route transition cleanup, and `aria-modal` or `inert` behavior as
appropriate for the pattern.
