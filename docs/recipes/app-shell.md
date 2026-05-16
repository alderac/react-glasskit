# App Shell

This recipe uses `GlassRegular` for application chrome and `GlassPanel` for the primary workspace surface. It keeps routing and persistence in the consuming app.

```tsx
import { GlassPanel, GlassRegular } from 'react-glasskit';
import 'react-glasskit/css/tokens.css';

export function GlassAppShell() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '240px minmax(0, 1fr)',
        minHeight: '100vh',
        gap: 12,
        padding: 12,
      }}
    >
      <GlassRegular
        as="nav"
        aria-label="Primary"
        style={{ display: 'grid', alignContent: 'start', gap: 12, padding: 16 }}
      >
        <strong>Acme Studio</strong>
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projects</a>
        <a href="/settings">Settings</a>
      </GlassRegular>

      <GlassPanel focused animate style={{ padding: 20 }}>
        <header>
          <p>Workspace</p>
          <h1>Project Dashboard</h1>
        </header>
        <section aria-label="Recent project activity">
          <p>Use your app's own data, routing, and controls here.</p>
        </section>
      </GlassPanel>
    </div>
  );
}
```

## Adaptation Notes

- Replace links with your router's link component.
- Keep the `nav` accessible name meaningful for the app.
- Add skip links when this shell wraps dense repeated navigation.
- Use CSS media queries in the consuming app to collapse the sidebar on narrow screens.
