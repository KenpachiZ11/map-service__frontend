import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

type Props = {};

export const CatalogItem = ({}: Props) => {
  const { id } = useParams();

  return <Page title={`Товар #${id}`}>
    <Link to="/catalog">← Назад в каталог</Link>
  </Page>
}