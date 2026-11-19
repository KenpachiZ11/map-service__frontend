import type { ReactNode } from 'react';

import { Icons } from '@/shared/ui/icons';

import styles from './Modal.module.scss';

type Props = {
  children: ReactNode;
  /** Колбэк закрытия (вешается на крестик и клик по оверлею) */
  cb: () => void;
  width?: number | string;
  height?: number | string;
  position?: 'fixed' | 'absolute';
};

/** Визуальная модалка: оверлей + контейнер с крестиком */
export const Modal = ({
  children,
  cb,
  width,
  height,
  position = 'fixed',
}: Props) => (
  <div
    className={styles.wrapper}
    style={{ position }}
    onClick={cb}
  >
    <div
      className={styles.wrapper_block}
      style={{ width, height }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.closed_button}>
        <Icons icon_name="close" cb={cb} />
      </div>
      {children}
    </div>
  </div>
);