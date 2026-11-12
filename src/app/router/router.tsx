import { Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";

import { Layout } from '@/widgets/Layout/Layout';

import { PageLoader } from './PageLoader';
import { HomePage, ProfilePage, CatalogListPage, CatalogItemPage } from './lazyPages';

const routers = [
  { index: true,        element: <HomePage /> },
  { path: 'profile',    element: <ProfilePage /> },
  {
    path: 'catalog',
    children: [
      { index: true,       element: <CatalogListPage /> },
      { path: 'item/:id',  element: <CatalogItemPage /> },
    ],
  },
  { path: '*',          element: <div>Такой страницы не существует</div> },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Layout />
      </Suspense>
    ),
    children: routers,
  },
]);