# Repository Boundaries

React GlassKit has three audiences: package users, docs-site readers, and repo
maintainers. Keep the boundary explicit so consumer guidance does not drift into
local maintenance instructions.

## Package And Docs-Site Facing

These surfaces are public-facing and should work from the npm tarball,
`node_modules/react-glasskit`, and the public docs/demo site:

- `README.md`
- `docs/`, except `docs/superpowers/`
- public package metadata in `package.json`
- `react-glasskit` barrel imports
- `react-glasskit/css/tokens.css`
- `react-glasskit/css/components.css`
- documented component and hook props
- copyable recipes and integration guides

Public docs should use package imports and public CSS entrypoints. Source paths
are not v1 package entrypoints. If a README or docs link points to another
Markdown file, that target must ship with the package so links still resolve
inside `node_modules/react-glasskit`.

## Repo Only

These surfaces are for contributors, agents, and release automation:

- `scripts/`
- `.changeset/`
- `.github/`
- `demo/` source and build configuration
- smoke-test fixtures and generated temporary apps
- `AGENTS.md`
- `llms.txt`
- `.agents/`
- `.tmp/`
- `docs/superpowers/`

Repo-only files may reference local commands, generated fixtures, and maintainer
workflow details. They should not be required reading for package consumers.

## Release Hygiene

For package-facing docs or metadata changes, add a Changeset and run the
smallest relevant checks while developing. Before opening a PR that changes
public docs, package metadata, CSS exports, or smoke coverage, run:

```bash
npm run release:check
```

The package docs audit checks the packed file list and verifies that shipped
Markdown links resolve within the tarball.
