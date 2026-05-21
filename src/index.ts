/**
 * React GlassKit — Public API
 * ─────────────────────────────────────────────────────────────────────────────
 * Import components from this barrel. Import CSS tokens separately in your
 * app entry point:
 *
 *   import 'react-glasskit/css/tokens.css'
 */

export type { GlassClearProps } from './components/GlassClear';
export { GlassClear } from './components/GlassClear';
export type { GlassPanelProps } from './components/GlassPanel';
export { GlassPanel } from './components/GlassPanel';
// ── Components ──────────────────────────────────────────────────────────────
export { GlassRegular } from './components/GlassRegular';
export type { GlassRegularProps } from './components/GlassRegular/GlassRegular';
export type {
  GlassScrimProps,
  GlassScrimStrength,
} from './components/GlassScrim';
export { GlassScrim } from './components/GlassScrim';
export type { PanelSeparatorProps } from './components/PanelSeparator';
export { PanelSeparator } from './components/PanelSeparator';
export type {
  ActivePanelId,
  PanelState,
  UseActivePanelOptions,
  UseActivePanelResult,
} from './hooks/useActivePanel';
// ── Hooks ───────────────────────────────────────────────────────────────────
export { useActivePanel } from './hooks/useActivePanel';
export type {
  UseResizablePanelsOptions,
  UseResizablePanelsResult,
} from './hooks/useResizablePanels';
export { useResizablePanels } from './hooks/useResizablePanels';

// ── Types ────────────────────────────────────────────────────────────────────
export type {
  GlassRadius,
  Orientation,
  PolymorphicForwardRefComponent,
  PolymorphicProps,
  PolymorphicRef,
} from './types';
