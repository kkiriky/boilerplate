import { useCallback } from 'react';
import {
  GridReadyEvent,
  SelectionChangedEvent,
  CellValueChangedEvent,
} from 'ag-grid-community';
import { MockUser } from '@/api/user/user.types';

interface UseAgGridEventsParmas {
  setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
  setEditedRows: React.Dispatch<React.SetStateAction<MockUser[]>>;
}

const useAgGridEvents = ({
  setSelectedCount,
  setEditedRows,
}: UseAgGridEventsParmas) => {
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

  // row가 선택될 때마다 선택된 row 가져오기
  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<MockUser>) => {
      setSelectedCount(e.api.getSelectedRows().length);
    },
    [setSelectedCount]
  );

  // cell을 수정하였을 때
  const onCellValueChanged = useCallback(
    (e: CellValueChangedEvent<MockUser>) => {
      setEditedRows((rows) => {
        const index = rows.findIndex((row) => row.id === e.data.id);
        // 수정된 항목을 편집 완료 이전에 재수정하는 경우
        if (index !== -1) {
          const copy = [...rows];
          copy[index] = e.data;
          return copy;
        }
        return [...rows, e.data];
      });
    },
    [setEditedRows]
  );

  return {
    onGridReady,
    onSelectionChanged,
    onCellValueChanged,
  };
};

export default useAgGridEvents;
