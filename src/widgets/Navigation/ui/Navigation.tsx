import React from 'react';

import styles from './Navigation.module.scss';

type Props = {};

export const Navigation = ({}: Props) => {
  return <nav className={styles.wrapper}>
    <div>Link 1</div>
    <div>Link 2</div>
    <div>Link 3</div>
  </nav>
}