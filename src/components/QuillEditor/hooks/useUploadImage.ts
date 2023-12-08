import { useCallback } from 'react';
import { base64ImageRegexForHtml } from '@/common/regex';
import { base64toFile } from '@/utils/base64ToFileObj';
import { v4 as uuidv4 } from 'uuid';
import Quill from 'quill';

interface UseQuillEditorParams {
  editorRef: React.MutableRefObject<Quill | undefined>;
}

const useUploadImage = ({ editorRef }: UseQuillEditorParams) => {
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editorRef?.current) return;
      const quill = editorRef.current;

      const { files } = e.target;
      if (!files) return;

      // 이미지를 한 번에 여러장 업로드 할 경우 클릭했던 순으로 나열하기 위해 cursorPos 사용
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onabort = () => alert('파일 읽기가 중단되었습니다.');
        reader.onerror = () => alert('파일을 읽어오는데 실패하였습니다.');
        reader.onloadend = () => {
          if (!reader.result || typeof reader.result !== 'string') return;
          const range = quill.getSelection(); // 현재 커서의 위치 정보(range.index)
          if (!range) return;

          // 현재 커서위치에 이미지를 삽입
          quill.insertEmbed(range.index, 'image', reader.result);
          // 앞에서 이미지 한 장을 추가하였으므로 (인덱스 + 1) 위치에 new line을 2개 넣음. (엔터 2번이 필요하므로)
          quill.insertText(range.index + 1, '\n\n'); // insertText로 인해 text-change 이벤트를 트리거 => onChange 동작
          // 앞에서 new line 2개를 추가하였으므로 (인덱스 + 3) 위치에 커서의 위치를 변경
          quill.setSelection(range.index + 3, range.length);
        };
      }
    },
    [editorRef]
  );

  const onUploadImageWhenSubmit = useCallback(
    (value: string) => {
      if (!editorRef.current) return;

      // 1) base64 이미지들을 추출
      const matchArray = [...value.matchAll(base64ImageRegexForHtml)];

      if (matchArray.length) {
        // 첫 번째 인자는 정규표현식과 일치하는 텍스트(markdownImage), 두 번째 부터는 정규표현식의 capture 그룹과 일치하는 텍스트(base64)
        for (const [htmlImage, base64] of matchArray) {
          // 2) file 객체로 변환
          const file = base64toFile({ base64, filename: uuidv4() });
          console.log(file);

          try {
            // 3) 이미지 업로드 (formdata에 한 번에 넘기는 방식 X, 업로드된 이미지의 주소를 받아야만 하므로)
            /**************************
              이미지 업로드 로직 작성
             **************************/

            // 4-1) 이미지 업로드 성공시 src에 해당되는 부분을 업로드된 이미지의 주소로 교체
            value = value.replace(base64, '업로드된 이미지 url');
          } catch (err) {
            // 4-2) 이미지 업로드 중 에러가 발생할 경우 해당 base64이미지 삭제 (base64 형태로 DB에 업로드 되는 것을 막기 위함)
            value = value.replace(htmlImage, '');
          }

          editorRef.current.root.innerHTML = value; // 값 변화시킬 시 이벤트 핸들러에 의해서 onChange 동작
        }
      }

      return value;
    },
    [editorRef]
  );

  return { onUploadImage, onUploadImageWhenSubmit };
};

export default useUploadImage;
