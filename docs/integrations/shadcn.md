# shadcn/ui

shadcn/ui and GlassKit solve different parts of the UI. shadcn/ui gives you copyable application components. GlassKit gives you the glass material surfaces those components can sit inside.

GlassKit should not replace your shadcn buttons, inputs, dialogs, menus, or tables. Use GlassKit for panels, overlays, separators, focused/inactive state, and workspace material fallbacks.

## Surface Around shadcn Components

```tsx
import { GlassPanel } from 'react-glasskit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function InspectorPanel() {
  return (
    <GlassPanel className="grid gap-4 p-4" focused animate>
      <div className="grid gap-1">
        <h2 className="text-sm font-semibold">Inspector</h2>
        <p className="text-sm text-muted-foreground">
          shadcn/ui controls inside a GlassKit panel.
        </p>
      </div>

      <Input aria-label="Layer name" placeholder="Layer name" />

      <div className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Apply</Button>
      </div>
    </GlassPanel>
  );
}
```

## Token Boundary

Keep shadcn/ui theme variables in charge of app colors and controls. Use GlassKit variables for the glass material:

```css
:root {
  --glass-radius: var(--radius);
  --glass-focus-ring: hsl(var(--ring) / 0.5);
}

.dark {
  --glass-bg-panel: hsl(var(--background) / 0.72);
  --glass-border: hsl(var(--border) / 0.45);
}
```

## What This Is Not

- This is not a shadcn/ui registry package.
- This does not copy shadcn components into GlassKit.
- This does not make Tailwind a GlassKit dependency.

A registry can be considered later if repeated user feedback shows that copyable shadcn-specific examples are not enough.
