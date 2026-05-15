import { describe, expect, it } from 'vitest';
import {
  clampPanelSize,
  getKeyboardPanelSize,
  getPointerPanelSize,
} from './resizablePanelMath';

describe('resizable panel math', () => {
  it('clamps panel size to the configured range', () => {
    expect(clampPanelSize(20, 30, 70)).toBe(30);
    expect(clampPanelSize(50, 30, 70)).toBe(50);
    expect(clampPanelSize(90, 30, 70)).toBe(70);
  });

  it('calculates horizontal pointer size as a percentage', () => {
    expect(
      getPointerPanelSize({
        orientation: 'vertical',
        clientX: 150,
        clientY: 0,
        rect: { left: 50, top: 0, width: 200, height: 100 },
        minSize: 30,
        maxSize: 70,
      })
    ).toBe(50);
  });

  it('calculates vertical pointer size as a percentage', () => {
    expect(
      getPointerPanelSize({
        orientation: 'horizontal',
        clientX: 0,
        clientY: 75,
        rect: { left: 0, top: 25, width: 200, height: 100 },
        minSize: 20,
        maxSize: 80,
      })
    ).toBe(50);
  });

  it('maps arrow keys for vertical separators', () => {
    expect(getKeyboardPanelSize(50, 'ArrowLeft', 'vertical', 5, 10, 30, 70)).toBe(45);
    expect(getKeyboardPanelSize(50, 'ArrowRight', 'vertical', 5, 10, 30, 70)).toBe(55);
  });

  it('maps arrow keys for horizontal separators', () => {
    expect(getKeyboardPanelSize(50, 'ArrowUp', 'horizontal', 5, 10, 30, 70)).toBe(45);
    expect(getKeyboardPanelSize(50, 'ArrowDown', 'horizontal', 5, 10, 30, 70)).toBe(55);
  });

  it('supports Home and End key bounds', () => {
    expect(getKeyboardPanelSize(50, 'Home', 'vertical', 5, 10, 30, 70)).toBe(30);
    expect(getKeyboardPanelSize(50, 'End', 'vertical', 5, 10, 30, 70)).toBe(70);
  });

  it('returns the minimum size when pointer math has a zero active axis', () => {
    expect(
      getPointerPanelSize({
        orientation: 'vertical',
        clientX: 0,
        clientY: 0,
        rect: { left: 0, top: 0, width: 0, height: 100 },
        minSize: 30,
        maxSize: 70,
      })
    ).toBe(30);

    expect(
      getPointerPanelSize({
        orientation: 'horizontal',
        clientX: 0,
        clientY: 0,
        rect: { left: 0, top: 0, width: 100, height: 0 },
        minSize: 25,
        maxSize: 75,
      })
    ).toBe(25);
  });
});
