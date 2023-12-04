import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import useGetLocaleText from './hooks/useGetLocaleText';
import useColumnDefinition from './hooks/useColumnDefinition';
import useAgGrid from './hooks/useAgGrid';

interface AgGridProps<TData> {
  /** Column Definition */
  columnDefnitions: ColDef[];
  /** Row data */
  rowData: TData[];
}

// 수정, 삭제
// 마우스 드래그 시 선택 => 여러 데이터 삭제
// 드래그 앤 드랍으로 순서 변경
export default function AgGrid<TData>({
  columnDefnitions,
  rowData,
}: AgGridProps<TData>) {
  const { getLocaleText } = useGetLocaleText();
  const { defaultColDef, columnDefs } = useColumnDefinition(columnDefnitions);
  const props = useAgGrid();

  return (
    <div className="ag-theme-alpine h-[100vw] ">
      <AgGridReact
        {...props}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={rowData}
        animateRows // 필터, 정렬, 리사이즈 시 애니메이션
        rowSelection="multiple"
        suppressCellFocus // cell focus 비활성화
        suppressRowClickSelection // row selection 비활성화 (메뉴 셀 클릭 시에는 동작하면 안되므로 onCellClicked를 이용하여 커스터마이징)
        getLocaleText={getLocaleText}
        // rowDragManaged
      />
    </div>
  );
}
