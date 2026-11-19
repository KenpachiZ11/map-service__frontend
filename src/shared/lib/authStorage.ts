import type { AuthUser } from '@/shared/types/auth';

export const AUTH_STORAGE_KEY = 'auth-state';

export type StoredAuthState = {
  accessToken: string | null;
  user: AuthUser | null;
};

/** Читает сохранённое состояние авторизации из sessionStorage (частичная валидация). */
export const loadAuthState = (): StoredAuthState => {
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return { accessToken: null, user: null };

  try {
    const parsed = JSON.parse(raw) as StoredAuthState;
    if (
      parsed &&
      typeof parsed.accessToken === 'string' &&
      parsed.accessToken &&
      parsed.user
    ) {
      return { accessToken: parsed.accessToken, user: parsed.user };
    }
  } catch {
    // невалидные данные игнорируем
  }

  return { accessToken: null, user: null };
};

/** Сохраняет состояние авторизации в sessionStorage. */
export const saveAuthState = (state: StoredAuthState) => {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
};

/** Достаёт текущий токен для подстановки в Authorization (без парсинга всего состояния). */
export const getAuthToken = (): string | null => {
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredAuthState;
    return typeof parsed.accessToken === 'string' && parsed.accessToken
      ? parsed.accessToken
      : null;
  } catch {
    return null;
  }
};