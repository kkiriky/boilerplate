import { useRecoilValue } from 'recoil';
import { modalState } from '@/atoms/modal';
import { useModal } from './hooks/useModal';

const Modals = () => {
  const opendModals = useRecoilValue(modalState);
  const { closeModal } = useModal();

  return (
    <>
      {opendModals.map((modal, i) => {
        const { Component, props } = modal;
        const { onConfirm, ...restProps } = props ?? {};

        const onClose = () => {
          closeModal(Component);
          window.document.body.classList.remove('ReactModal__Body--open');
        };

        const confirm = (e: React.MouseEvent) => {
          if (typeof onConfirm === 'function') {
            onConfirm(e);
          }
          onClose();
        };

        return (
          <Component
            key={i}
            onClose={onClose}
            onConfirm={confirm}
            {...restProps}
          />
        );
      })}
    </>
  );
};

export default Modals;
