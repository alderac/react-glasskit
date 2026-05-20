import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { PanelSeparator } from './PanelSeparator';

describe('PanelSeparator', () => {
  it('renders a passive visual separator by default', () => {
    render(<PanelSeparator aria-label="Panel divider" />);

    const separator = screen.getByRole('separator', { name: 'Panel divider' });
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).not.toHaveAttribute('tabindex');
  });

  it('accepts APG props when paired with resize behavior', () => {
    render(
      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector"
        aria-controls="editor-panel"
        aria-valuemin={30}
        aria-valuemax={70}
        aria-valuenow={50}
        tabIndex={0}
      />
    );

    const separator = screen.getByRole('separator', {
      name: 'Resize editor and inspector',
    });

    expect(separator).toHaveAttribute('aria-controls', 'editor-panel');
    expect(separator).toHaveAttribute('aria-valuemin', '30');
    expect(separator).toHaveAttribute('aria-valuemax', '70');
    expect(separator).toHaveAttribute('aria-valuenow', '50');
    expect(separator).toHaveAttribute('tabindex', '0');
  });

  it('lets hook-supplied APG props override defaults', () => {
    render(
      <PanelSeparator
        orientation="horizontal"
        aria-label="Resize preview and logs"
        aria-controls="preview-panel"
        aria-orientation="horizontal"
        aria-valuemin={20}
        aria-valuemax={80}
        aria-valuenow={40}
        tabIndex={0}
      />
    );

    const separator = screen.getByRole('separator', {
      name: 'Resize preview and logs',
    });

    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(separator).toHaveAttribute('aria-controls', 'preview-panel');
    expect(separator).toHaveAttribute('aria-valuenow', '40');
  });

  it('passes consumer compatibility props through to the separator element', () => {
    const ref = React.createRef<HTMLDivElement>();
    const handlePointerDown = vi.fn();

    render(
      <PanelSeparator
        ref={ref}
        className="resize-hitbox"
        style={{ width: '2px' }}
        aria-label="Resize editor"
        data-testid="separator"
        data-pane-edge="editor"
        onPointerDown={handlePointerDown}
      />
    );

    const separator = screen.getByRole('separator', { name: 'Resize editor' });
    expect(separator).toHaveClass('resize-hitbox');
    expect(separator).toHaveStyle({ width: '2px' });
    expect(separator).toHaveAttribute('data-pane-edge', 'editor');
    expect(ref.current).toBe(separator);

    fireEvent.pointerDown(separator);
    expect(handlePointerDown).toHaveBeenCalledTimes(1);
  });
});
