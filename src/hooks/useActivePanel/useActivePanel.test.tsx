import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useActivePanel } from './useActivePanel';

type PanelId = 'editor' | 'inspector';

describe('useActivePanel', () => {
  it('tracks the active panel id and exposes focused/inactive helpers', () => {
    const { result } = renderHook(() =>
      useActivePanel<PanelId>({ initialPanelId: 'editor' })
    );

    expect(result.current.activePanelId).toBe('editor');
    expect(result.current.isFocused('editor')).toBe(true);
    expect(result.current.isInactive('inspector')).toBe(true);

    act(() => result.current.activatePanel('inspector'));

    expect(result.current.activePanelId).toBe('inspector');
    expect(result.current.getPanelState('inspector')).toEqual({
      focused: true,
      inactive: false,
    });
  });

  it('calls onActivePanelChange after activation', () => {
    const handleChange = vi.fn();
    const { result } = renderHook(() =>
      useActivePanel<PanelId>({
        initialPanelId: 'editor',
        onActivePanelChange: handleChange,
      })
    );

    act(() => result.current.activatePanel('inspector'));

    expect(handleChange).toHaveBeenCalledWith('inspector');
  });
});
