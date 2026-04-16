import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AsideMode, AsidePayloadMap, AsideState } from './aside.types';

const initialState: AsideState = { isOpen: false, mode: null, payload: null };

interface AsideContextValue {
  asideState: AsideState;
  openAside: <M extends AsideMode>(mode: M, payload: AsidePayloadMap[M]) => void;
  closeAside: () => void;
}

const AsideContext = createContext<AsideContextValue | undefined>(undefined);

const AsideProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AsideState>(initialState);

  // reminder for me, every time AsideContextValue is changed, it will rerender all dependent components, so useCallback and useMemo ensure it doesn't unecessarily change

  const openAside = useCallback(
    <M extends AsideMode>(mode: M, payload: AsidePayloadMap[M]) => {
      setState({ isOpen: true, mode, payload } as AsideState);
    },
    []
  );

  const closeAside = useCallback(() => setState(initialState), []);

  const value = useMemo(
    () => ({ asideState: state, openAside, closeAside }),
    [state, openAside, closeAside]
  );

  return <AsideContext.Provider value={value}>{children}</AsideContext.Provider>;
};

const useAside = (): AsideContextValue => {
  const context = useContext(AsideContext);
  if (!context) throw new Error('useAside must be used within an AsideProvider');
  return context;
};

export { AsideProvider, useAside };