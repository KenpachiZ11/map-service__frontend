import axios from 'axios';

// Базовый URL API. Значение задаётся через env VITE_API_URL,
// fallback — относительный '/api' (для dev-прокси или nginx).
const baseURL = import.meta.env.VITE_API_URL ?? '/api';

export const http = axios.create({ baseURL });

// Точки расширения (когда понадобится):
// 1) request-интерцептор — добавлять Authorization-заголовок из хранилища;
// 2) response-интерцептор — единая обработка 401 и обновление refresh-токена.