import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GlassClear } from './GlassClear';

describe('GlassClear', () => {
  it('preserves clear backdrop filter styles inline for consumer CSS pipelines', () => {
    render(<GlassClear style={{ opacity: 0.8 }}>Overlay</GlassClear>);

    const surface = screen.getByText('Overlay');
    expect(surface.getAttribute('style')).toContain(
      'backdrop-filter: blur(var(--glass-blur-clear)) saturate(var(--glass-saturation-clear))'
    );
    expect(surface).toHaveStyle({ opacity: '0.8' });
  });
});
