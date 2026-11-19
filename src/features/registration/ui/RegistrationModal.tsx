import { useState } from 'react';

import { useAppDispatch } from '@/app/providers/store';
import { loggedIn } from '@/entities/auth';
import { closeModal } from '@/shared/lib/modal';
import { MODAL_IDS } from '@/shared/config/modalConstants';
import { MaterialButton } from '@/shared/ui/MaterialButton';
import { MaterialInput } from '@/shared/ui/MaterialInput';

import { registerThunk } from '../registerSlice';

import styles from './RegistrationModal.module.scss';

const MODAL = MODAL_IDS.registration;
const MIN_PASSWORD_LENGTH = 4;

export const RegistrationModal = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFieldsEmpty =
    login.trim() === '' || password === '' || passwordRepeat === '';
  const disabled = isFieldsEmpty || isLoading;

  const handleSubmit = async () => {
    if (disabled) return;

    setError(null);

    if (password !== passwordRepeat) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символа`);
      return;
    }

    setIsLoading(true);

    const result = await dispatch(
      registerThunk({ login: login.trim(), password }),
    );

    setIsLoading(false);

    if (registerThunk.fulfilled.match(result)) {
      setError(null);
      dispatch(loggedIn(result.payload));
      dispatch(closeModal(MODAL));
      return;
    }

    const payload = registerThunk.rejected.match(result) ? result.payload : undefined;
    if (payload?.status === 409) {
      setError('Такой логин уже занят. Выберите другой.');
    } else {
      setError(payload?.message ?? 'Не удалось зарегистрироваться');
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.title}>Регистрация</div>

      <MaterialInput
        name="login"
        label="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <MaterialInput
        name="password"
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <MaterialInput
        name="passwordRepeat"
        label="Повторите пароль"
        type="password"
        value={passwordRepeat}
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />

      {error && <div className={styles.error}>{error}</div>}

      <MaterialButton
        name={isLoading ? 'Создание...' : 'Зарегистрироваться'}
        onClick={handleSubmit}
        disabled={disabled}
        fullWidth
        variant="contained"
      />
    </form>
  );
};