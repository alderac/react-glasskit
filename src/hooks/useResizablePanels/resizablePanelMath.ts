import type { Orientation } from '../../types';

export interface ResizeRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface PointerPanelSizeInput {
  orientation: Orientation;
  clientX: number;
  clientY: number;
  rect: ResizeRect;
  minSize: number;
  maxSize: number;
}

export function clampPanelSize(size: number, minSize: number, maxSize: number): number {
  return Math.min(maxSize, Math.max(minSize, Math.round(size)));
}

export function getPointerPanelSize({
  orientation,
  clientX,
  clientY,
  rect,
  minSize,
  maxSize,
}: PointerPanelSizeInput): number {
  const activeAxisSize = orientation === 'vertical' ? rect.width : rect.height;

  if (activeAxisSize <= 0) {
    return minSize;
  }

  const rawSize =
    orientation === 'vertical'
      ? ((clientX - rect.left) / rect.width) * 100
      : ((clientY - rect.top) / rect.height) * 100;

  return clampPanelSize(rawSize, minSize, maxSize);
}

export function getKeyboardPanelSize(
  currentSize: number,
  key: string,
  orientation: Orientation,
  step: number,
  largeStep: number,
  minSize: number,
  maxSize: number
): number {
  const decrementKey = orientation === 'vertical' ? 'ArrowLeft' : 'ArrowUp';
  const incrementKey = orientation === 'vertical' ? 'ArrowRight' : 'ArrowDown';

  if (key === 'Home') return minSize;
  if (key === 'End') return maxSize;
  if (key === decrementKey) return clampPanelSize(currentSize - step, minSize, maxSize);
  if (key === incrementKey) return clampPanelSize(currentSize + step, minSize, maxSize);
  if (key === 'PageUp') return clampPanelSize(currentSize - largeStep, minSize, maxSize);
  if (key === 'PageDown') return clampPanelSize(currentSize + largeStep, minSize, maxSize);

  return currentSize;
}
