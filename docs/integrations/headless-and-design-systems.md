# Headless Primitives And Design Systems

GlassKit composes best when other libraries own behavior and GlassKit owns the material surface.

## Radix UI, Base UI, And Similar Headless Libraries

Use the headless library for accessible behavior. Put GlassKit on the visual content surface.

```tsx
import * as Dialog from '@radix-ui/react-dialog';
import { GlassPanel } from 'react-glasskit';

export function GlassDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open inspector</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content asChild>
          <GlassPanel className="fixed left-1/2 top-1/2 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 p-5">
            <Dialog.Title>Inspector</Dialog.Title>
            <Dialog.Description>
              Radix owns dialog behavior. GlassKit owns the surface.
            </Dialog.Description>
          </GlassPanel>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

When a headless library does not support `asChild`, wrap its content carefully and keep accessible names, focus behavior, and keyboard behavior in the headless component.

## React Aria Components

React Aria Components can own behavior and state while GlassKit provides local surfaces around content:

```tsx
import { Dialog, DialogTrigger, Modal, Button } from 'react-aria-components';
import { GlassPanel } from 'react-glasskit';

export function ReactAriaGlassModal() {
  return (
    <DialogTrigger>
      <Button>Open</Button>
      <Modal>
        <Dialog>
          <GlassPanel className="grid gap-3 p-5" focused>
            <h2>Inspector</h2>
            <p>React Aria owns modal behavior. GlassKit owns the panel material.</p>
          </GlassPanel>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
```

## CSS-Variable Design Systems

For Bootstrap, Chakra UI, Mantine, MUI, Panda CSS, vanilla-extract, Emotion, and styled-components, keep the design system in charge of controls and set GlassKit variables from the same theme layer.

```css
:root {
  --glass-radius: 12px;
  --glass-blur-regular: 24px;
  --glass-focus-ring: rgb(59 130 246 / 0.5);
}

[data-theme="dark"] {
  --glass-bg-panel: rgba(15, 23, 42, 0.72);
  --glass-border: rgba(255, 255, 255, 0.12);
}
```

## Rule Of Thumb

- Use the other library for controls, menus, dialogs, forms, tables, routing, and app behavior.
- Use GlassKit for workspace panels, overlays, split separators, focus/inactive states, and material fallbacks.
