// 마크다운 이미지 정규표현식
export const base64ImageRegexForMarkdown =
  /!\[[^\]]*\]\((data:image\/[^;]+;base64,.*?)\)/g;
// export const base64ImageDataRegex = /data:image\/[^;]+;base64,([^')"]+)/g;

// export const base64ImageRegexForHtml = /<img.*?src="(data:image\/[^;]+;base64,([^"]+))"[^>]*>/
export const base64ImageRegexForHtml =
  /<img.*?src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;
