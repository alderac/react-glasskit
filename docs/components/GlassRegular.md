# GlassRegular

Medium-transparency frosted glass surface. The workhorse material for all
navigation-layer surfaces.

## Specification

| Property | Value |
|----------|-------|
| Backdrop Blur | `20px` |
| Saturation | `180%` |
| Background (light) | `rgba(255, 255, 255, 0.72)` |
| Background (dark) | `rgba(15, 20, 40, 0.68)` |
| Border (light) | `rgba(255, 255, 255, 0.22)` |
| Border (dark) | `rgba(255, 255, 255, 0.10)` |
| Top highlight | `rgba(255, 255, 255, 0.16)` inset |

## Use Cases

- Sidebars and navigation rails
- Toolbars and top bars
- Modal / dialog backgrounds
- Panel headers and workspace selectors

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `'div'` | Renders as any HTML element while preserving type safety |
| `radius` | `'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'` | `--glass-radius` | Applies a named radius token. Omit it to preserve the global legacy radius token path. |
| `className` | `string` | - | Additional classes merged onto the surface |
| `children` | `ReactNode` | - | Content |
| `...rest` | Native props | - | All native props for the target element |

## Examples

### Basic

```tsx
import { GlassRegular } from 'react-glasskit';

<GlassRegular className="p-4">
  Content
</GlassRegular>
```

### Semantic Sidebar

```tsx
<GlassRegular as="nav" className="w-64 h-full flex flex-col p-4 gap-2">
  <a href="/">Home</a>
  <a href="/about">About</a>
</GlassRegular>
```

### Header Bar

```tsx
<GlassRegular as="header" className="h-14 flex items-center px-6 sticky top-0 z-50">
  <Logo />
  <nav>...</nav>
</GlassRegular>
```

### Edge-To-Edge Header

```tsx
<GlassRegular
  as="header"
  radius="none"
  className="sticky top-0 z-50 flex h-14 items-center justify-between px-6"
>
  <Logo />
  <nav aria-label="Primary">...</nav>
</GlassRegular>
```

### Modal Background

```tsx
<GlassRegular radius="xl" className="w-[480px] p-6 shadow-xl">
  <h2>Modal Title</h2>
  <p>Modal content</p>
</GlassRegular>
```

## Dark Mode

Dark mode is fully automatic. Token values swap via
`@media (prefers-color-scheme: dark)` or when `.dark` /
`[data-theme="dark"]` is present on a parent element.
