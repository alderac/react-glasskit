import type { CSSProperties } from 'react';

const regularBackdropStyle = {
  backdropFilter: 'blur(var(--glass-blur-regular)) saturate(var(--glass-saturation-regular))',
  WebkitBackdropFilter: 'blur(var(--glass-blur-regular)) saturate(var(--glass-saturation-regular))',
} satisfies CSSProperties;

const clearBackdropStyle = {
  backdropFilter: 'blur(var(--glass-blur-clear)) saturate(var(--glass-saturation-clear))',
  WebkitBackdropFilter: 'blur(var(--glass-blur-clear)) saturate(var(--glass-saturation-clear))',
} satisfies CSSProperties;

const scrimBackdropStyle = {
  backdropFilter: 'blur(var(--glass-blur-scrim)) saturate(var(--glass-saturation-scrim))',
  WebkitBackdropFilter: 'blur(var(--glass-blur-scrim)) saturate(var(--glass-saturation-scrim))',
} satisfies CSSProperties;

const backdropStyles = {
  regular: regularBackdropStyle,
  clear: clearBackdropStyle,
  scrim: scrimBackdropStyle,
};

export function mergeGlassBackdropStyle(
  variant: keyof typeof backdropStyles,
  style?: CSSProperties
): CSSProperties {
  return {
    ...backdropStyles[variant],
    ...style,
  };
}
