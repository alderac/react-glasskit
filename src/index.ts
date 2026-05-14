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
export { GlassClear } from './components/GlassClear';
export type { GlassClearProps } from './components/GlassClear';
export { GlassPanel } from './components/GlassPanel';
export type { GlassPanelProps } from './components/GlassPanel';
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

// ── Types ────────────────────────────────────────────────────────────────────
export type { PolymorphicProps, Orientation } from './types';
