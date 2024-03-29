import { useCallback } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

import PhotoIcon from '@/assets/icons/photo.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import { useDeleteUser } from '@/hooks/useUser';

export default function MenuCell<TData extends { id: number }>({
  data,
}: ICellRendererParams<TData>) {
  const onEditImage = useCallback(() => {
    alert('If there are images in the data, go to the image editing page');
  }, []);

  const { mutate: deleteUser } = useDeleteUser();
  const onRemove = useCallback(() => {
    if (!data) return;

    const confirmed = window.confirm('정말로 삭제하겠습니까?');
    if (!confirmed) return;

    deleteUser(data.id);
  }, [data, deleteUser]);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex h-full items-center justify-center gap-20">
        <button onClick={onEditImage}>
          <PhotoIcon />
        </button>
        <button onClick={onRemove}>
          <DeleteIcon />
        </button>
      </div>
    </>
  );
}
