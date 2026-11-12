import React from 'react';
import { Link } from 'react-router-dom';

import { Page } from '@/widgets/Page';

type Props = {};

export const CatalogList = ({}: Props) => {
  return <Page title="Каталог">
    <ul>
      <li><Link to="/catalog/item/1">Товар 1</Link></li>
      <li><Link to="/catalog/item/2">Товар 2</Link></li>
      <li><Link to="/catalog/item/3">Товар 3</Link></li>
    </ul>
  </Page>
}