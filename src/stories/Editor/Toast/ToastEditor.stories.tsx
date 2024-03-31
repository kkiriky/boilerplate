import type { Meta, StoryObj } from '@storybook/react';
import { default as ToastEditorComponent } from '@/components/ToastEditor/ToastEditor';
import { useCallback, useMemo, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import useUploadImage from '@/components/ToastEditor/hooks/useUploadImage';
import { toolbarItemsExceptImage } from '@/components/ToastEditor/ToastEditor.data';

const meta = {
  title: 'Boilerplate/Editor/Toast/ToastEditor',
  component: ToastEditorComponent,
  args: {
    editorRef: null,
    initialValue: '',
    toolbarItems: [],
    inputFileRef: undefined,
    onUploadImage: () => {},
  },
} satisfies Meta<typeof ToastEditorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastEditor: Story = {
  render: function Render() {
    const editorRef = useRef<Editor>(null);

    const {
      onUploadImageWhenSubmit,
      imageUploadButton,
      inputFileRef,
      onUploadImage,
    } = useUploadImage(editorRef);

    // 생성된 이미지 업로드 버튼을 toolbar에 넣기
    const toolbarItems = useMemo(() => {
      return toolbarItemsExceptImage.map((toolbarList, i) => {
        if (i !== toolbarItemsExceptImage.length - 1) return toolbarList;

        return [
          ...toolbarList,
          { name: 'image', el: imageUploadButton, tooltip: '이미지 삽입' },
        ];
      });
    }, [imageUploadButton]);

    const onSubmit = useCallback(async () => {
      if (!editorRef?.current) return;

      // 마크다운 방식
      // const markdownText = onUploadImageWhenSubmit(editorRef.current);
      // console.log(markdownText);

      // HTML 방식
      const htmlText = onUploadImageWhenSubmit(editorRef.current);
      console.log(htmlText);
    }, [onUploadImageWhenSubmit]);

    return (
      <>
        <ToastEditorComponent
          editorRef={editorRef}
          toolbarItems={toolbarItems}
          inputFileRef={inputFileRef}
          onUploadImage={onUploadImage}
        />

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
