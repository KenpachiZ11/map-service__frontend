import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './app/router/router';
import { Providers } from './app/providers';

type Props = {};

export const App = ({}: Props) => (
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);