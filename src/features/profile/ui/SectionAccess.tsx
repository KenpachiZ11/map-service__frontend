import React from 'react';

import type { ProfileUser } from '@/shared/types/profile';
import styles from './SectionAccess.module.scss';

type Props = {
  data: ProfileUser
};

export const SectionAccess = ({ data }: Props) => {

  console.log(data, 'data');
  return <div className={styles.wrapper}>
    <div>
      <div>Роль</div>
      <div>{ data?.role }</div>
    </div>
    <div>
      <div>Доступы</div>
      <div>{ data?.access }</div>
    </div>
  </div>
}