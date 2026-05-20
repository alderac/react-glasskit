import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import styles from '../../css/glass.module.css';
import { GlassRegular } from './GlassRegular';

describe('GlassRegular', () => {
  it('renders as a polymorphic element', () => {
    render(
      <GlassRegular as="nav" aria-label="Primary navigation">
        Workspace
      </GlassRegular>
    );

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('merges consumer class names', () => {
    render(<GlassRegular className="custom-shell">Content</GlassRegular>);

    expect(screen.getByText('Content')).toHaveClass('custom-shell');
  });

  it('preserves the global radius token when radius is omitted', () => {
    render(<GlassRegular>Content</GlassRegular>);

    expect(screen.getByText('Content')).not.toHaveClass(styles.radiusMd);
  });

  it('applies the requested radius class', () => {
    render(<GlassRegular radius="none">Content</GlassRegular>);

    expect(screen.getByText('Content')).toHaveClass(styles.radiusNone);
  });

  it('preserves backdrop filter styles inline for consumer CSS pipelines', () => {
    render(<GlassRegular style={{ opacity: 0.8 }}>Content</GlassRegular>);

    const surface = screen.getByText('Content');
    expect(surface.getAttribute('style')).toContain(
      'backdrop-filter: blur(var(--glass-blur-regular)) saturate(var(--glass-saturation-regular))'
    );
    expect(surface).toHaveStyle({ opacity: '0.8' });
  });

  it('passes polymorphic compatibility props through to the rendered element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const handleClick = vi.fn();

    render(
      <GlassRegular
        as="button"
        ref={ref}
        type="button"
        className="command-button"
        style={{ opacity: 0.9 }}
        aria-label="Open command menu"
        data-variant="toolbar"
        onClick={handleClick}
      >
        Command
      </GlassRegular>
    );

    const button = screen.getByRole('button', { name: 'Open command menu' });
    expect(button).toHaveClass('command-button');
    expect(button).toHaveStyle({ opacity: '0.9' });
    expect(button).toHaveAttribute('data-variant', 'toolbar');
    expect(button).toHaveAttribute('type', 'button');
    expect(ref.current).toBe(button);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes custom forwardRef component props through with radius styling', () => {
    const AppLink = React.forwardRef<
      HTMLAnchorElement,
      React.ComponentPropsWithoutRef<'a'> & { href: string }
    >((props, ref) => <a ref={ref} {...props} />);
    AppLink.displayName = 'AppLink';

    render(
      <GlassRegular as={AppLink} href="/dashboard" aria-label="Open dashboard" radius="lg">
        Dashboard
      </GlassRegular>
    );

    const link = screen.getByRole('link', { name: 'Open dashboard' });
    expect(link).toHaveAttribute('href', '/dashboard');
    expect(link).toHaveClass(styles.radiusLg);
  });
});
