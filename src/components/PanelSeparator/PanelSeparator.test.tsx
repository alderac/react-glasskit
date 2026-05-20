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
        aria-controls="editor-panel"
        aria-label="Resize editor and inspector"
        aria-valuemax={70}
        aria-valuemin={30}
        aria-valuenow={50}
        resizable
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
        aria-controls="preview-panel"
        aria-label="Resize preview and logs"
        aria-orientation="horizontal"
        aria-valuemax={80}
        aria-valuemin={20}
        aria-valuenow={40}
        orientation="horizontal"
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
        aria-label="Resize editor"
        className="resize-hitbox"
        data-pane-edge="editor"
        data-testid="separator"
        onPointerDown={handlePointerDown}
        ref={ref}
        style={{ width: '2px' }}
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
