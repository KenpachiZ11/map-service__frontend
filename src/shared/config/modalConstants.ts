/**
 * Единый реестр ID модальных окон.
 * Добавляй сюда новый id — и используй константу вместо строки:
 *
 *   dispatch(openModal(MODAL_IDS.addCamera));
 *   <ModalVariant modalId={MODAL_IDS.addCamera}>…</ModalVariant>
 */
export const MODAL_IDS = {
  login: 'login',
  registration: 'registration'
  // Пример: addCamera: 'addCamera',
  // Пример: confirm: 'confirm',
} as const;

/** Union всех ID модалок — для типизации openModal/closeModal/ModalVariant */
export type ModalId = keyof typeof MODAL_IDS;

