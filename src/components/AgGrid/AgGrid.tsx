import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import useGetLocaleText from './hooks/useGetLocaleText';
import useColumnDefinition from './hooks/useColumnDefinition';
import useAgGridEvents from './hooks/useAgGridEvents';
import { MockUser } from '@/api/user/user.types';

interface AgGridProps<TData> {
  /** 열 정의 */
  gridRef: React.LegacyRef<AgGridReact<TData>>;
  /** column definitions */
  columnDefnitions: ColDef[];
  /** row data list */
  rowData: TData[];
  /** is edit mode? */
  editable: boolean;
  /** Set selected count */
  setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
  /** Set edited rows */
  setEditedRows: React.Dispatch<React.SetStateAction<MockUser[]>>;
}

export default function AgGrid<TData extends { id: number }>({
  gridRef,
  columnDefnitions,
  rowData,
  editable,
  setSelectedCount,
  setEditedRows,
}: AgGridProps<TData>) {
  const { getLocaleText } = useGetLocaleText();
  const { defaultColDef, columnDefs } = useColumnDefinition({
    columnDefnitions,
    editable,
  });
  const events = useAgGridEvents({ setSelectedCount, setEditedRows });

  return (
    <div className="ag-theme-alpine h-[100vw]">
      <AgGridReact
        ref={gridRef}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={rowData}
        animateRows // 필터, 정렬, 리사이즈 시 애니메이션
        rowSelection="multiple"
        // suppressCellFocus // cell focus 비활성화
        suppressRowClickSelection // row selection 비활성화 (메뉴 셀 클릭 시에는 동작하면 안되므로 onCellClicked를 이용하여 커스터마이징)
        getLocaleText={getLocaleText}
        {...events}
      />
    </div>
  );
}
