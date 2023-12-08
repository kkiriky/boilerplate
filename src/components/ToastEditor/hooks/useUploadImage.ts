import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { base64toFile } from '@/utils/base64ToFileObj';
import { base64ImageRegex } from '@/common/regex';
import { v4 as uuidv4 } from 'uuid';

const useUploadImage = (editorRef: React.RefObject<Editor> | null) => {
  // 이미지 업로드 버튼 생성
  const imageUploadButton = useMemo(() => {
    const button = document.createElement('button');

    button.className = 'image toastui-editor-toolbar-icons';
    button.style.margin = '0';

    return button;
  }, []);

  // 이미지 업로드 버튼 클릭 시 파일 선택 띄우기
  const inputFileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const clickHandler = () => inputFileRef.current?.click();

    const imageButton = window.document.querySelector(
      `.image.toastui-editor-toolbar-icons`
    );
    if (!imageButton) return;

    imageButton.addEventListener('click', clickHandler);
    return () => imageButton.removeEventListener('click', clickHandler);
  }, []);

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editorRef?.current) return;

      const { files } = e.target;
      if (!files) return;

      const editor = editorRef.current.getInstance();

      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onabort = () => alert('파일 읽기가 중단되었습니다.');
        reader.onerror = () => alert('파일을 읽어오는데 실패하였습니다.');
        reader.onloadend = () => {
          if (!reader.result || typeof reader.result !== 'string') return;

          editor.exec('addImage', { imageUrl: reader.result });
        };
      }
    },
    [editorRef]
  );

  // 제출 시 서버 측에 이미지 업로드
  const onUploadImageWhenSubmit = useCallback((editor: Editor) => {
    let markdownText: string = editor.getInstance().getMarkdown();

    // 1) base64 이미지들을 추출
    const matchArray = [...markdownText.matchAll(base64ImageRegex)];
    // 이미지가 존재할 경우에만
    if (matchArray.length) {
      // 첫 번째 인자는 정규표현식과 일치하는 텍스트(markdownImage), 두 번째 부터는 정규표현식의 capture 그룹과 일치하는 텍스트(base64)
      for (const [markdownImage, base64] of matchArray) {
        // 2) file 객체로 변환
        const file = base64toFile({ base64, filename: uuidv4() });
        console.log(file);

        try {
          // 3) 이미지 업로드
          /**************************
              이미지 업로드 로직 작성
             **************************/

          // 4-1) 이미지 업로드 성공시 src에 해당되는 부분을 업로드된 이미지의 주소로 교체
          markdownText = markdownText.replace(base64, '업로드된 이미지 url');
        } catch (err) {
          // 4-2) 이미지 업로드 중 에러가 발생할 경우 해당 base64이미지 삭제 (base64 형태로 DB에 업로드 되는 것을 막기 위함)
          markdownText = markdownText.replace(markdownImage, '');
        }

        editor.getInstance().setMarkdown(markdownText); // 변경된 내용을 에디터에도 반영 (굳이 필요할까 싶음)
      }
    }

    return markdownText;
  }, []);

  return {
    imageUploadButton,
    inputFileRef,
    onUploadImage,
    onUploadImageWhenSubmit,
  };
};

export default useUploadImage;
