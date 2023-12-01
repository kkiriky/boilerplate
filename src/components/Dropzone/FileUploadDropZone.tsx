import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

export default function FileUploadDropzone() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: setFiles,
    noClick: true,
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
        <p>파일을 끌어서 여기에 놓으세요.</p>
        <button
          onClick={onOpenFileWindow}
          className="rounded-4 bg-blue-400 px-20 py-8 text-white"
        >
          파일 첨부
        </button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              {file.path} - {file.size}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
