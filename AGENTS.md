# AGENTS.md

## Project Shape

React GlassKit is a small React material layer for glass-style workspace interfaces. It is not a full UI kit, application shell framework, docking system, or framework-specific adapter package.

The public runtime surface should stay focused on:

- `GlassRegular`
- `GlassClear`
- `GlassPanel`
- `GlassScrim`
- `PanelSeparator`
- `useActivePanel`
- `useResizablePanels`
- CSS token and component CSS entrypoints

## Agent Working Rules

- Preserve the vanilla CSS and CSS Modules core.
- Prefer recipes, docs, tests, and smoke fixtures over new exported abstractions.
- Keep compatibility work centered on `className`, `style`, refs, ARIA/data/event pass-through, and `--glass-*` CSS custom properties.
- Do not create framework forks such as a Tailwind package, shadcn/ui package, or Radix-specific package.
- Do not commit `dist/`, `.tmp/`, `.agents/`, or `docs/superpowers/`.
- Treat `docs/superpowers/` as ignored internal planning state.
- Treat `.agents/` as ignored local workspace state.
- For package-facing changes, add a Changeset file under `.changeset/`.
- Do not run `npm run changeset:version` during feature work; the release workflow creates the version PR.

## Public Import Contract

Application roots should import tokens through the public CSS export:

```ts
import 'react-glasskit/css/tokens.css';
```

Do not document source-path CSS imports as consumer paths.

Components and hooks should come from the package barrel:

```tsx
import {
  GlassClear,
  GlassPanel,
  GlassRegular,
  GlassScrim,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
```

## Verification

Use the smallest relevant check while developing:

```bash
npm run audit:agents
npm run typecheck
npm test
npm run build
```

Before publishing a PR that changes package behavior, public docs, package metadata, CSS exports, or smoke coverage, run:

```bash
npm run release:check
```

The release gate includes typecheck, tests, build, CSS audits, packed-package smokes, demo browser smoke, and npm pack dry-run.

## Demo Notes

The Vite demo uses the `/react-glasskit/` base path. Browser smoke automation should target that base path instead of `/`.

## Documentation Notes

Do not hardcode generated tarball names in public docs or demo samples. If pre-release tarball install guidance is needed, tell consumers to install the tarball filename printed by `npm pack`.
