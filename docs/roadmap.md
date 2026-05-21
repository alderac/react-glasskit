# Roadmap

React GlassKit is moving toward a public, workspace-first material layer for glass-style React application layouts. This roadmap is directional, not a release contract. Details may change as the package is tested in real applications.

## Near-Term Direction

- Keep the core component API small and stable.
- Focus the library around workspace-style interfaces: panels, sidebars, separators, overlays, and focused/inactive states.
- Improve the package path for public npm use, including conventional build output, type declarations, and CSS exports.
- Expand the demo into a lightweight docs experience with install guidance, component examples, and copyable recipes.
- Make accessibility support visible through documented fallbacks, tested behavior, and clear consumer responsibilities.

## V1 Priorities

- Keep the public API focused on primitives, hooks, tokens, and documented CSS paths.
- Make the first adoption path obvious through the workspace-in-five-minutes recipe.
- Provide copyable recipes for app shells, workspace panels, and canvas-style overlays.
- Keep accessibility support visible through tested behavior, CSS fallback audits, and clear consumer responsibilities.
- Verify public imports, CSS paths, TypeScript declarations, and packed-package installs in Vite and Next.js consumers.
- Keep public documentation grounded in what the package actually verifies.

## V2 Direction: Expressive Material Controls

V2 should make the existing glass surfaces feel more expressive without turning
React GlassKit into an animation library. The goal is an animation-ready
material contract: GlassKit owns how material controls render, while consuming
apps and animation libraries own how those controls change over time.

V2 should extend the current surfaces first:

- `GlassPanel`
- `GlassRegular`
- `GlassClear`
- `GlassScrim` where overlay material controls are useful

### V2 Pillars

- Define stable CSS variables for effect intensity, blur, saturation, radius,
  tint, noise, highlight position, sheen, edge bloom, and depth.
- Add a small prop surface for existing components, such as `effect`,
  `intensity`, and `interactive`, with final names decided during
  implementation.
- Ship conservative drop-in presets for liquid highlights, pointer-ready
  sheen, animated edge bloom, and hover/press material response.
- Make the plain React path first-class through recipes that use `useState`,
  `useRef`, pointer handlers, scroll state, and inline CSS variables.
- Keep Motion, GSAP, React Spring, and similar libraries as optional upgrades
  that can drive the same CSS variable contract.
- Preserve the v1 fallback posture for reduced motion, reduced transparency,
  and increased contrast.

### Plain React Baseline

V2 should feel complete without an animation dependency. A consuming app should
be able to opt into polished material response through props and CSS states, then
graduate to controlled variables with ordinary React state when it needs more
specific behavior.

The docs should include copyable recipes for:

- pointer-follow sheen using `onPointerMove`
- press depth using `onPointerDown`, `onPointerUp`, and `onPointerLeave`
- scroll-reactive depth using local scroll state
- active panel depth using `useActivePanel`
- reduced-motion-safe material transitions

### Animation Library Boundary

V2 should not ship scroll engines, gesture recognition, spring physics,
timeline orchestration, or first-party pointer/scroll hooks. Those remain the
job of app code or dedicated animation libraries. GlassKit should instead expose
stable material inputs those tools can manipulate.

## V3 Direction: Effect Expansion

V3 is the place to promote proven v2 patterns into deeper effect primitives,
optional integration helpers, or public hooks. Candidates should be based on
real usage of the v2 material contract rather than speculative animation API
design.

Possible v3 work includes:

- Optional helpers for pointer, scroll, and depth state when recipe patterns
  prove stable.
- Integration guides or adapters for popular animation libraries if consumers
  repeatedly need the same wiring.
- Additional material presets that remain compatible with the token system and
  accessibility fallbacks.
- Broader visual testing for animated and reactive material states.

## Later Possibilities

- Promote proven recipes into exported layout components when they add more than naming convenience.
- Add deeper examples for Next.js and other common React application setups.
- Broaden visual testing and accessibility verification as the package matures.
- Consider richer docs navigation once the public API grows enough to need it.

## Not In Scope

- A full application shell framework.
- Complex docking, tabbing, persistence, or arbitrary workspace composition.
- Blanket accessibility certification for consuming applications.
- Large semantic component catalogs before the underlying patterns have been proven.
- Animation engines, timelines, physics systems, scroll scrubbing, or gesture orchestration.

## Accessibility Posture

GlassKit aims to make glass UI safer by default, but consuming applications remain responsible for final accessibility outcomes. The library can provide tested primitives, documented fallbacks, and accessible interaction patterns. App teams still own semantic structure, labels, keyboard flows, focus management, content contrast, and any formal WCAG, Section 508, or procurement claims.
