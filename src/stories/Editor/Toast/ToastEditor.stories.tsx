import type { Meta, StoryObj } from '@storybook/react';
import { default as ToastEditorComponent } from '@/components/ToastEditor/ToastEditor';
import { useCallback, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useUploadImage from '@/components/ToastEditor/hooks/useUploadImage';

const meta = {
  title: 'Boilerplate/Editor/Toast/ToastEditor',
  component: ToastEditorComponent,
  args: {
    editorRef: null,
    initialValue: '',
  },
} satisfies Meta<typeof ToastEditorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastEditor: Story = {
  render: function Render() {
    const editorRef = useRef<Editor>(null);

    const { onUploadImageWhenSubmit } = useUploadImage(editorRef);
    const onSubmit = useCallback(async () => {
      if (!editorRef?.current) return;

      const markdownText = onUploadImageWhenSubmit(editorRef.current);
      console.log(markdownText);
    }, [onUploadImageWhenSubmit]);

    return (
      <>
        <ToastEditorComponent editorRef={editorRef} />

        <button
          onClick={onSubmit}
          className="ml-auto mt-32 block h-40 w-120 rounded-4 bg-blue-400 text-white"
        >
          작성
        </button>
      </>
    );
  },
};
