import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import styles from '../../css/glass.module.css';
import { GlassPanel } from './GlassPanel';

describe('GlassPanel', () => {
  it('applies focused, inactive, and animate state classes', () => {
    render(
      <GlassPanel focused inactive animate>
        Editor
      </GlassPanel>
    );

    const panel = screen.getByText('Editor');
    expect(panel).toHaveClass(styles.panelFocused);
    expect(panel).toHaveClass(styles.panelInactive);
    expect(panel).toHaveClass(styles.panelAnimate);
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
        ref={ref}
        className="consumer-panel"
        style={{ opacity: 0.9 }}
        aria-label="Inspector panel"
        data-testid="panel"
        data-state="open"
        onClick={handleClick}
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
});
