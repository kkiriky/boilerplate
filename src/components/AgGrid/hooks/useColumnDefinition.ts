import { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import MenuCell from '../MenuCell';
import { formatDateTime } from '@/utils/formatDate';

interface UseColumnDefinitionParams {
  columnDefnitions: ColDef[];
  editable: boolean;
}

const useColumnDefinition = ({
  columnDefnitions,
  editable,
}: UseColumnDefinitionParams) => {
  const columnDefs = useMemo<ColDef[]>(
    () => [
      ...columnDefnitions,
      {
        headerName: '생성일',
        field: 'createdAt',
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => formatDateTime(params.value), // 정렬을 위해 number로 받기 때문에 format이 필요
        comparator: (valueA, valueB) => {
          if (valueA === valueB) return 0;
          return valueA > valueB ? 1 : -1;
        },
        sort: 'desc',
        cellDataType: 'date', // editing 시 calendar로 입력받기 위해 타입 지정
      },
      {
        headerName: '',
        field: 'menu',
        colId: 'menu',
        cellRenderer: MenuCell,
        sortable: false,
        editable: false,
      },
    ],
    [columnDefnitions]
  );
  const defaultColDef = useMemo<ColDef>(
    () => ({ resizable: true, sortable: true, editable }),
    [editable]
  );

  return { columnDefs, defaultColDef };
};

export default useColumnDefinition;
