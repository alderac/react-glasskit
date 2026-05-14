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
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * PanelSeparator
 *
 * Divider for spatial panel layouts, mimicking the iPadOS split-view aesthetic.
 * Nearly invisible at rest — subtly revealed on hover or touch/drag.
 * Touch hit targets automatically expand on coarse pointer devices
 * via a CSS `@media (pointer: coarse)` pseudo-element.
 *
 * @example
 * <div style={{ display: 'flex', height: '100%' }}>
 *   <GlassPanel>Left</GlassPanel>
 *   <PanelSeparator orientation="vertical" />
 *   <GlassPanel>Right</GlassPanel>
 * </div>
 */
export const PanelSeparator = React.forwardRef<HTMLDivElement, PanelSeparatorProps>(
  ({ orientation = 'vertical', className, ...rest }, ref) => {
    const orientationClass =
      orientation === 'vertical' ? styles.separatorVertical : styles.separatorHorizontal;

    const classes = [styles.separator, orientationClass, className].filter(Boolean).join(' ');

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
