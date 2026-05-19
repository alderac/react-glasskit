import React from 'react';
import { mergeGlassBackdropStyle } from '../../css/backdropStyle';
import styles from '../../css/glass.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GlassClearProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adds a semi-transparent darkening overlay beneath children.
   * Required when GlassClear sits directly over vibrant or media-rich
   * content to prevent color interference with text legibility.
   */
  dimmed?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassClear
 *
 * High-transparency frosted glass for media-rich overlays.
 * Must physically sit directly over vibrant content (canvas toolbars,
 * script overlays, floating controls).
 *
 * - Backdrop: blur(12px) / saturate(120%)
 * - Use `dimmed` when text legibility requires a darkening pass
 * - Content placed atop must be bold and high-contrast
 *
 * @example
 * <GlassClear dimmed className="px-3 py-2">
 *   Floating toolbar over video
 * </GlassClear>
 */
export const GlassClear = React.forwardRef<HTMLDivElement, GlassClearProps>(
  ({ dimmed = false, className, style, children, ...rest }, ref) => {
    const classes = [
      styles.clear,
      dimmed ? styles.clearDimmed : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} style={mergeGlassBackdropStyle('clear', style)} {...rest}>
        {children}
      </div>
    );
  }
);

GlassClear.displayName = 'GlassClear';
