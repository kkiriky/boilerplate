export type AlertType = 'success' | 'error';

export interface AlertModalProps {
  message: string;
  type?: AlertType;
  confirmText?: string;
  onConfirm?: () => void;
  onClose: () => void;
}
