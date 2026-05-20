# Brand Theme

Override GlassKit CSS variables after importing the token stylesheet. The
components keep their public API while your product owns the brand palette.

```ts
import 'react-glasskit/css/tokens.css';
import './brand-glass.css';
```

Use the live aliases for system/default behavior. These are the tokens that
surfaces read before any forced `.light`, `[data-theme="light"]`, `.dark`, or
`[data-theme="dark"]` selector takes over.

```css
:root {
  --glass-bg-regular: rgba(250, 252, 255, 0.76);
  --glass-bg-panel: rgba(245, 249, 255, 0.72);
  --glass-bg-clear: rgba(255, 255, 255, 0.46);
  --glass-border: rgba(37, 99, 235, 0.22);
  --glass-highlight-border: rgba(255, 255, 255, 0.34);
  --glass-shadow: rgba(15, 23, 42, 0.12);
  --glass-focus-ring: rgba(14, 116, 144, 0.55);
  --glass-scrim-bg-soft: rgba(15, 23, 42, 0.18);
  --glass-scrim-bg-regular: rgba(15, 23, 42, 0.30);
  --glass-scrim-bg-strong: rgba(15, 23, 42, 0.44);
  --glass-radius: var(--glass-radius-lg);
}
```

When your app forces themes with `.light`, `[data-theme="light"]`, `.dark`, or
`[data-theme="dark"]`, override the mode-specific constants too. GlassKit's
forced-theme component selectors consume these stable constants directly.

```css
:root {
  --glass-bg-regular-light: rgba(250, 252, 255, 0.76);
  --glass-bg-panel-light: rgba(245, 249, 255, 0.72);
  --glass-bg-clear-light: rgba(255, 255, 255, 0.46);
  --glass-border-light: rgba(37, 99, 235, 0.22);
  --glass-highlight-border-light: rgba(255, 255, 255, 0.34);
  --glass-shadow-light: rgba(15, 23, 42, 0.12);
  --glass-focus-ring-light: rgba(14, 116, 144, 0.55);
  --glass-scrim-bg-soft-light: rgba(15, 23, 42, 0.18);
  --glass-scrim-bg-regular-light: rgba(15, 23, 42, 0.30);
  --glass-scrim-bg-strong-light: rgba(15, 23, 42, 0.44);

  --glass-bg-regular-dark: rgba(12, 18, 35, 0.72);
  --glass-bg-panel-dark: rgba(18, 26, 46, 0.76);
  --glass-bg-clear-dark: rgba(11, 18, 32, 0.44);
  --glass-border-dark: rgba(125, 211, 252, 0.18);
  --glass-highlight-border-dark: rgba(186, 230, 253, 0.14);
  --glass-shadow-dark: rgba(0, 0, 0, 0.34);
  --glass-focus-ring-dark: rgba(45, 212, 191, 0.58);
  --glass-scrim-bg-soft-dark: rgba(0, 0, 0, 0.30);
  --glass-scrim-bg-regular-dark: rgba(0, 0, 0, 0.46);
  --glass-scrim-bg-strong-dark: rgba(0, 0, 0, 0.62);
}
```

You can place the constants on `:root` to define the full theme once, or scope
them to a product shell if different parts of the app need different glass
themes.

```tsx
import { GlassPanel } from 'react-glasskit';

<GlassPanel as="section" aria-labelledby="welcome-heading" className="p-5">
  <h2 id="welcome-heading">Welcome back</h2>
  <p>Your branded glass tokens apply across the material layer.</p>
</GlassPanel>
```
