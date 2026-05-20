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

export type GlassScrimStrength = 'soft' | 'regular' | 'strong';

type OwnProps = {
  strength?: GlassScrimStrength;
  radius?: GlassRadius;
  className?: string;
};

export type GlassScrimProps<C extends React.ElementType = 'div'> = PolymorphicProps<C, OwnProps>;

const strengthClassNames = {
  soft: styles.scrimSoft,
  regular: styles.scrimRegular,
  strong: styles.scrimStrong,
} as const satisfies Record<GlassScrimStrength, string>;

function GlassScrimInner<C extends React.ElementType = 'div'>(
  {
    as,
    strength = 'regular',
    radius = 'none',
    className,
    style,
    children,
    ...rest
  }: GlassScrimProps<C>,
  ref: PolymorphicRef<C>
) {
  const Tag = (as ?? 'div') as React.ElementType;
  const buttonType =
    as === 'button' && !('type' in rest) ? ({ type: 'button' } as const) : undefined;
  const classes = [
    styles.scrim,
    strengthClassNames[strength],
    getGlassRadiusClassName(styles, radius),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={mergeGlassBackdropStyle('scrim', style)}
      {...buttonType}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const GlassScrim = React.forwardRef(
  GlassScrimInner as unknown as React.ForwardRefRenderFunction<unknown, GlassScrimProps>
) as PolymorphicForwardRefComponent<'div', OwnProps>;

(GlassScrim as { displayName?: string }).displayName = 'GlassScrim';
