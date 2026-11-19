import { useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '@/app/providers/store';
import { loggedIn } from '@/entities/auth';
import { closeModal } from '@/shared/lib/modal';
import { MODAL_IDS } from '@/shared/config/modalConstants';
import { MaterialButton } from '@/shared/ui/MaterialButton';
import { MaterialInput } from '@/shared/ui/MaterialInput';

import { loginThunk } from '../loginSlice';

import styles from './LoginModal.module.scss';

const MODAL = MODAL_IDS.login;
const MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 30;
const LOCK_STORAGE_KEY = 'login-lock-until';

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

/** Достаёт активную блокировку из sessionStorage (если она не истекла) */
const readStoredLock = (): { lockUntil: number | null; secondsLeft: number } => {
  const raw = sessionStorage.getItem(LOCK_STORAGE_KEY);
  if (!raw) return { lockUntil: null, secondsLeft: 0 };

  const ts = Number(raw);
  if (!Number.isFinite(ts) || Date.now() >= ts) {
    return { lockUntil: null, secondsLeft: 0 };
  }

  return {
    lockUntil: ts,
    secondsLeft: Math.ceil((ts - Date.now()) / 1000),
  };
};

export const LoginModal = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lockUntil, setLockUntil] = useState<number | null>(
    () => readStoredLock().lockUntil,
  );
  const [secondsLeft, setSecondsLeft] = useState<number>(
    () => readStoredLock().secondsLeft,
  );
  const attemptsRef = useRef(0);

  const isLocked = lockUntil !== null && Date.now() < lockUntil;

  useEffect(() => {
    if (lockUntil === null) return;

    const tick = () => {
      const left = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) {
        sessionStorage.removeItem(LOCK_STORAGE_KEY);
        setLockUntil(null);
        setSecondsLeft(0);
        setError(null);
        attemptsRef.current = 0;
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockUntil]);

  const isFieldsEmpty = login.trim() === '' || password === '';
  const disabled = isFieldsEmpty || isLoading || isLocked;

  const handleSubmit = async () => {
    if (disabled) return;

    setIsLoading(true);
    setError(null);

    const result = await dispatch(loginThunk({ login: login.trim(), password }));

    setIsLoading(false);

    if (loginThunk.fulfilled.match(result)) {
      sessionStorage.removeItem(LOCK_STORAGE_KEY);
      attemptsRef.current = 0;
      dispatch(loggedIn(result.payload));
      dispatch(closeModal(MODAL));
      return;
    }

    const payload = loginThunk.rejected.match(result) ? result.payload : undefined;
    setError(payload?.message ?? 'Не удалось войти');

    if (payload?.status === 401) {
      attemptsRef.current += 1;
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        const next = Date.now() + LOCK_SECONDS * 1000;
        sessionStorage.setItem(LOCK_STORAGE_KEY, String(next));
        setError('Слишком много неудачных попыток. Попробуйте снова чуть позже.');
        setLockUntil(next);
        setSecondsLeft(LOCK_SECONDS);
      }
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.title}>Вход</div>

      <MaterialInput
        name="login"
        label="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        disabled={isLocked}
      />

      <MaterialInput
        name="password"
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLocked}
      />

      {error && <div className={styles.error}>{error}</div>}

      {isLocked && secondsLeft > 0 && (
        <div className={styles.timer}>
          Повторите через {formatTime(secondsLeft)}
        </div>
      )}

      <MaterialButton
        name={isLoading ? 'Проверка...' : 'Войти'}
        onClick={handleSubmit}
        disabled={disabled}
        fullWidth
        variant="contained"
      />
    </form>
  );
};