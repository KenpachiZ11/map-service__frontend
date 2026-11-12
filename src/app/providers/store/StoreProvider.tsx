import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import { store } from './store';

type Props = { children: ReactNode };

export const StoreProvider = ({ children }: Props) => <Provider store={store}>{children}</Provider>