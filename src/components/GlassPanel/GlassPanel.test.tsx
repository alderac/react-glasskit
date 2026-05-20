import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import styles from '../../css/glass.module.css';
import { GlassPanel } from './GlassPanel';

describe('GlassPanel', () => {
  it('applies focused, inactive, and animate state classes', () => {
    render(
      <GlassPanel animate focused inactive>
        Editor
      </GlassPanel>
    );

    const panel = screen.getByText('Editor');
    expect(panel).toHaveClass(styles.panelFocused);
    expect(panel).toHaveClass(styles.panelInactive);
    expect(panel).toHaveClass(styles.panelAnimate);
  });

  it('renders as a named section with the requested radius class', () => {
    render(
      <GlassPanel aria-label="Workspace panel" as="section" radius="xl">
        Editor
      </GlassPanel>
    );

    const panel = screen.getByRole('region', { name: 'Workspace panel' });
    expect(panel).toHaveClass(styles.radiusXl);
  });

  it('preserves the global radius token when radius is omitted', () => {
    render(<GlassPanel>Editor</GlassPanel>);

    expect(screen.getByText('Editor')).not.toHaveClass(styles.radiusMd);
  });

  it('preserves backdrop filter styles inline for consumer CSS pipelines', () => {
    render(<GlassPanel style={{ opacity: 0.8 }}>Editor</GlassPanel>);

    const panel = screen.getByText('Editor');
    expect(panel.getAttribute('style')).toContain(
      'backdrop-filter: blur(var(--glass-blur-regular)) saturate(var(--glass-saturation-regular))'
    );
    expect(panel).toHaveStyle({ opacity: '0.8' });
  });

  it('passes consumer compatibility props through to the panel element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const handleClick = vi.fn();

    render(
      <GlassPanel
        aria-label="Inspector panel"
        className="consumer-panel"
        data-state="open"
        data-testid="panel"
        onClick={handleClick}
        ref={ref}
        style={{ opacity: 0.9 }}
      >
        Inspector
      </GlassPanel>
    );

    const panel = screen.getByTestId('panel');
    expect(panel).toHaveClass(styles.panel);
    expect(panel).toHaveClass('consumer-panel');
    expect(panel).toHaveStyle({ opacity: '0.9' });
    expect(panel).toHaveAttribute('aria-label', 'Inspector panel');
    expect(panel).toHaveAttribute('data-state', 'open');
    expect(ref.current).toBe(panel);

    fireEvent.click(panel);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a button with typed props, ref, click handler, and radius styling', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const handleClick = vi.fn();

    render(
      <GlassPanel
        aria-label="Toggle inspector"
        as="button"
        onClick={handleClick}
        radius="sm"
        ref={ref}
        type="button"
      >
        Toggle
      </GlassPanel>
    );

    const button = screen.getByRole('button', { name: 'Toggle inspector' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass(styles.radiusSm);
    expect(ref.current).toBe(button);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
