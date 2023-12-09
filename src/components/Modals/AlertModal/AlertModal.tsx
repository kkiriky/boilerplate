import ReactModal from 'react-modal';
import { AlertModalProps } from './AlertModal.types';
import { overlayDimStyle } from '../Modal.styles';
import { twMerge } from 'tailwind-merge';

import CloseIcon from '@/assets/icons/close.svg?react';
import CheckIcon from '@/assets/icons/alert-check.svg?react';
import ExclaimIcon from '@/assets/icons/exclaim.svg?react';

const AlertModal = ({
  message,
  type = 'success',
  confirmText = '확인',
  onConfirm,
  onClose,
}: AlertModalProps) => {
  return (
    <ReactModal
      isOpen
      style={overlayDimStyle}
      className={twMerge(
        'center-modal flex w-312 flex-col items-center rounded-8 border border-[#00b4a9] px-20 pb-20 pt-30 shadow-[0_10px_30px_0_rgba(0,0,0,0.2)]',
        type === 'error' && 'border-[#FF5449]'
      )}
    >
      <button onClick={onClose} className="absolute right-10 top-10">
        <CloseIcon />
      </button>

      <div
        className={twMerge(
          'mb-10 flex h-34 w-34 items-center justify-center rounded-full bg-[#00b4a9]',
          type === 'error' && 'bg-[#FF5449]'
        )}
      >
        {type === 'success' ? <CheckIcon /> : <ExclaimIcon />}
      </div>

      <p className="mb-24 whitespace-pre-wrap text-center text-15 font-medium">
        {message}
      </p>

      <button
        onClick={onConfirm}
        className={twMerge(
          'h-40 w-full rounded-4 bg-[#00b4a9] text-15 text-white',
          type === 'error' && 'bg-[#FF5449]'
        )}
      >
        {confirmText}
      </button>
    </ReactModal>
  );
};
export default AlertModal;
