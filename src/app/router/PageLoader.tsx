import React from 'react';

type Props = {};

export const PageLoader = ({}: Props) => {
  return <div
    style={{
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
      height:         '100vh',
      width:          '100%',
    }}
  >
    Загрузка...
  </div>
}