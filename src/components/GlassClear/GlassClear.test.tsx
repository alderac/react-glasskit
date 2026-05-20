import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import styles from '../../css/glass.module.css';
import { GlassClear } from './GlassClear';

describe('GlassClear', () => {
  it('renders as a dimmed complementary region with the requested radius class', () => {
    render(
      <GlassClear aria-label="Media controls" as="aside" dimmed radius="full">
        Overlay
      </GlassClear>
    );

    const surface = screen.getByRole('complementary', {
      name: 'Media controls',
    });
    expect(surface).toHaveClass(styles.clearDimmed);
    expect(surface).toHaveClass(styles.radiusFull);
  });

  it('preserves the global radius token when radius is omitted', () => {
    render(<GlassClear>Overlay</GlassClear>);

    expect(screen.getByText('Overlay')).not.toHaveClass(styles.radiusMd);
  });

  it('preserves clear backdrop filter styles inline for consumer CSS pipelines', () => {
    render(<GlassClear style={{ opacity: 0.8 }}>Overlay</GlassClear>);

    const surface = screen.getByText('Overlay');
    expect(surface.getAttribute('style')).toContain(
      'backdrop-filter: blur(var(--glass-blur-clear)) saturate(var(--glass-saturation-clear))'
    );
    expect(surface).toHaveStyle({ opacity: '0.8' });
  });

  it('passes consumer compatibility props through to the clear surface', () => {
    const ref = React.createRef<HTMLDivElement>();
    const handlePointerDown = vi.fn();

    render(
      <GlassClear
        aria-label="Canvas toolbar"
        className="floating-toolbar"
        data-density="compact"
        data-testid="toolbar"
        onPointerDown={handlePointerDown}
        ref={ref}
        style={{ opacity: 0.9 }}
      >
        Overlay
      </GlassClear>
    );

    const surface = screen.getByTestId('toolbar');
    expect(surface).toHaveClass('floating-toolbar');
    expect(surface).toHaveStyle({ opacity: '0.9' });
    expect(surface).toHaveAttribute('aria-label', 'Canvas toolbar');
    expect(surface).toHaveAttribute('data-density', 'compact');
    expect(ref.current).toBe(surface);

    fireEvent.pointerDown(surface);
    expect(handlePointerDown).toHaveBeenCalledTimes(1);
  });

  it('passes custom forwardRef component props through with radius styling', () => {
    const AppLink = React.forwardRef<
      HTMLAnchorElement,
      React.ComponentPropsWithoutRef<'a'> & { href: string }
    >((props, ref) => <a ref={ref} {...props} />);
    AppLink.displayName = 'AppLink';

    render(
      <GlassClear
        aria-label="Open media controls"
        as={AppLink}
        href="/media"
        radius="lg"
      >
        Media
      </GlassClear>
    );

    const link = screen.getByRole('link', { name: 'Open media controls' });
    expect(link).toHaveAttribute('href', '/media');
    expect(link).toHaveClass(styles.radiusLg);
  });
});
