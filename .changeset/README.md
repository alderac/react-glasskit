# Changesets

Use Changesets for package-facing changes that should appear in `CHANGELOG.md` or move the published package version.

```bash
npm run changeset
```

Commit titles do not drive releases in this repo. Changesets reads `.changeset/*.md` files, so use `npm run changeset` for package-facing changes instead of relying on Conventional Commit or semantic-release-style commit messages.

Choose the smallest semver bump that describes the public package change:

- `patch`: fixes, docs shipped in the package, compatibility proof, and small behavior corrections.
- `minor`: new exports, new supported recipes, or compatible feature additions.
- `major`: breaking changes to exports, CSS entrypoints, peer ranges, or documented behavior.

No changeset is needed for internal planning notes, local-only scripts, CI maintenance that does not affect package users, or ignored files.

After changesets merge to `main`, the Release workflow opens a version PR. That PR updates `package.json`, `package-lock.json`, and `CHANGELOG.md`, then removes the consumed changeset files.

Publishing remains an explicit owner action after the version PR merges:

```bash
npm run release:publish
git push --follow-tags
```
