import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import styles from '../../css/glass.module.css';
import { GlassScrim } from './GlassScrim';

describe('GlassScrim', () => {
  it('renders the regular fixed scrim with no radius by default', () => {
    render(<GlassScrim aria-hidden="true" data-testid="scrim" />);

    const scrim = screen.getByTestId('scrim');
    expect(scrim).toHaveClass(styles.scrim);
    expect(scrim).toHaveClass(styles.scrimRegular);
    expect(scrim).toHaveClass(styles.radiusNone);
    expect(scrim.getAttribute('style')).toContain(
      'backdrop-filter: blur(var(--glass-blur-scrim)) saturate(var(--glass-saturation-scrim))'
    );
  });

  it('applies requested strength and radius classes', () => {
    render(<GlassScrim data-testid="scrim" radius="lg" strength="strong" />);

    const scrim = screen.getByTestId('scrim');
    expect(scrim).toHaveClass(styles.scrimStrong);
    expect(scrim).toHaveClass(styles.radiusLg);
  });

  it('renders as an interactive polymorphic element with props, ref, and events', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const handleClick = vi.fn();

    render(
      <GlassScrim
        aria-label="Close navigation"
        as="button"
        onClick={handleClick}
        ref={ref}
        type="submit"
      />
    );

    const button = screen.getByRole('button', { name: 'Close navigation' });
    expect(button).toHaveAttribute('type', 'submit');
    expect(ref.current).toBe(button);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('defaults polymorphic buttons to type button when type is omitted', () => {
    render(<GlassScrim aria-label="Close drawer" as="button" />);

    expect(
      screen.getByRole('button', { name: 'Close drawer' })
    ).toHaveAttribute('type', 'button');
  });

  it('defaults polymorphic buttons to type button when type is undefined', () => {
    render(
      <GlassScrim aria-label="Close sheet" as="button" type={undefined} />
    );

    expect(screen.getByRole('button', { name: 'Close sheet' })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('preserves explicit polymorphic button types', () => {
    render(<GlassScrim aria-label="Submit form" as="button" type="submit" />);

    expect(screen.getByRole('button', { name: 'Submit form' })).toHaveAttribute(
      'type',
      'submit'
    );
  });
});
