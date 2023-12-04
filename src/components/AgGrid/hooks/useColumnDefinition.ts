import { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import MenuCell from '../MenuCell';
import { formatDate } from '@/utils/formatDate';

const useColumnDefinition = (columnDefnitions: ColDef[]) => {
  const columnDefs = useMemo<ColDef[]>(
    () => [
      ...columnDefnitions,
      {
        headerName: '생성일',
        field: 'createdAt',
        filter: true,
        valueFormatter: (params) => formatDate(params.value), // 정렬을 위해 number로 받기 때문에 format이 필요
        comparator: (valueA, valueB) => {
          if (valueA === valueB) return 0;
          return valueA > valueB ? 1 : -1;
        },
        sort: 'desc',
      },
      {
        headerName: '',
        field: 'menu',
        colId: 'menu',
        cellRenderer: MenuCell,
        sortable: false,
      },
    ],
    [columnDefnitions]
  );
  const defaultColDef = useMemo(
    () => ({ resizable: true, sortable: true }),
    []
  );

  return { columnDefs, defaultColDef };
};

export default useColumnDefinition;
