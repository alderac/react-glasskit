import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Orientation } from '../../types';
import {
  clampPanelSize,
  getKeyboardPanelSize,
  getPointerPanelSize,
} from './resizablePanelMath';

export interface UseResizablePanelsOptions {
  initialSize?: number;
  largeStep?: number;
  maxSize?: number;
  minSize?: number;
  onSizeChange?: (size: number) => void;
  orientation?: Orientation;
  primaryPanelId: string;
  step?: number;
}

export interface UseResizablePanelsResult {
  containerRef: RefObject<HTMLDivElement>;
  primaryPanelStyle: CSSProperties;
  primarySize: number;
  secondaryPanelStyle: CSSProperties;
  secondarySize: number;
  separatorProps: {
    role: 'separator';
    tabIndex: 0;
    'aria-controls': string;
    'aria-orientation': Orientation;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuenow': number;
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  };
  setPrimarySize: (size: number) => void;
}

export function useResizablePanels({
  primaryPanelId,
  orientation = 'vertical',
  initialSize = 50,
  minSize = 25,
  maxSize = 75,
  step = 5,
  largeStep = 10,
  onSizeChange,
}: UseResizablePanelsOptions): UseResizablePanelsResult {
  const initialClampedSize = clampPanelSize(initialSize, minSize, maxSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCleanupRef = useRef<(() => void) | null>(null);
  const lastSizeRef = useRef(initialClampedSize);
  const [primarySize, setPrimarySizeState] = useState(initialClampedSize);

  const setPrimarySize = useCallback(
    (size: number) => {
      const nextSize = clampPanelSize(size, minSize, maxSize);

      setPrimarySizeState((currentSize) => {
        if (currentSize === nextSize) {
          return currentSize;
        }
        return nextSize;
      });

      if (lastSizeRef.current !== nextSize) {
        lastSizeRef.current = nextSize;
        onSizeChange?.(nextSize);
      }
    },
    [maxSize, minSize, onSizeChange]
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      event.preventDefault();
      activeCleanupRef.current?.();

      const rect = container.getBoundingClientRect();

      const handlePointerMove = (moveEvent: PointerEvent) => {
        setPrimarySize(
          getPointerPanelSize({
            orientation,
            clientX: moveEvent.clientX,
            clientY: moveEvent.clientY,
            rect,
            minSize,
            maxSize,
          })
        );
      };

      const handlePointerEnd = () => {
        activeCleanupRef.current?.();
        activeCleanupRef.current = null;
      };

      activeCleanupRef.current = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerEnd);
        window.removeEventListener('pointercancel', handlePointerEnd);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerEnd);
      window.addEventListener('pointercancel', handlePointerEnd);
    },
    [maxSize, minSize, orientation, setPrimarySize]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const nextSize = getKeyboardPanelSize(
        primarySize,
        event.key,
        orientation,
        step,
        largeStep,
        minSize,
        maxSize
      );

      if (nextSize === primarySize) {
        return;
      }

      event.preventDefault();
      setPrimarySize(nextSize);
    },
    [
      largeStep,
      maxSize,
      minSize,
      orientation,
      primarySize,
      setPrimarySize,
      step,
    ]
  );

  useEffect(
    () => () => {
      activeCleanupRef.current?.();
    },
    []
  );

  useEffect(() => {
    setPrimarySize(primarySize);
  }, [primarySize, setPrimarySize]);

  const primaryPanelStyle = useMemo<CSSProperties>(
    () =>
      orientation === 'vertical'
        ? { flex: `0 0 ${primarySize}%`, minWidth: 0 }
        : { flex: `0 0 ${primarySize}%`, minHeight: 0 },
    [orientation, primarySize]
  );

  const secondaryPanelStyle = useMemo<CSSProperties>(
    () => ({ flex: 1, minWidth: 0, minHeight: 0 }),
    []
  );

  return {
    containerRef,
    primarySize,
    secondarySize: 100 - primarySize,
    setPrimarySize,
    primaryPanelStyle,
    secondaryPanelStyle,
    separatorProps: {
      role: 'separator',
      tabIndex: 0,
      'aria-controls': primaryPanelId,
      'aria-orientation': orientation,
      'aria-valuemin': minSize,
      'aria-valuemax': maxSize,
      'aria-valuenow': primarySize,
      onPointerDown: handlePointerDown,
      onKeyDown: handleKeyDown,
    },
  };
}
