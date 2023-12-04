import { useCallback } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

import EditIcon from '@/assets/icons/edit.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';

const MenuCell = ({ data }: ICellRendererParams) => {
  const onOpenEditModal = useCallback(() => {
    alert('Open Edit Modal');
  }, []);

  const onRemove = useCallback(() => {
    if (!data) return;

    const confirmed = window.confirm('정말로 삭제하겠습니까?');
    if (!confirmed) return;
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="flex h-full items-center justify-center gap-20">
        <button onClick={onOpenEditModal}>
          <EditIcon />
        </button>
        <button onClick={onRemove}>
          <DeleteIcon />
        </button>
      </div>
    </>
  );
};

export default MenuCell;
