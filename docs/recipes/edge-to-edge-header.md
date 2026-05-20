# Edge-To-Edge Header

Use `radius="none"` when a glass header touches the viewport edge. This keeps
geometry in the public surface API instead of pushing one-off `borderRadius`
patches into consuming apps.

```tsx
import { GlassRegular } from 'react-glasskit';

export function EdgeToEdgeHeader() {
  return (
    <GlassRegular
      as="header"
      radius="none"
      className="sticky top-0 z-50 flex h-14 items-center justify-between px-6"
    >
      <a href="#main">Skip to content</a>
      <a href="/" aria-label="Home">GlassKit</a>
      <nav aria-label="Primary">
        <a href="/docs">Docs</a>
        <a href="/recipes">Recipes</a>
      </nav>
    </GlassRegular>
  );
}
```

GlassKit owns the material and radius behavior. Your app still owns spacing,
navigation labels, skip links, active route state, and responsive menu behavior.
