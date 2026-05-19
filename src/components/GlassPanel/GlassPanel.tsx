import React from 'react';
import { mergeGlassBackdropStyle } from '../../css/backdropStyle';
import styles from '../../css/glass.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Renders the panel with a focus highlight border and glow ring.
   * Use to indicate the active panel in a split-panel layout.
   */
  focused?: boolean;
  /**
   * Applies macOS Tahoe-style inactive treatment:
   * drops opacity to 0.92 and desaturates to 0.85.
   * Use for panels that are visible but not currently active.
   */
  inactive?: boolean;
  /**
   * Triggers the "crystallize" materialization animation on mount.
   * The panel scales and blurs into existence rather than simply fading in.
   * Automatically respects `prefers-reduced-motion`.
   */
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassPanel
 *
 * Container for individual tool panels in split or workspace layouts.
 * Supports focus/inactive state treatment and the "crystallize"
 * materialization animation (macOS Tahoe-inspired).
 *
 * @example
 * <GlassPanel focused animate className="flex flex-col h-full">
 *   Panel content
 * </GlassPanel>
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ focused = false, inactive = false, animate = false, className, style, children, ...rest }, ref) => {
    const classes = [
      styles.panel,
      focused ? styles.panelFocused : '',
      inactive ? styles.panelInactive : '',
      animate ? styles.panelAnimate : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} style={mergeGlassBackdropStyle('regular', style)} {...rest}>
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
