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
});
