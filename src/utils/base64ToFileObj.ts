// dataURL = data:image/png;base64,/9j/4AAQSkZJR…KIgxIJCwlixiHjZ7j5wYw87CMC7EhQ9XQ0FiFIfBbb30/9k=

type BlobToFile = (params: { blob: Blob; filename: string }) => File;
type Base64ToFile = (params: { base64: string; filename: string }) => File;

// 데이터 URL을 Blob으로 변환
const dataURLtoBlob = (dataURL: string) => {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1]; // ex) image/png
  const raw = window.atob(parts[1]); //  Base64 인코딩된 문자열 데이터를 디코딩
  const array = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return new Blob([array], { type: contentType });
};

// Blob을 File 객체로 변환
const blobToFile: BlobToFile = ({ blob, filename }) => {
  const file = new File([blob], filename, { type: blob.type });
  return file;
};

// Base64 문자열을 File 객체로 변환
export const base64toFile: Base64ToFile = ({ base64, filename }) => {
  const blob = dataURLtoBlob(base64);
  const file = blobToFile({ blob, filename });
  return file;
};
