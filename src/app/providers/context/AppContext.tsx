import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type AppContextValue = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

type Props = { children: ReactNode };

export const AppContextProvider = ({ children }: Props) => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);

  const value = useMemo(
    () => ({ count, increment, decrement }),
    [count, increment, decrement],
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