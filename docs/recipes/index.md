# Recipes

GlassKit recipes are copyable starting points for workspace-style React
interfaces. They use the public v1 primitives directly instead of exported
semantic layout wrappers, so teams can adapt structure, routing, persistence,
and labels to their own apps.

## Choose A Recipe

| Recipe | Start Here When |
|--------|-----------------|
| [Workspace In Five Minutes](./workspace-in-five-minutes.md) | You need the fastest path to focused and resizable split panes. |
| [App Shell](./app-shell.md) | You need a sidebar/header/content layout with glass surfaces. |
| [Canvas HUD](./canvas-hud.md) | You need floating controls over a canvas, image, video, or map. |
| [Edge-To-Edge Header](./edge-to-edge-header.md) | You need app chrome that touches the viewport edge without inline radius patches. |
| [Brand Theme](./brand-theme.md) | You need to map GlassKit tokens to a product palette. |
| [Next Link Card](./next-link-card.md) | You need a whole glass card to navigate through Next.js routing. |
| [Mobile Navigation Scrim](./mobile-navigation-scrim.md) | You need a glass backdrop and panel for a mobile menu. |

## What GlassKit Provides

- Glass surfaces with documented CSS token customization.
- `GlassScrim` blur and dimming material for overlays, drawers, mobile navigation, and modal stacks.
- Accessible visual fallbacks for reduced motion, reduced transparency, and increased contrast.
- APG-oriented separator props when `PanelSeparator` is paired with `useResizablePanels`.
- Focus and inactive panel state helpers through `useActivePanel`.

## What Your App Still Owns

- Landmarks, headings, and app-specific semantic structure.
- Accessible names for controls and resize handles.
- Routing, persistence, docking, tabs, and data loading.
- Final WCAG, Section 508, VPAT, procurement, or product-level accessibility claims.

## Framework And Design-System Integration

If your app already uses Tailwind CSS, shadcn/ui, Radix UI, React Aria,
Bootstrap, Chakra UI, Mantine, MUI, Panda CSS, vanilla-extract, Emotion, or
styled-components, start with the [integration guide](../integrations/index.md).
The integration docs show how to keep GlassKit as the material layer without
rewriting the rest of your UI stack.
