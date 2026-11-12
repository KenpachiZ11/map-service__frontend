import React from 'react';

import { Page } from '@/widgets/Page';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import { increment, decrement } from '@/features/counter';

type Props = {};

export const Home = ({}: Props) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return <Page>
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>Redux counter: {count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  </Page>
}