import { lazy, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '@/atoms/modal';
import { AlertModalProps } from '@/components/Modals/AlertModal/AlertModal.types';
import { ConfirmModalProps } from '@/components/Modals/ConfirmModal/ConfirmModal.types';
import { LazyComponent } from '@/types/global.types';

const AlertModal = lazy(
  () => import('@/components/Modals/AlertModal/AlertModal')
);
const ConfirmModal = lazy(
  () => import('@/components/Modals/ConfirmModal/ConfirmModal')
);

export const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  const openModal = useCallback(
    <T>(Component: LazyComponent<T>, props?: Omit<T, 'onClose'>) => {
      setModal((modals) => [...modals, { Component, props }]);
    },
    [setModal]
  );

  const closeModal = useCallback(
    <T>(Component: LazyComponent<T>) => {
      setModal((modals) => {
        return modals.filter((modal) => modal.Component !== Component);
      });
    },
    [setModal]
  );

  return { openModal, closeModal };
};

export const useAlertModal = () => {
  const { openModal, closeModal } = useModal();

  const openAlertModal = useCallback(
    (props: Omit<AlertModalProps, 'onClose'>) => {
      openModal(AlertModal, props);
    },
    [openModal]
  );

  const closeAlertModal = useCallback(() => {
    closeModal(AlertModal);
  }, [closeModal]);

  return { openAlertModal, closeAlertModal };
};

export const useConfirmModal = () => {
  const { openModal, closeModal } = useModal();

  const openConfirmModal = useCallback(
    (props: Omit<ConfirmModalProps, 'onClose'>) => {
      openModal(ConfirmModal, props);
    },
    [openModal]
  );

  const closeConfirmModal = useCallback(() => {
    closeModal(ConfirmModal);
  }, [closeModal]);

  return { openConfirmModal, closeConfirmModal };
};
