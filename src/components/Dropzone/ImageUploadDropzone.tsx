import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

interface IUploadImage {
  file: File;
  cacheImage: string;
}

export default function ImageUploadDropzone() {
  const [uploadImages, setUploadImages] = useState<IUploadImage[]>([]);

  const onDrop = useCallback((files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onabort = () => alert('파일 읽기가 중단되었습니다.');
      reader.onerror = () => alert('파일을 읽어오는데 실패하였습니다.');
      reader.onloadend = () => {
        if (!reader.result || typeof reader.result !== 'string') return;

        const cacheImage = reader.result;
        setUploadImages((prev) => [...prev, { file, cacheImage }]);
      };
    }
  }, []);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': [],
    },
  });
  const onOpenFileWindow = useCallback(() => open(), [open]);

  return (
    <section className="mx-auto mt-16 flex w-600 flex-col gap-8 border border-black p-16">
      <div
        {...getRootProps()}
        className={twMerge(
          'flex h-160 flex-col items-center justify-center gap-8 border border-dashed border-gray-500',
          isDragActive && 'border-blue-600'
        )}
      >
        <input {...getInputProps()} />
        <p>사진을 끌어서 여기에 놓으세요.</p>
        <button
          onClick={onOpenFileWindow}
          className="rounded-4 bg-blue-400 px-20 py-8 text-white"
        >
          파일 첨부
        </button>
      </div>
      <aside>
        <h4>Images</h4>
        <div className="grid grid-cols-2 gap-8">
          {uploadImages.map((uploadImage) => (
            <img key={uploadImage.file.name} src={uploadImage.cacheImage} />
          ))}
        </div>
      </aside>
    </section>
  );
}
