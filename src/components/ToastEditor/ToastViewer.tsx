import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css'; // Viewer css

interface ToastViewerProps {
  initialValue?: string;
}

export default function ToastViewer({ initialValue }: ToastViewerProps) {
  if (!initialValue) {
    return null;
  }

  return <Viewer initialValue={initialValue} />;
}
