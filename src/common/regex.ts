// 마크다운 이미지 정규표현식
export const base64ImageRegexForMarkdown =
  /!\[[^\]]*\]\((data:image\/[^;]+;base64,.*?)\)/g;

// HTML 이미지 태그 정규표현식
export const base64ImageRegexForHtml =
  /<img.*?src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;
