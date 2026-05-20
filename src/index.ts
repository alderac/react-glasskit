/**
 * React GlassKit — Public API
 * ─────────────────────────────────────────────────────────────────────────────
 * Import components from this barrel. Import CSS tokens separately in your
 * app entry point:
 *
 *   import 'react-glasskit/src/css/tokens.css'
 */

// ── Components ──────────────────────────────────────────────────────────────
export { GlassRegular } from './components/GlassRegular';
export type { GlassRegularProps } from './components/GlassRegular/GlassRegular';
export { GlassClear } from './components/GlassClear';
export type { GlassClearProps } from './components/GlassClear';
export { GlassPanel } from './components/GlassPanel';
export type { GlassPanelProps } from './components/GlassPanel';
export { GlassScrim } from './components/GlassScrim';
export type { GlassScrimProps, GlassScrimStrength } from './components/GlassScrim';
export { PanelSeparator } from './components/PanelSeparator';
export type { PanelSeparatorProps } from './components/PanelSeparator';

// ── Hooks ───────────────────────────────────────────────────────────────────
export { useActivePanel } from './hooks/useActivePanel';
export type {
  ActivePanelId,
  PanelState,
  UseActivePanelOptions,
  UseActivePanelResult,
} from './hooks/useActivePanel';
export { useResizablePanels } from './hooks/useResizablePanels';
export type {
  UseResizablePanelsOptions,
  UseResizablePanelsResult,
} from './hooks/useResizablePanels';

// ── Types ────────────────────────────────────────────────────────────────────
export type {
  GlassRadius,
  Orientation,
  PolymorphicForwardRefComponent,
  PolymorphicProps,
  PolymorphicRef,
} from './types';
