import { describe, expect, it } from 'vitest';

import styles from './glass.module.css';
import { getGlassRadiusClassName } from './radius';

describe('getGlassRadiusClassName', () => {
  it('returns the medium radius class by default', () => {
    expect(getGlassRadiusClassName(styles)).toBe(styles.radiusMd);
  });

  it.each([
    ['none', 'radiusNone'],
    ['sm', 'radiusSm'],
    ['md', 'radiusMd'],
    ['lg', 'radiusLg'],
    ['xl', 'radiusXl'],
    ['full', 'radiusFull'],
  ] as const)('maps %s to %s', (radius, classKey) => {
    expect(getGlassRadiusClassName(styles, radius)).toBe(styles[classKey]);
  });
});
