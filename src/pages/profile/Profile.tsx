import React from 'react';

import { Page } from '@/widgets/Page';
import { useAppContext } from '@/app/providers/context';

type Props = {};

export const Profile = ({}: Props) => {
  const { count, increment, decrement } = useAppContext();

  return <Page title="Профиль">
    <div>
      <button onClick={decrement}>-</button>
      <span>Context counter: {count}</span>
      <button onClick={increment}>+</button>
    </div>
  </Page>
}