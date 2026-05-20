import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
} from 'react';

// ─── Polymorphic Component Utilities ─────────────────────────────────────────
// Enables the `as` prop, allowing GlassRegular to render as any HTML element
// while preserving full type safety for the target element's native props.

type AsProp<C extends ElementType> = { as?: C };
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicProps<
  C extends ElementType,
  OwnProps = Record<never, never>
> = PropsWithChildren<OwnProps & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, OwnProps>>;

export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type PolymorphicForwardRefComponent<
  DefaultElement extends ElementType,
  OwnProps = Record<never, never>
> = <C extends ElementType = DefaultElement>(
  props: PolymorphicProps<C, OwnProps> & { ref?: PolymorphicRef<C> }
) => ReactElement | null;

// ─── Shared Component Types ───────────────────────────────────────────────────

/** Orientation for PanelSeparator layout dividers */
export type Orientation = 'horizontal' | 'vertical';

export type GlassRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
