import { useEffect, useState } from 'react';

import styles from './FormProfile.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import { profileThunk } from '../profileSlice';
import { MaterialButton } from '@/shared/ui/MaterialButton';
import { SectionPerson } from './SectionPerson';
import { SectionAccess } from './SectionAccess';

type Props = {};
type OpenItem = { name: string | null; open: boolean };

const SECTION_PERSONAL  = 'Личные данные';
const SECTION_ACCESS    = 'Доступы';

export const FormProfile = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError } = useAppSelector((state) => state.profile);

  const [openDataItem, setOpenItem] = useState<OpenItem>({
    name: SECTION_PERSONAL,
    open: true,
  });

  const isSectionOpened = (name: string) => openDataItem.open && openDataItem.name === name;
  const handleToggle = (name: string) => {
    setOpenItem((prev) =>
      prev.name === name
        ? { name: prev.name, open: !prev.open }
        : { name, open: true },
    );
  };

  useEffect(() => {
    if (user) {
      dispatch(profileThunk());
    }
  }, [user, dispatch]);

  if (!user) {
    return <div className={styles.wrapper_login}>Войдите, чтобы увидеть профиль</div>;
  }

  if (isLoading) {
    return <div className={styles.wrapper}>Загрузка профиля...</div>;
  }

  if (isError) {
    return (
      <div className={styles.wrapper}>
        {typeof isError === 'string'
          ? isError
          : 'Не удалось загрузить профиль'}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_buttons}>
        <MaterialButton
          name={SECTION_PERSONAL}
          onClick={() => handleToggle(SECTION_PERSONAL)}
          variant={isSectionOpened(SECTION_PERSONAL) ? 'contained' : 'outlined'}
        />
        <MaterialButton
          name={SECTION_ACCESS}
          onClick={() => handleToggle(SECTION_ACCESS)}
          variant={isSectionOpened(SECTION_ACCESS) ? 'contained' : 'outlined'}
        />
      </div>

      <div className={styles.wrapper_main}>
        { isSectionOpened(SECTION_PERSONAL) && <SectionPerson data={data}/> }
        { isSectionOpened(SECTION_ACCESS) && <SectionAccess data={data} /> }
      </div>
    </div>
  );
}