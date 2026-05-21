import { useCallback, useState } from 'react';

/** String identifier for a panel that can be marked active in a workspace. */
export type ActivePanelId = string;

/** Focus treatment state returned for a specific panel. */
export interface PanelState {
  /** True when this panel is the active panel. */
  focused: boolean;
  /** True when another panel is active and this panel should receive inactive treatment. */
  inactive: boolean;
}

export interface UseActivePanelOptions<TPanelId extends ActivePanelId> {
  /** Initial panel id to treat as active on first render. */
  initialPanelId: TPanelId;
  /** Called after `activatePanel` or `setActivePanelId` changes the active id. */
  onActivePanelChange?: (panelId: TPanelId) => void;
}

export interface UseActivePanelResult<TPanelId extends ActivePanelId> {
  /** Mark a panel active and notify `onActivePanelChange` when provided. */
  activatePanel: (panelId: TPanelId) => void;
  /** Current active panel id. */
  activePanelId: TPanelId;
  /** Return both focused and inactive booleans for a panel id. */
  getPanelState: (panelId: TPanelId) => PanelState;
  /** True when the provided panel id matches `activePanelId`. */
  isFocused: (panelId: TPanelId) => boolean;
  /** True when the provided panel id does not match `activePanelId`. */
  isInactive: (panelId: TPanelId) => boolean;
  /** Alias for `activatePanel`, useful when consumers want state-setter naming. */
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
