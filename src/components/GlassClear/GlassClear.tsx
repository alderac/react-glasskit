import React from 'react';
import { mergeGlassBackdropStyle } from '../../css/backdropStyle';
import styles from '../../css/glass.module.css';
import { getGlassRadiusClassName } from '../../css/radius';
import type {
  GlassRadius,
  PolymorphicForwardRefComponent,
  PolymorphicProps,
  PolymorphicRef,
} from '../../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type OwnProps = {
  /**
   * Adds a semi-transparent darkening overlay beneath children.
   * Required when GlassClear sits directly over vibrant or media-rich
   * content to prevent color interference with text legibility.
   */
  dimmed?: boolean;
  radius?: GlassRadius;
  className?: string;
};

export type GlassClearProps<C extends React.ElementType = 'div'> =
  PolymorphicProps<C, OwnProps>;

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
function GlassClearInner<C extends React.ElementType = 'div'>(
  {
    as,
    dimmed = false,
    radius,
    className,
    style,
    children,
    ...rest
  }: GlassClearProps<C>,
  ref: PolymorphicRef<C>
) {
  const Tag = (as ?? 'div') as React.ElementType;
  const classes = [
    styles.clear,
    dimmed ? styles.clearDimmed : '',
    radius ? getGlassRadiusClassName(styles, radius) : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      ref={ref}
      style={mergeGlassBackdropStyle('clear', style)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const GlassClear = React.forwardRef(
  GlassClearInner as unknown as React.ForwardRefRenderFunction<
    unknown,
    GlassClearProps
  >
) as PolymorphicForwardRefComponent<'div', OwnProps>;

(GlassClear as { displayName?: string }).displayName = 'GlassClear';
