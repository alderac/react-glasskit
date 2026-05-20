import { useCallback, useState } from 'react';

export type ActivePanelId = string;

export interface PanelState {
  focused: boolean;
  inactive: boolean;
}

export interface UseActivePanelOptions<TPanelId extends ActivePanelId> {
  initialPanelId: TPanelId;
  onActivePanelChange?: (panelId: TPanelId) => void;
}

export interface UseActivePanelResult<TPanelId extends ActivePanelId> {
  activatePanel: (panelId: TPanelId) => void;
  activePanelId: TPanelId;
  getPanelState: (panelId: TPanelId) => PanelState;
  isFocused: (panelId: TPanelId) => boolean;
  isInactive: (panelId: TPanelId) => boolean;
  setActivePanelId: (panelId: TPanelId) => void;
}

export function useActivePanel<TPanelId extends ActivePanelId>({
  initialPanelId,
  onActivePanelChange,
}: UseActivePanelOptions<TPanelId>): UseActivePanelResult<TPanelId> {
  const [activePanelId, setActivePanelIdState] =
    useState<TPanelId>(initialPanelId);

  const activatePanel = useCallback(
    (panelId: TPanelId) => {
      setActivePanelIdState(panelId);
      onActivePanelChange?.(panelId);
    },
    [onActivePanelChange]
  );

  const isFocused = useCallback(
    (panelId: TPanelId) => activePanelId === panelId,
    [activePanelId]
  );

  const isInactive = useCallback(
    (panelId: TPanelId) => activePanelId !== panelId,
    [activePanelId]
  );

  const getPanelState = useCallback(
    (panelId: TPanelId): PanelState => ({
      focused: activePanelId === panelId,
      inactive: activePanelId !== panelId,
    }),
    [activePanelId]
  );

  return {
    activePanelId,
    activatePanel,
    setActivePanelId: activatePanel,
    isFocused,
    isInactive,
    getPanelState,
  };
}
