// import { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { colorSyntaxOptions } from './colorSyntaxOptions';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@/styles/toast-editor.scss';

interface ToastEditorProps {
  editorRef: React.LegacyRef<Editor>;
  initialValue?: string;
}

export default function ToastEditor({
  editorRef,
  initialValue,
}: ToastEditorProps) {
  // 저장된 내용 불러오기
  // useEffect(() => {
  //   if (!editorRef?.current) return;

  //   const editorContent = editorStorage.get();
  //   editorRef.current.getInstance().setMarkdown(editorContent?.content ?? '');
  // }, [editorRef]);

  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={initialValue}
        placeholder="내용을 입력해주세요."
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut
        // toolbarItems={toorbarItems}
        plugins={[[colorSyntax, colorSyntaxOptions]]}
        language="ko-KR"
        // previewStyle="vertical" // 마크다운 모드일 경우에만 적용 (tab | vertical)
        // hideModeSwitch // markdown | wyswig 스위치 숨김 여부
      />
    </>
  );
}
