import React from 'react';
import type { Orientation } from '../../types';
import styles from '../../css/glass.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PanelSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the dividing line.
   * - `vertical`: a 1px tall column (between side-by-side panels)
   * - `horizontal`: a 1px wide row (between stacked panels)
   * @default 'vertical'
   */
  orientation?: Orientation;
  /**
   * Promotes the separator from a passive visual divider to a resize handle.
   * Adds the hover/active reveal treatment and orientation-aware resize cursor.
   * Pair with `onMouseDown` or `onPointerDown` to implement resize behavior.
   * @default false
   */
  resizable?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PanelSeparator
 *
 * Divider for spatial panel layouts, mimicking the iPadOS split-view aesthetic.
 * Passive by default. Set `resizable` when the separator should behave like a
 * resize handle; the hit target expands around the visible hairline via a CSS
 * pseudo-element without affecting layout.
 *
 * @example
 * <div style={{ display: 'flex', height: '100%' }}>
 *   <GlassPanel>Left</GlassPanel>
 *   <PanelSeparator orientation="vertical" />
 *   <GlassPanel>Right</GlassPanel>
 * </div>
 */
export const PanelSeparator = React.forwardRef<HTMLDivElement, PanelSeparatorProps>(
  ({ orientation = 'vertical', resizable = false, className, ...rest }, ref) => {
    const orientationClass =
      orientation === 'vertical' ? styles.separatorVertical : styles.separatorHorizontal;

    const classes = [
      styles.separator,
      orientationClass,
      resizable ? styles.separatorResizable : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={classes}
        {...rest}
      />
    );
  }
);

PanelSeparator.displayName = 'PanelSeparator';
