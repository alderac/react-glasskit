import React from 'react';
import type { PolymorphicProps } from '../../types';
import { mergeGlassBackdropStyle } from '../../css/backdropStyle';
import styles from '../../css/glass.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type OwnProps = {
  /** Additional class names to merge onto the glass surface */
  className?: string;
};

type GlassRegularProps<C extends React.ElementType = 'div'> = PolymorphicProps<C, OwnProps>;

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
  { as, className, style, children, ...rest }: GlassRegularProps<C>,
  ref: React.Ref<Element>
) {
  const Tag = (as ?? 'div') as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={[styles.regular, className].filter(Boolean).join(' ')}
      style={mergeGlassBackdropStyle('regular', style)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const GlassRegular = React.forwardRef(GlassRegularInner) as <
  C extends React.ElementType = 'div'
>(
  props: GlassRegularProps<C> & { ref?: React.Ref<Element> }
) => React.ReactElement;

// The generic forwardRef cast erases displayName — set it manually
(GlassRegular as { displayName?: string }).displayName = 'GlassRegular';

