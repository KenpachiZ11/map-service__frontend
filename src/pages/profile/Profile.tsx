import { useEffect } from 'react';

import { Page } from '@/widgets/Page';
import { FormProfile } from '@/features/profile/ui/FormProfile';

type Props = {};

export const Profile = ({}: Props) => {
  return (
    <Page>
      <FormProfile />
    </Page>
  );
}