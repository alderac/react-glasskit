# Brand Theme

Override GlassKit CSS variables after importing the token stylesheet. The
components keep their public API while your product owns the brand palette.

```ts
import 'react-glasskit/css/tokens.css';
import './brand-glass.css';
```

```css
:root,
.light,
[data-theme='light'] {
  --glass-bg-regular: rgba(250, 252, 255, 0.76);
  --glass-bg-panel: rgba(245, 249, 255, 0.72);
  --glass-bg-clear: rgba(255, 255, 255, 0.46);
  --glass-border: rgba(37, 99, 235, 0.22);
  --glass-focus-ring: rgba(14, 116, 144, 0.55);
  --glass-radius: var(--glass-radius-lg);
}

.dark,
[data-theme='dark'] {
  --glass-bg-regular: rgba(12, 18, 35, 0.72);
  --glass-bg-panel: rgba(18, 26, 46, 0.76);
  --glass-bg-clear: rgba(11, 18, 32, 0.44);
  --glass-border: rgba(125, 211, 252, 0.18);
  --glass-focus-ring: rgba(45, 212, 191, 0.58);
  --glass-radius: var(--glass-radius-lg);
}
```

```tsx
import { GlassPanel } from 'react-glasskit';

<GlassPanel as="section" aria-labelledby="welcome-heading" className="p-5">
  <h2 id="welcome-heading">Welcome back</h2>
  <p>Your branded glass tokens apply across the material layer.</p>
</GlassPanel>
```
