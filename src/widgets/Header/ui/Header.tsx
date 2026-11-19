import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import { loggedOut } from '@/entities/auth';
import { MODAL_IDS } from '@/shared/config/modalConstants';

import { MaterialButton } from '@/shared/ui/MaterialButton';

import { LoginModal } from '@/features/login';
import { RegistrationModal } from '@/features/registration';

import styles from './Header.module.scss';
import { ModalVariant, openModal } from '@/shared/lib/modal';

type Props = {};

export const Header = ({}: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(loggedOut());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_header}>Header</div>
      <div className={styles.wrapper_buttons}>
        {user ? (
          <>
            <div className={styles.wrapper_user}>{user.login}</div>
            <MaterialButton name='Выйти' onClick={handleLogout} />
          </>
        ) : (
          <>
            <MaterialButton name='Зарегистрироваться' onClick={() => dispatch(openModal(MODAL_IDS.registration))}/>
            <MaterialButton name='Войти' onClick={() => dispatch(openModal(MODAL_IDS.login))}/>
          </>
        )}
      </div>

      <ModalVariant
        modalId={MODAL_IDS.registration}
        children={<RegistrationModal />}
      />
      <ModalVariant
        modalId={MODAL_IDS.login}
        children={<LoginModal />}
      />
    </div>
  )
}