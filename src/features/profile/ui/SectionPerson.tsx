import { useEffect, useState, type ChangeEvent } from 'react';

import { MaterialButton } from '@/shared/ui/MaterialButton';
import { MaterialInput } from '@/shared/ui/MaterialInput';
import type { ProfileFormFields, ProfileUser } from '@/shared/types/profile';
import { useAppDispatch } from '@/app/providers/store';
import { usersIdUpdThunk } from '@/features/users/usersSlice';
import { profileThunk } from '../profileSlice';

import styles from './SectionPerson.module.scss';

type Props = {
  data: ProfileUser
};

const initialState: ProfileFormFields = {
  firstName: '',
  lastName: '',
};

export const SectionPerson = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ProfileFormFields>(initialState);

  useEffect(() => {
    if (data) {
      setFormData({
        firstName:  data.firstName  ?? '',
        lastName:   data.lastName   ?? '',
      });
    }
  }, [data]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ProfileFormFields,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!data) return;

    // PATCH /api/v1/users/:id — обновляем свои данные (firstName/lastName).
    const result = await dispatch(
      usersIdUpdThunk({ id: data.id, data: formData }),
    );

    // /api/v1/auth/me возвращает текущего пользователя — обновляем профиль.
    if (usersIdUpdThunk.fulfilled.match(result)) {
      dispatch(profileThunk());
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.wrapper}>
      <MaterialInput
        name="firstName"
        label="Имя"
        value={formData.firstName}
        onChange={(e) => handleFieldChange(e, 'firstName')}
      />
      <MaterialInput
        name="lastName"
        label="Фамилия"
        value={formData.lastName}
        onChange={(e) => handleFieldChange(e, 'lastName')}
      />
      <MaterialButton
        name="Обновить"
        onClick={handleSubmit}
        fullWidth
        variant="contained"
      />
    </form>
  );
}