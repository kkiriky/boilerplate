import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';

interface UseAgGridParams<TData, TId> {
  columnDefnitions: ColDef[];
  refetch: () => void;
  deleteRows: (idList: TId[]) => void;
  editRows: (rows: TData[]) => void;
}

export default function useAgGrid<TData extends { id: TId }, TId>({
  columnDefnitions,
  refetch,
  deleteRows,
  editRows,
}: UseAgGridParams<TData, TId>) {
  const gridRef = useRef<AgGridReact<TData>>(null);

  const [editable, setEditable] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const isExistSeletedRows = useMemo(() => !!selectedCount, [selectedCount]);
  const [editedRows, setEditedRows] = useState<TData[]>([]);

  // 선택된 행들 삭제
  const onDeleteSelectedRows = useCallback(() => {
    const selectedRows = gridRef.current?.api.getSelectedRows();
    if (!selectedRows?.length) {
      return alert('선택된 항목이 없습니다.');
    }

    const isConfirmed = confirm(
      `선택된 ${selectedRows.length}개의 항목을 삭제하겠습니까?`
    );
    if (!isConfirmed) return;

    const seletedIdList = selectedRows.map((row) => row.id);
    deleteRows(seletedIdList);
  }, [deleteRows]);

  // 편집 취소
  const onEditCancel = useCallback(() => {
    gridRef.current?.api.stopEditing(true); // editing 상태였으면, editing input을 닫고 cancel
    setEditable(false); // 편집모드 비활성화
    setEditedRows([]); // edited rows 초기화

    // 변경된 사항이 존재할 경우 refetch로 데이터 초기화
    // state를 새로 선언하고 onCellValueChanged 에서 작업할 수도 있으나, 복잡성이 많이 증가
    if (editedRows.length) {
      refetch();
    }
  }, [editedRows.length, refetch]);

  // 편집
  const onEdit = useCallback(() => {
    if (editable) {
      if (gridRef.current?.api.getEditingCells().length) {
        return alert(
          '수정이 완료되지 않은 작업이 있습니다.\n먼저 수정을 완료해주세요.'
        );
      }

      editRows(editedRows);
    }

    setEditable((prev) => !prev);
    setEditedRows([]);
  }, [editRows, editable, editedRows]);

  // csv 추출
  const onExportCsv = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      // 메뉴 컬럼 제외
      columnKeys: [
        ...columnDefnitions.map((colDef) => colDef.field),
        'createdAt',
      ] as string[],
      onlySelected: isExistSeletedRows, // 선택된 행이 있을 경우 선택된 행만 추출
    });
  }, [columnDefnitions, isExistSeletedRows]);

  return {
    gridRef,
    columnDefnitions,
    editable,
    selectedCount,
    setSelectedCount,
    existSeletedRows: isExistSeletedRows,
    setEditedRows,
    onDeleteSelectedRows,
    onEditCancel,
    onEdit,
    onExportCsv,
  };
}
