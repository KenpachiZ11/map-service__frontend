import React from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Navigation } from '../Navigation';

import styles from './ui/Layout.module.scss';

type Props = {};

export const Layout = ({}: Props) => {
  return <div className={styles.wrapper}>
    <header>
      <div>Logo</div>
      <Header />
    </header>
    <main>
      <Navigation />
      <Outlet />
    </main>
    <footer>Footer</footer>
  </div>
}