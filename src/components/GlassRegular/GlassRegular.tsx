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
  /** Additional class names to merge onto the glass surface */
  className?: string;
  radius?: GlassRadius;
};

export type GlassRegularProps<C extends React.ElementType = 'div'> =
  PolymorphicProps<C, OwnProps>;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GlassRegular
 *
 * Medium-transparency frosted glass surface. The workhorse material for
 * navigation layers: sidebars, toolbars, modals, panel headers, and
 * workspace selectors.
 *
 * - Backdrop: blur(20px) / saturate(180%)
 * - Fully polymorphic via the `as` prop — render as `nav`, `aside`, `header`, etc.
 * - Dark mode tokens applied automatically via tokens.css
 *
 * @example
 * <GlassRegular as="nav" className="p-4">
 *   Sidebar content
 * </GlassRegular>
 */
function GlassRegularInner<C extends React.ElementType = 'div'>(
  { as, className, radius, style, children, ...rest }: GlassRegularProps<C>,
  ref: PolymorphicRef<C>
) {
  const Tag = (as ?? 'div') as React.ElementType;
  return (
    <Tag
      className={[
        styles.regular,
        radius ? getGlassRadiusClassName(styles, radius) : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={ref}
      style={mergeGlassBackdropStyle('regular', style)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const GlassRegular = React.forwardRef(
  GlassRegularInner as unknown as React.ForwardRefRenderFunction<
    unknown,
    GlassRegularProps
  >
) as PolymorphicForwardRefComponent<'div', OwnProps>;

// The generic forwardRef cast erases displayName — set it manually
(GlassRegular as { displayName?: string }).displayName = 'GlassRegular';
