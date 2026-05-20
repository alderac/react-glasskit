# Mobile Navigation Scrim

Use `GlassScrim` for the backdrop layer and a semantic `GlassPanel` for the
menu content.

```tsx
import { GlassPanel, GlassScrim } from 'react-glasskit';

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  if (!open) return null;

  return (
    <>
      <GlassScrim
        as="button"
        type="button"
        aria-label="Close navigation menu"
        strength="regular"
        onClick={onClose}
      />

      <GlassPanel
        as="nav"
        aria-label="Mobile navigation"
        radius="none"
        className="fixed inset-y-0 right-0 z-50 w-80 max-w-full p-6"
      >
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projects</a>
        <a href="/settings">Settings</a>
      </GlassPanel>
    </>
  );
}
```

GlassKit owns the scrim and panel material. Your app still owns menu state,
Escape handling, scroll locking, initial focus, focus return, route-transition
cleanup, and whether the background should become inert.
