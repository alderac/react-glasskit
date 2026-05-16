# Recipes

GlassKit recipes are copyable starting points for workspace-style React interfaces. They use the public v1 primitives directly instead of exported semantic layout wrappers, so teams can adapt structure, routing, persistence, and labels to their own apps.

## Choose A Recipe

| Recipe | Start Here When |
|--------|-----------------|
| [Workspace In Five Minutes](./workspace-in-five-minutes.md) | You need the fastest path to focused and resizable split panes. |
| [App Shell](./app-shell.md) | You need a sidebar/header/content layout with glass surfaces. |
| [Canvas HUD](./canvas-hud.md) | You need floating controls over a canvas, image, video, or map. |

## What GlassKit Provides

- Glass surfaces with documented CSS token customization.
- Accessible visual fallbacks for reduced motion, reduced transparency, and increased contrast.
- APG-oriented separator props when `PanelSeparator` is paired with `useResizablePanels`.
- Focus and inactive panel state helpers through `useActivePanel`.

## What Your App Still Owns

- Landmarks, headings, and app-specific semantic structure.
- Accessible names for controls and resize handles.
- Routing, persistence, docking, tabs, and data loading.
- Final WCAG, Section 508, VPAT, procurement, or product-level accessibility claims.
