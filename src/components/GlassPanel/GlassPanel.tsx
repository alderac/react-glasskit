import React from 'react';
import type {
  GlassRadius,
  PolymorphicForwardRefComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '../../types';
import { mergeGlassBackdropStyle } from '../../css/backdropStyle';
import styles from '../../css/glass.module.css';
import { getGlassRadiusClassName } from '../../css/radius';

// ─── Types ────────────────────────────────────────────────────────────────────

type OwnProps = {
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
  radius?: GlassRadius;
  className?: string;
};

export type GlassPanelProps<C extends React.ElementType = 'div'> = PolymorphicProps<C, OwnProps>;

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
function GlassPanelInner<C extends React.ElementType = 'div'>(
  {
    as,
    focused = false,
    inactive = false,
    animate = false,
    radius = 'md',
    className,
    style,
    children,
    ...rest
  }: GlassPanelProps<C>,
  ref: PolymorphicRef<C>
) {
  const Tag = (as ?? 'div') as React.ElementType;
  const classes = [
    styles.panel,
    focused ? styles.panelFocused : '',
    inactive ? styles.panelInactive : '',
    animate ? styles.panelAnimate : '',
    getGlassRadiusClassName(styles, radius),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={classes} style={mergeGlassBackdropStyle('regular', style)} {...rest}>
      {children}
    </Tag>
  );
}

export const GlassPanel = React.forwardRef(
  GlassPanelInner as unknown as React.ForwardRefRenderFunction<unknown, GlassPanelProps>
) as PolymorphicForwardRefComponent<'div', OwnProps>;

(GlassPanel as { displayName?: string }).displayName = 'GlassPanel';
