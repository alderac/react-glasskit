# Canvas HUD

This recipe uses `GlassClear` for a floating toolbar over vibrant media. Use `dimmed` when the toolbar contains text or icons that need protection from the background.

```tsx
import { GlassClear } from 'react-glasskit';
import 'react-glasskit/css/tokens.css';

export function CanvasHud() {
  return (
    <section
      aria-label="Map editor"
      style={{ position: 'relative', minHeight: 360, overflow: 'hidden' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, #0ea5e9, #ec4899 48%, #22c55e)',
        }}
      />

      <GlassClear
        dimmed
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16,
          padding: 12,
        }}
      >
        <div role="toolbar" aria-label="Canvas tools" style={{ display: 'flex', gap: 8 }}>
          <button type="button">Move</button>
          <button type="button">Pen</button>
          <button type="button">Shape</button>
          <button type="button">Erase</button>
        </div>
      </GlassClear>
    </section>
  );
}
```

## Legibility Notes

- Use `dimmed` over saturated images, maps, canvases, or video.
- Keep icon-only controls labeled with `aria-label`.
- Keep text short; glass overlays are best for focused controls, not dense prose.
