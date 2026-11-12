import { lazy } from 'react';

export const HomePage         = lazy(() => import(/* webpackPrefetch: true */'../../pages/Home/Home').then(m => ({ default: m.Home })));
export const ProfilePage      = lazy(() => import(/* webpackPrefetch: true */'../../pages/Profile/Profile').then(m => ({ default: m.Profile })));
export const CatalogListPage  = lazy(() => import(/* webpackPrefetch: true */'../../pages/Catalog/CatalogList').then(m => ({ default: m.CatalogList })));
export const CatalogItemPage  = lazy(() => import(/* webpackPrefetch: true */'../../pages/Catalog/CatalogItem').then(m => ({ default: m.CatalogItem })));