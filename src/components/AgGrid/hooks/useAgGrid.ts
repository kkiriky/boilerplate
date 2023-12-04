import { useCallback } from 'react';
import {
  CellClickedEvent,
  GridReadyEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';

export default function useAgGrid() {
  // 테이블 크기 자동 조정
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  // 메뉴 셀을 제외한 셀을 클릭 시 row 선택
  const onCellClicked = useCallback((e: CellClickedEvent) => {
    if (e.column.getColId() !== 'menu') {
      e.node.setSelected(!e.node.isSelected());
    }
  }, []);

  // row가 선택될 때마다 선택된 row 가져오기
  const onSelectionChanged = useCallback((e: SelectionChangedEvent) => {
    const rows = e.api.getSelectedRows();
    console.log(rows);
  }, []);

  return {
    onGridReady,
    onCellClicked,
    onSelectionChanged,
  };
}
