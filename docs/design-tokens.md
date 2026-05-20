# Design Tokens Reference

All tokens are CSS custom properties defined at `:root` in `tokens.css`.
Override any token in your own stylesheet to customize React GlassKit globally.

React GlassKit follows `prefers-color-scheme` by default and supports explicit
theme overrides through `class="light"`, `data-theme="light"`, `class="dark"`,
or `data-theme="dark"` on a parent element.

## Material Geometry

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-radius-none` | `0px` | Flush edges for viewport-bound chrome and scrims |
| `--glass-radius-sm` | `6px` | Compact controls and dense toolbars |
| `--glass-radius-md` | `12px` | Default named glass surface radius |
| `--glass-radius-lg` | `18px` | Larger panels and cards |
| `--glass-radius-xl` | `24px` | Spacious cards and feature panels |
| `--glass-radius-full` | `9999px` | Pills and rounded floating controls |
| `--glass-radius` | `var(--glass-radius-md)` | Legacy/default global radius token used when a surface `radius` prop is omitted |
| `--glass-shadow-radius` | `16px` | Blur radius of the drop shadow |
| `--glass-shadow-y` | `10px` | Y-offset of the drop shadow |

## Blur & Saturation

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-blur-regular` | `20px` | Backdrop blur for GlassRegular and GlassPanel |
| `--glass-blur-clear` | `12px` | Backdrop blur for GlassClear |
| `--glass-saturation-regular` | `180%` | Saturation boost for Regular/Panel |
| `--glass-saturation-clear` | `120%` | Saturation boost for Clear |

## Scrim Tokens

Live scrim aliases follow system/default behavior. If your app forces themes
with `.light`, `[data-theme="light"]`, `.dark`, or `[data-theme="dark"]`,
override the mode-specific scrim constants in the stable constants table too.

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-blur-scrim` | `10px` | Backdrop blur for GlassScrim |
| `--glass-saturation-scrim` | `140%` | Saturation boost for GlassScrim |
| `--glass-scrim-bg-soft` | `rgba(255, 255, 255, 0.26)` | Soft scrim dimming color |
| `--glass-scrim-bg-regular` | `rgba(255, 255, 255, 0.38)` | Regular scrim dimming color |
| `--glass-scrim-bg-strong` | `rgba(255, 255, 255, 0.52)` | Strong scrim dimming color |

## Opacity Coefficients

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-stroke` | `0.22` | Alpha for the border stroke |
| `--glass-highlight` | `0.16` | Alpha for the top-edge highlight |
| `--glass-shadow-opacity` | `0.10` | Alpha for the drop shadow (light mode) |

## Panel State Tokens

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-panel-inactive-opacity` | `0.92` | Opacity applied when `inactive` prop is set |
| `--glass-panel-inactive-saturate` | `0.85` | CSS `filter: saturate()` for inactive panels |

## Animation

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-crystallize-duration` | `400ms` | Duration of the panel materialization animation |
| `--glass-crystallize-easing` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Easing with slight overshoot for a snap-into-place feel |

## Surface Color Tokens

These live aliases follow system light/dark mode automatically. Override these
when your app only needs the default/system path.

Forced light and dark selectors are also included so app-level theme controls
can override the system preference. Component selectors inside `.light`,
`[data-theme="light"]`, `.dark`, and `[data-theme="dark"]` consume the stable
mode constants in the next section directly.

The token file also sets `color-scheme: light` for light tokens and
`color-scheme: dark` for dark tokens so browser-native controls match the
active mode.

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `--glass-bg-regular` | `rgba(255,255,255,0.72)` | `rgba(15,20,40,0.68)` |
| `--glass-bg-clear` | `rgba(255,255,255,0.45)` | `rgba(10,17,40,0.40)` |
| `--glass-bg-panel` | `rgba(255,255,255,0.68)` | `rgba(17,29,53,0.72)` |
| `--glass-border` | `rgba(255,255,255,0.22)` | `rgba(255,255,255,0.10)` |
| `--glass-highlight-border` | `rgba(255,255,255,0.16)` | `rgba(255,255,255,0.08)` |
| `--glass-shadow` | `rgba(0,0,0,0.10)` | `rgba(0,0,0,0.28)` |
| `--glass-focus-ring` | `rgba(100,149,237,0.50)` | `rgba(100,149,237,0.60)` |

## Mode-Specific Stable Constants

Override these constants when your app uses forced theme selectors. They are
stable light/dark values that GlassKit's forced-theme component selectors read
directly, so changing only the live aliases above is not enough for explicit
`.light`, `[data-theme="light"]`, `.dark`, or `[data-theme="dark"]` modes.

| Light Constant | Default |
|----------------|---------|
| `--glass-bg-regular-light` | `rgba(255, 255, 255, 0.72)` |
| `--glass-bg-clear-light` | `rgba(255, 255, 255, 0.45)` |
| `--glass-bg-panel-light` | `rgba(255, 255, 255, 0.68)` |
| `--glass-border-light` | `rgba(255, 255, 255, var(--glass-stroke))` |
| `--glass-highlight-border-light` | `rgba(255, 255, 255, var(--glass-highlight))` |
| `--glass-shadow-light` | `rgba(0, 0, 0, var(--glass-shadow-opacity))` |
| `--glass-focus-ring-light` | `rgba(100, 149, 237, 0.50)` |
| `--glass-scrim-bg-soft-light` | `rgba(255, 255, 255, 0.26)` |
| `--glass-scrim-bg-regular-light` | `rgba(255, 255, 255, 0.38)` |
| `--glass-scrim-bg-strong-light` | `rgba(255, 255, 255, 0.52)` |

| Dark Constant | Default |
|---------------|---------|
| `--glass-bg-regular-dark` | `rgba(15, 20, 40, 0.68)` |
| `--glass-bg-clear-dark` | `rgba(10, 17, 40, 0.40)` |
| `--glass-bg-panel-dark` | `rgba(17, 29, 53, 0.72)` |
| `--glass-border-dark` | `rgba(255, 255, 255, 0.10)` |
| `--glass-highlight-border-dark` | `rgba(255, 255, 255, 0.08)` |
| `--glass-shadow-dark` | `rgba(0, 0, 0, 0.28)` |
| `--glass-focus-ring-dark` | `rgba(100, 149, 237, 0.60)` |
| `--glass-scrim-bg-soft-dark` | `rgba(0, 0, 0, 0.28)` |
| `--glass-scrim-bg-regular-dark` | `rgba(0, 0, 0, 0.42)` |
| `--glass-scrim-bg-strong-dark` | `rgba(0, 0, 0, 0.58)` |

## Accessibility Fallback Tokens

Used automatically when OS accessibility settings are active.

| Token | Light | Dark |
|-------|-------|------|
| `--glass-solid-bg` | `rgb(245,245,245)` | `rgb(17,20,35)` |
| `--glass-solid-bg-alt` | `rgb(240,240,240)` | `rgb(22,26,42)` |
| `--glass-solid-border` | `rgb(200,200,200)` | `rgb(50,58,80)` |
| `--glass-high-contrast-border` | `rgb(40,40,40)` | `rgb(200,210,255)` |
| `--glass-high-contrast-focus` | `rgb(0,80,200)` | `rgb(120,170,255)` |

## Customizing Tokens

```css
/* In your app's global CSS, override after importing tokens.css */
:root {
  --glass-radius: 16px;           /* Rounder corners */
  --glass-blur-regular: 32px;     /* Stronger blur */
  --glass-crystallize-duration: 600ms; /* Slower materialization */
}
```

## Using Tokens From Other Styling Systems

GlassKit tokens are ordinary CSS custom properties. Tailwind, shadcn/ui,
Bootstrap, Chakra UI, Mantine, MUI, Panda CSS, vanilla-extract, Emotion, and
styled-components can all set them from global CSS or generated styles.

Prefer this model:

```css
:root {
  --glass-radius: 14px;
  --glass-blur-regular: 24px;
  --glass-focus-ring: rgb(59 130 246 / 0.5);
}
```

Use framework utilities or style props for layout and typography, then use
`--glass-*` variables for the material layer.
