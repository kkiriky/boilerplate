import { useCallback } from 'react';
import {
  // CellClickedEvent,
  GridReadyEvent,
  SelectionChangedEvent,
  CellValueChangedEvent,
} from 'ag-grid-community';
import { IRowData, useAgGridStore } from '@/store/agGridStore';

export default function useAgGridEvents() {
  // 테이블 크기 자동 조정
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  // 메뉴 셀을 제외한 셀을 클릭 시 row 선택
  // const onCellClicked = useCallback((e: CellClickedEvent) => {
  //   if (e.column.getColId() !== 'menu') {
  //     e.node.setSelected(!e.node.isSelected());
  //   }
  // }, []);

  const setSelectedRows = useAgGridStore((state) => state.setSelectedRows);
  // row가 선택될 때마다 선택된 row 가져오기
  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<IRowData>) => {
      const rows = e.api.getSelectedRows();
      setSelectedRows(rows);
    },
    [setSelectedRows]
  );

  const addEditedRows = useAgGridStore((state) => state.addEditedRows);
  const onCellValueChanged = useCallback(
    (e: CellValueChangedEvent) => addEditedRows(e.data),
    [addEditedRows]
  );

  const setIsEditing = useAgGridStore((state) => state.setIsEditing);
  const onCellEditingStarted = useCallback(
    () => setIsEditing(true),
    [setIsEditing]
  );
  const onCellEditingStopped = useCallback(
    () => setIsEditing(false),
    [setIsEditing]
  );

  return {
    onGridReady,
    onSelectionChanged,
    onCellValueChanged,
    onCellEditingStarted,
    onCellEditingStopped,
  };
}
