import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { path } from './utils';

import styles from './Navigation.module.scss';

type Props = {};

export const Navigation = ({}: Props) => {
  const location = useLocation();

  return <nav className={styles.wrapper}>
    {
      path?.map(p => {
        return <Link
          key={p.key}
          to={p.path}
          className={location.pathname === p.path ? `${styles.link} ${styles.active}` : styles.link}
        >
          <div className={styles.wrapper_main}>
            { p.icon }
            <div>{ p.name }</div>
          </div>
        </Link>
      })
    }
  </nav>
}