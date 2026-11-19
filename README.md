# map-service__frontend

Frontend сервиса карт. Стек: **React 19, TypeScript, Vite, MUI, Redux Toolkit (RTK), Axios**, SCSS.

- Архитектурная карта проекта: [`docs/architecture/frontend-map.md`](docs/architecture/frontend-map.md)
- Правила разработки: `.clinerules` (ответы и комментарии на русском)

## Что внутри

- **FSD-архитектура**: `app / pages / widgets / features / entities / shared`
- **UI-кит** (`shared/ui`): `MaterialInput`, `MaterialDropdown`, `MaterialButton`, `Icons`
- **Модальные окна** на Redux: `shared/lib/modal` (`openModal` / `ModalVariant`)
- **API-слой** (`shared/api`): axios-инстанс, `BaseApi`, фабрики thunk/слайсов
- **Провайдеры** (`app/providers`): Redux store, глобальный Context, композиция

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | dev-сервер Vite (прокси `/api` → `http://127.0.0.1:3000`) |
| `npm run build` | `tsc && vite build` — типизация + production-сборка |
| `npm run preview` | предпросмотр production-сборки |

## Разработка (API)

- Для работы с API во время разработки запросы к `/api` проксируются на backend-сервис
  (`map-service__backend`, порт 3000) — см. `proxy` в `vite.config.ts`. Сначала запусти backend.
- Альтернатива: задать абсолютный адрес через переменную окружения `VITE_API_URL`
  (например `http://localhost:3000/api`).