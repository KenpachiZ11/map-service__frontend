import type { ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import { closeModal } from './modalSlice';
import { Modal } from './Modal';

type Props = {
  modalId: string;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  position?: 'fixed' | 'absolute';
  onClosed?: () => void;
};

/**
 * Управляющая обёртка модалки на Redux.
 * Рендерит <Modal/>, только если state.modal.modals[modalId] === true.
 */
export const ModalVariant = ({
  modalId,
  children,
  width,
  height,
  position,
  onClosed,
}: Props) => {
  const isOpen = useAppSelector((state) => state.modal.modals[modalId]);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const closed = () => {
    dispatch(closeModal(modalId));
    onClosed?.();
  };

  return (
    <Modal
      children={children}
      cb={closed}
      width={width}
      height={height}
      position={position}
    />
  );
};