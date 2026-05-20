import type { GlassRadius } from '../types';

const glassRadiusClassKeys = {
  none: 'radiusNone',
  sm: 'radiusSm',
  md: 'radiusMd',
  lg: 'radiusLg',
  xl: 'radiusXl',
  full: 'radiusFull',
} as const satisfies Record<GlassRadius, string>;

export function getGlassRadiusClassName(
  styles: Readonly<Record<string, string>>,
  radius: GlassRadius = 'md'
): string {
  return styles[glassRadiusClassKeys[radius]];
}
