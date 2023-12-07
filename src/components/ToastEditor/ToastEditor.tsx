import { useMemo } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import {
  colorSyntaxOptions,
  toolbarItemsExceptImage,
} from './toastEditorOptions';
import useUploadImage from './hooks/useUploadImage';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@/styles/toast-editor.scss';
interface ToastEditorProps {
  editorRef: React.RefObject<Editor> | null;
  initialValue?: string;
}

export default function ToastEditor({
  editorRef,
  initialValue,
}: ToastEditorProps) {
  const { imageUploadButton, inputFileRef, onUploadImage } =
    useUploadImage(editorRef);

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

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={initialValue}
        placeholder="내용을 입력해주세요."
        height="80vh"
        initialEditType="wysiwyg"
        useCommandShortcut
        toolbarItems={toolbarItems}
        plugins={[[colorSyntax, colorSyntaxOptions]]}
        language="ko-KR"
        // previewStyle="vertical" // 마크다운 모드일 경우에만 적용 (tab | vertical)
        // hideModeSwitch // markdown | wyswig 스위치 숨김 여부
      />

      <input
        type="file"
        multiple
        accept="image/*"
        hidden
        ref={inputFileRef}
        onChange={onUploadImage}
      />
    </>
  );
}
