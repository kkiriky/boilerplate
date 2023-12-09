import ReactModal from 'react-modal';
import { overlayDimStyle } from '../Modal.styles';
import { ConfirmModalProps } from './ConfirmModal.types';

import CloseIcon from '@/assets/icons/close.svg?react';
import InfoIcon from '@/assets/icons/info.svg?react';

const ConfirmModal = ({
  message,
  cancelText = '취소',
  confirmText = '확인',
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <ReactModal
      isOpen
      style={overlayDimStyle}
      className="center-modal flex w-312 flex-col items-center rounded-8 border border-[#00b4a9] px-20 pb-20 pt-30 shadow-[0_10px_30px_0_rgba(0,0,0,0.2)]"
    >
      <button onClick={onClose} className="absolute right-10 top-10">
        <CloseIcon />
      </button>

      <div className="mb-10 flex h-34 w-34 items-center justify-center rounded-full bg-[#00b4a9]">
        <InfoIcon />
      </div>

      <p className="mb-24 whitespace-pre-wrap text-center text-15 font-medium">
        {message}
      </p>

      <div className="grid w-full grid-cols-2 gap-12">
        <button
          onClick={onClose}
          className="h-40 w-full rounded-4 bg-gray-400 text-15 text-white"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className="h-40 w-full rounded-4 bg-[#00b4a9] text-15 text-white"
        >
          {confirmText}
        </button>
      </div>
    </ReactModal>
  );
};
export default ConfirmModal;
