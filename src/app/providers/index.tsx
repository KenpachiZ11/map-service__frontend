import type { ReactNode } from 'react';

import { StoreProvider } from './store';
import { AppContextProvider } from './context';

type Props = { children: ReactNode };

export const Providers = ({ children }: Props) => (
  <StoreProvider>
    <AppContextProvider>
      {children}
    </AppContextProvider>
  </StoreProvider>
);