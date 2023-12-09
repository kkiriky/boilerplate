import ReactModal from 'react-modal';

export const overlayDimStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
};

export const overlayTransparentStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'tranparent',
    inset: '50px 0 0',
  },
};
