import useAgGrid from './hooks/useAgGrid';

import EditIcon from '@/assets/icons/edit.svg?react';
import DownloadIcon from '@/assets/icons/download.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';

interface AgGridHeaderProps
  extends Pick<
    ReturnType<typeof useAgGrid>,
    | 'editable'
    | 'selectedCount'
    | 'existSeletedRows'
    | 'onDeleteSelectedRows'
    | 'onEditCancel'
    | 'onEdit'
    | 'onExportCsv'
  > {}

export default function AgGridHeader({
  editable,
  selectedCount,
  existSeletedRows,
  onDeleteSelectedRows,
  onEditCancel,
  onEdit,
  onExportCsv,
}: AgGridHeaderProps) {
  return (
    <header className="flex flex-col gap-16">
      {existSeletedRows ? (
        <p className="flex h-40 items-center rounded-4 bg-blue-400 px-16 text-white">
          <b>{selectedCount}</b>개 선택
        </p>
      ) : (
        <div className="h-40" />
      )}

      <div className="flex h-72 justify-between">
        <div className="flex gap-16">
          {!editable && (
            <div className="ml-auto flex w-fit flex-col gap-4">
              <button
                onClick={onExportCsv}
                className="flex h-40 w-140 items-center justify-center gap-8 rounded-4 bg-blue-400 px-16 text-white"
              >
                <DownloadIcon className="h-20 w-20 [&_path]:fill-white" />
                <span>CSV 추출</span>
              </button>
              {existSeletedRows && (
                <p className="h-20 text-13 text-blue-400">
                  * 선택된 항목만 추출됩니다.
                </p>
              )}
            </div>
          )}

          {editable && (
            <button
              onClick={onDeleteSelectedRows}
              className="flex h-40 items-center gap-8 rounded-4 bg-blue-400 px-16 text-white"
            >
              <DeleteIcon className="h-20 w-20 [&_path]:fill-white" />
              <span>선택 항목 삭제</span>
            </button>
          )}
        </div>

        <div className="flex gap-16">
          {editable && (
            <button
              onClick={onEditCancel}
              className="flex h-40 items-center justify-center gap-4 rounded-4 bg-blue-400 px-16 text-white"
            >
              취소
            </button>
          )}
          <button
            onClick={onEdit}
            className="flex h-40 items-center justify-center gap-4 rounded-4 bg-blue-400 px-16 text-white"
          >
            <EditIcon className="h-20 w-20 [&_path]:fill-white" />
            <span>{editable ? '편집 완료' : '편집 모드'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
