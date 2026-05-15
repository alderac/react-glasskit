import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useResizablePanels } from './useResizablePanels';

function ResizableHarness() {
  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 50,
    minSize: 30,
    maxSize: 70,
    step: 5,
    largeStep: 10,
  });

  return (
    <div ref={panels.containerRef} data-testid="stage">
      <section id="editor-panel" style={panels.primaryPanelStyle}>
        Editor
      </section>
      <div
        {...panels.separatorProps}
        aria-label="Resize editor and inspector"
        data-testid="separator"
      />
      <section style={panels.secondaryPanelStyle}>Inspector</section>
    </div>
  );
}

function ResizableConstraintHarness({
  maxSize,
}: {
  maxSize: number;
}) {
  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 70,
    minSize: 30,
    maxSize,
  });

  return (
    <div ref={panels.containerRef}>
      <div
        {...panels.separatorProps}
        aria-label="Resize editor and inspector"
      />
    </div>
  );
}

describe('useResizablePanels', () => {
  it('returns APG separator props for keyboard resizing', () => {
    render(<ResizableHarness />);

    const separator = screen.getByRole('separator', {
      name: 'Resize editor and inspector',
    });

    expect(separator).toHaveAttribute('tabindex', '0');
    expect(separator).toHaveAttribute('aria-controls', 'editor-panel');
    expect(separator).toHaveAttribute('aria-valuemin', '30');
    expect(separator).toHaveAttribute('aria-valuemax', '70');
    expect(separator).toHaveAttribute('aria-valuenow', '50');

    fireEvent.keyDown(separator, { key: 'ArrowRight' });
    expect(separator).toHaveAttribute('aria-valuenow', '55');

    fireEvent.keyDown(separator, { key: 'Home' });
    expect(separator).toHaveAttribute('aria-valuenow', '30');
  });

  it('updates size from pointer movement', () => {
    render(<ResizableHarness />);

    const stage = screen.getByTestId('stage');
    const separator = screen.getByTestId('separator');

    vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    });

    fireEvent.pointerDown(separator, { clientX: 100, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(window, { clientX: 140, clientY: 0 });
    fireEvent.pointerUp(window);

    expect(separator).toHaveAttribute('aria-valuenow', '70');
  });

  it('re-clamps size when constraints change after mount', () => {
    const { rerender } = render(<ResizableConstraintHarness maxSize={70} />);

    const separator = screen.getByRole('separator', {
      name: 'Resize editor and inspector',
    });

    expect(separator).toHaveAttribute('aria-valuenow', '70');

    rerender(<ResizableConstraintHarness maxSize={60} />);

    expect(separator).toHaveAttribute('aria-valuemax', '60');
    expect(separator).toHaveAttribute('aria-valuenow', '60');
  });

  it('cleans pointer listeners when pointer interaction is canceled', () => {
    render(<ResizableHarness />);

    const stage = screen.getByTestId('stage');
    const separator = screen.getByTestId('separator');
    const addListener = vi.spyOn(window, 'addEventListener');
    const removeListener = vi.spyOn(window, 'removeEventListener');

    vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => undefined,
    });

    fireEvent.pointerDown(separator, { clientX: 100, clientY: 0, pointerId: 1 });
    fireEvent.pointerCancel(window);

    expect(addListener).toHaveBeenCalledWith('pointercancel', expect.any(Function));
    expect(removeListener).toHaveBeenCalledWith('pointermove', expect.any(Function));
    expect(removeListener).toHaveBeenCalledWith('pointerup', expect.any(Function));
    expect(removeListener).toHaveBeenCalledWith('pointercancel', expect.any(Function));
  });
});
