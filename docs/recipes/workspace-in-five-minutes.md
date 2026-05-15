# Workspace In Five Minutes

This recipe builds the core GlassKit v1 workspace: two panels, active/inactive state, and an APG-oriented resizable separator.

## Imports

```tsx
import {
  GlassPanel,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
import 'react-glasskit/css/tokens.css';
```

## Component

```tsx
import {
  GlassPanel,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
import 'react-glasskit/css/tokens.css';

type WorkspacePanel = 'editor' | 'inspector';

export function WorkspaceInFiveMinutes() {
  const activePanels = useActivePanel<WorkspacePanel>({
    initialPanelId: 'editor',
  });

  const layout = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 58,
    minSize: 32,
    maxSize: 72,
  });

  return (
    <main
      ref={layout.containerRef}
      style={{ display: 'flex', minHeight: 360, gap: 0 }}
    >
      <GlassPanel
        id="editor-panel"
        focused={activePanels.isFocused('editor')}
        inactive={activePanels.isInactive('editor')}
        animate
        onClick={() => activePanels.activatePanel('editor')}
        style={{ ...layout.primaryPanelStyle, padding: 20 }}
      >
        <h2>Editor</h2>
        <p>Primary work surface. Click to focus this panel.</p>
      </GlassPanel>

      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector panels"
        {...layout.separatorProps}
      />

      <GlassPanel
        focused={activePanels.isFocused('inspector')}
        inactive={activePanels.isInactive('inspector')}
        animate
        onClick={() => activePanels.activatePanel('inspector')}
        style={{ ...layout.secondaryPanelStyle, padding: 20 }}
      >
        <h2>Inspector</h2>
        <p>Secondary detail panel. Click to focus this panel.</p>
      </GlassPanel>
    </main>
  );
}
```

## Accessibility Notes

- Keep the `aria-label` specific to the two panels being resized.
- Keep `id="editor-panel"` aligned with `primaryPanelId`.
- Add headings or labels that match your product language.
- App-level focus movement after a resize remains the consuming app's responsibility.
