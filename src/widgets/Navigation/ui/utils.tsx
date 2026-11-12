import { Icons } from '../../../shared/ui/icons';
import type { ReactNode } from 'react';

export type NavItem = {
  name: string;
  path: string;
  key: string;
  icon?: ReactNode;
};

export const path: NavItem[] = [
  {
    name: 'Главная',
    path: '/',
    key: 'home',
    icon: <Icons icon_name={'home'} />,
  },
  {
    name: 'Профиль',
    path: '/profile',
    key: 'profile',
    icon: <Icons icon_name={'person'} />,
  },
  {
    name: 'Каталог',
    path: '/catalog',
    key: 'catalog',
    icon: <Icons icon_name={'list'} />,
  },
];