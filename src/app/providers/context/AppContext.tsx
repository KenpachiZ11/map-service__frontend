import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AppContextValue = {

};

const AppContext = createContext<AppContextValue | undefined>(undefined);

type Props = { children: ReactNode };

export const AppContextProvider = ({ children }: Props) => {
  const value = useMemo(
    () => ({}),
    [],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if(context === undefined) {
    throw new Error('useAppContext должен вызываться внутри <AppContextProvider>');
  };

  return context;
};