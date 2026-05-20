# Integrations

GlassKit is vanilla CSS at the core and friendly to the React styling stacks teams already use. Import the tokens once, then compose the primitives with utility classes, headless components, shadcn/ui components, or CSS-variable design systems.

GlassKit does not replace your buttons, forms, menus, tables, routing, or app shell. It provides the glass material layer: panels, overlays, separators, focus states, resize behavior, and accessibility-oriented material fallbacks.

## Choose Your Path

| Stack | Start Here | Support Model |
|-------|------------|---------------|
| Tailwind CSS | [Tailwind](./tailwind.md) | Compose utilities through `className`; tune material through `--glass-*` tokens. |
| shadcn/ui | [shadcn/ui](./shadcn.md) | Use GlassKit as the surface layer around shadcn components. |
| Radix UI, Base UI, React Aria | [Headless And Design Systems](./headless-and-design-systems.md) | Keep those libraries in charge of behavior; use GlassKit for material surfaces. |
| Bootstrap, Chakra UI, Mantine, MUI | [Headless And Design Systems](./headless-and-design-systems.md) | Override GlassKit tokens from your theme or global CSS. |
| Panda CSS, vanilla-extract, Emotion, styled-components | [Headless And Design Systems](./headless-and-design-systems.md) | Emit `--glass-*` variables from your styling layer. |

## Compatibility Contract

- Import `react-glasskit/css/tokens.css` once at the application root.
- Use `className` for layout, spacing, typography, and consumer-system utilities.
- Use CSS custom properties for glass material tuning.
- Keep external component libraries responsible for controls and complex behavior.
- Keep product-level accessibility review in the consuming app.

## What GlassKit Avoids

- No required Tailwind installation.
- No framework-specific runtime branches.
- No shadcn/ui component copies.
- No separate adapter packages for each design system.
- No claims of official certification by third-party UI libraries.
