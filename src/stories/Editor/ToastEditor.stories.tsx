import type { Meta, StoryObj } from '@storybook/react';
import { default as ToastEditorComponent } from '@/components/ToastEditor/ToastEditor';
import { useCallback, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';

const meta = {
  title: 'Boilerplate/Editor/ToastEditor',
  component: ToastEditorComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

    const onSubmit = useCallback(() => {
      if (!editorRef?.current) return;

      console.log(editorRef.current.getInstance().getMarkdown());
      // editorRef.current.getInstance().getHTML();
    }, []);

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
