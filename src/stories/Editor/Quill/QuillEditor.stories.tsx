import type { Meta, StoryObj } from '@storybook/react';
import { default as QuillEditorComponent } from '@/components/QuillEditor/QuillEditor';
import { useCallback, useRef, useState } from 'react';
import Quill from 'quill';
import useUploadImage from '@/components/QuillEditor/hooks/useUploadImage';

const meta = {
  title: 'Boilerplate/Editor/QuillEditor',
  component: QuillEditorComponent,
  args: {
    editorRef: undefined,
  },
} satisfies Meta<typeof QuillEditorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QuillEditor: Story = {
  render: function Render() {
    const editorRef = useRef<Quill>();
    const [value, setValue] = useState('');

    const onChange = useCallback((value: string) => setValue(value), []);

    const { onUploadImageWhenSubmit } = useUploadImage({ editorRef });

    const onSubmit = useCallback(() => {
      // 이미지가 있을 경우 이미지의 src를 업로드된 주소로 변경한 value
      const changedValue = onUploadImageWhenSubmit(value);

      console.log(changedValue);
    }, [onUploadImageWhenSubmit, value]);

    return (
      <>
        <QuillEditorComponent editorRef={editorRef} onChange={onChange} />
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
