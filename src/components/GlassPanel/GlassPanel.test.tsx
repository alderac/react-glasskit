import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
