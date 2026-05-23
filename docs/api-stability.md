# API Stability

React GlassKit v1 treats the package barrel, CSS entrypoints, documented tokens,
and documented component behavior as the public contract.

## Stable Runtime Exports

These runtime exports are stable in v1:

- `GlassRegular`
- `GlassClear`
- `GlassPanel`
- `GlassScrim`
- `PanelSeparator`
- `useActivePanel`
- `useResizablePanels`

Removing or renaming one of these exports requires a major version.

## Stable Type Exports

Documented prop and utility types exposed from the package barrel are public API.
Removing or incompatibly changing those types requires a major version.

Compatible additions may ship in minor versions. Documentation fixes,
compatibility proof, and small behavior corrections may ship in patch versions.

## CSS Entrypoints

These CSS entrypoints are public API:

- `react-glasskit/css/tokens.css`
- `react-glasskit/css/tokens`
- `react-glasskit/css/components.css`
- `react-glasskit/css/glass.module.css`
- `react-glasskit/css/glass`

Application roots should import tokens through:

```ts
import 'react-glasskit/css/tokens.css';
```

Do not import source paths under `react-glasskit/src/*`.

## CSS Tokens

Documented `--glass-*` token names are public API. Removing a documented token,
renaming it, or changing its meaning requires a major version.

Default token values may be tuned in patch or minor releases when the documented
role of the token remains the same. Apps that need exact visual values should
override tokens in their own CSS after importing `react-glasskit/css/tokens.css`.

## Not Stable

These are not public API:

- source file paths under `src/`
- generated CSS Module class names
- internal helper function paths
- demo source files
- smoke-test fixtures
- maintainer scripts
- `AGENTS.md`
- `.changeset/`, `.tmp/`, `.agents/`, and `docs/superpowers/`
