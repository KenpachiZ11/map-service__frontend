import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

type Props = {};

export const CatalogItem = ({}: Props) => {
  const { id } = useParams();

  return <Page>
    <h2>Товар #{id}</h2>
    <Link to="/catalog">← Назад в каталог</Link>
  </Page>
}