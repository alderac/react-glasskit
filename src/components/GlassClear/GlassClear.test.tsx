import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
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

  it('passes consumer compatibility props through to the clear surface', () => {
    const ref = React.createRef<HTMLDivElement>();
    const handlePointerDown = vi.fn();

    render(
      <GlassClear
        ref={ref}
        className="floating-toolbar"
        style={{ opacity: 0.9 }}
        aria-label="Canvas toolbar"
        data-testid="toolbar"
        data-density="compact"
        onPointerDown={handlePointerDown}
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
});
