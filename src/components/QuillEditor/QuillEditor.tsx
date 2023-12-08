import { useEffect, useRef } from 'react';
import Quill from 'quill';
import { toolbarContainer } from './QuillEditor.options';

import 'quill/dist/quill.snow.css';
import '@/styles/quill-editor.scss';
import useUploadImage from './hooks/useUploadImage';

interface QuillEditorProps {
  editorRef: React.MutableRefObject<Quill | undefined>;
  initialValue?: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({
  editorRef,
  initialValue,
  onChange,
}: QuillEditorProps) {
  const quillContainer = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { onUploadImage } = useUploadImage({ editorRef });

  // 에디터 초기화
  useEffect(() => {
    if (!quillContainer.current) return;

    editorRef.current = new Quill(quillContainer.current, {
      theme: 'snow',
      placeholder: '내용을 작성해 주세요',
      modules: {
        toolbar: {
          container: toolbarContainer,
          handlers: {
            image: () => inputFileRef.current?.click(),
          },
        },
      },
    });
  }, [editorRef]);

  // 이벤트 핸들러 등록
  useEffect(() => {
    if (!editorRef.current) return;

    editorRef.current.on('text-change', () => {
      console.log('이벤트 핸들러 동작');
      onChange(editorRef.current?.root.innerHTML ?? '');
    });
  }, [editorRef, onChange]);

  // 편집모드일 경우 값 초기화
  useEffect(() => {
    if (!editorRef.current || !initialValue) return;

    editorRef.current.root.innerHTML = initialValue;
  }, [editorRef, initialValue]);

  return (
    <>
      <div ref={quillContainer} className="h-600" />

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
