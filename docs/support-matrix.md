# Support Matrix

This matrix separates supported peer ranges, verified smoke coverage, and
expected integration behavior.

## React

| Area | Status | Notes |
|------|--------|-------|
| React 18 | Peer supported and smoke verified | The package peer range is `>=18.0.0`; the packed Vite smoke uses React 18. |
| React 19 | Peer supported and smoke verified | The packed Next.js and Tailwind smokes use React 19. |
| React DOM | Peer supported | Consumers install their app's `react-dom`; GlassKit does not bundle React. |

## Toolchains

| Toolchain | Status | Notes |
|-----------|--------|-------|
| Vite | Smoke verified | Packed-package smoke verifies public imports, declarations, and CSS token imports. |
| Next.js App Router | Smoke verified | Packed-package smoke verifies app-root token import and client component usage. |
| Tailwind CSS | Optional and smoke verified | Tailwind owns layout and utilities; GlassKit owns material surfaces and `--glass-*` tokens. |
| shadcn/ui, Radix UI, React Aria, MUI, Chakra, Mantine | Integration documented | These libraries should own controls and behavior while GlassKit provides material surfaces. |

## Bundlers And CSS

| Area | Status | Notes |
|------|--------|-------|
| CSS imports | Required | Import `react-glasskit/css/tokens.css` once from a bundler-aware React app. |
| CSS Modules | Package-owned | GlassKit ships compiled CSS and generated class names; consumers should not depend on internal class names. |
| CSS custom properties | Public contract | Consumers may override documented `--glass-*` tokens after the token import. |
| Source-path imports | Unsupported | Do not import from `react-glasskit/src/*` or component internals. |

## SSR And Runtime Expectations

| Area | Status | Notes |
|------|--------|-------|
| SSR frameworks | Expected with bundler support | Use app-root CSS imports and client components for interactive hooks. |
| Raw Node.js imports | Unsupported for UI rendering | GlassKit is a React UI package with CSS side effects; use it through a React bundler. |
| Server Components | Boundary-owned by the app | Static surfaces may render through framework rules, but hooks and event handlers require client components. |

## Browser Expectations

| Area | Status | Notes |
|------|--------|-------|
| `backdrop-filter` | Expected for full glass effect | Browsers without backdrop-filter support may show a flatter material. |
| `-webkit-backdrop-filter` | Included | The package emits the WebKit-prefixed declaration for supported browsers. |
| `prefers-reduced-transparency` | Supported fallback | Glass surfaces become solid backgrounds when the OS/browser exposes this preference. |
| `prefers-reduced-motion` | Supported fallback | GlassPanel materialization animation and transitions are disabled. |
| `prefers-contrast: more` | Supported fallback | Borders and focus indicators are hardened. |
