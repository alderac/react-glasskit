# Design Tokens Reference

All tokens are CSS custom properties defined at `:root` in `tokens.css`. Override any token in your own stylesheet to customize React GlassKit globally.

React GlassKit follows `prefers-color-scheme` by default and supports explicit theme overrides through `class="light"`, `data-theme="light"`, `class="dark"`, or `data-theme="dark"` on a parent element.

## Material Geometry

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-radius` | `12px` | Border radius for all glass surfaces |
| `--glass-shadow-radius` | `16px` | Blur radius of the drop shadow |
| `--glass-shadow-y` | `10px` | Y-offset of the drop shadow |

## Blur & Saturation

| Token | Default | Description |
|-------|---------|-------------|
| `--glass-blur-regular` | `20px` | Backdrop blur for GlassRegular and GlassPanel |
| `--glass-blur-clear` | `12px` | Backdrop blur for GlassClear |
| `--glass-saturation-regular` | `180%` | Saturation boost for Regular/Panel |
| `--glass-saturation-clear` | `120%` | Saturation boost for Clear |

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
| `--glass-crystallize-easing` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Easing — slight overshoot for a "snap into place" feel |

## Surface Color Tokens

These follow system light/dark mode automatically. Forced light and dark selectors are also included so app-level theme controls can override the system preference.

The token file also sets `color-scheme: light` for light tokens and `color-scheme: dark` for dark tokens so browser-native controls match the active mode.

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--glass-bg-regular` | `rgba(255,255,255,0.72)` | `rgba(15,20,40,0.68)` |
| `--glass-bg-clear` | `rgba(255,255,255,0.45)` | `rgba(10,17,40,0.40)` |
| `--glass-bg-panel` | `rgba(255,255,255,0.68)` | `rgba(17,29,53,0.72)` |
| `--glass-border` | `rgba(255,255,255,0.22)` | `rgba(255,255,255,0.10)` |
| `--glass-highlight-border` | `rgba(255,255,255,0.16)` | `rgba(255,255,255,0.08)` |
| `--glass-shadow` | `rgba(0,0,0,0.10)` | `rgba(0,0,0,0.28)` |
| `--glass-focus-ring` | `rgba(100,149,237,0.50)` | `rgba(100,149,237,0.60)` |

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
/* In your app's global CSS — override after importing tokens.css */
:root {
  --glass-radius: 16px;           /* Rounder corners */
  --glass-blur-regular: 32px;     /* Stronger blur */
  --glass-crystallize-duration: 600ms; /* Slower materialization */
}
```

## Using Tokens From Other Styling Systems

GlassKit tokens are ordinary CSS custom properties. Tailwind, shadcn/ui, Bootstrap, Chakra UI, Mantine, MUI, Panda CSS, vanilla-extract, Emotion, and styled-components can all set them from global CSS or generated styles.

Prefer this model:

```css
:root {
  --glass-radius: 14px;
  --glass-blur-regular: 24px;
  --glass-focus-ring: rgb(59 130 246 / 0.5);
}
```

Use framework utilities or style props for layout and typography, then use `--glass-*` variables for the material layer.
