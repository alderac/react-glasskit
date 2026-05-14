import type { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

// ─── Polymorphic Component Utilities ─────────────────────────────────────────
// Enables the `as` prop, allowing GlassRegular to render as any HTML element
// while preserving full type safety for the target element's native props.

type AsProp<C extends ElementType> = { as?: C };
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicProps<
  C extends ElementType,
  OwnProps = Record<string, never>
> = PropsWithChildren<OwnProps & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, OwnProps>>;

// ─── Shared Component Types ───────────────────────────────────────────────────

/** Orientation for PanelSeparator layout dividers */
export type Orientation = 'horizontal' | 'vertical';
