import axios from 'axios';
import { getAuthToken } from '@/shared/lib/authStorage';

// Базовый URL API. Значение задаётся через env VITE_API_URL,
// fallback — относительный '/api' (в dev проксируется Vite на backend).
const baseURL = import.meta.env.VITE_API_URL ?? '/api';

export const http = axios.create({ baseURL });

// Подставляем Authorization: Bearer <token> для запросов от авторизованного пользователя.
// Токен читается из sessionStorage (тот же источник, что и Redux state) — это позволяет
// не завязывать shared/api на слой app/Redux и сохранять единый источник правды.
http.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Точки расширения (когда понадобится):
// 1) response-интерцептор — единая обработка 401 и обновление refresh-токена.