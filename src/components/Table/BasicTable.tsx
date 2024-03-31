import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/react-table';
import mockData from '@/assets/mocks/MOCK_DATA.json';
import dayjs from 'dayjs';
import CustomSelect from '../CustomSelect/CustomSelect';
import FeatherIcons from '@/theme/featherIcons';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
}

export default function BasicTable() {
  const data: User[] = useMemo(() => mockData, []);

  // highest type-safety possible => 타입 안정성을 높여줌
  // https://tanstack.com/table/latest/docs/guide/column-defs#column-helpers
  const columnHelper = createColumnHelper<User>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            // checked={table.getIsAllRowsSelected()}
            // onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('id', {
        header: '아이디',
      }),
      columnHelper.accessor('firstName', {
        header: '성',
      }),
      columnHelper.accessor('lastName', {
        header: '이름',
      }),
      columnHelper.accessor('email', {
        header: '이메일',
      }),
      columnHelper.accessor('gender', {
        header: '성별',
      }),
      columnHelper.accessor('dob', {
        header: '생년월일',
        cell: (info) => dayjs(info.getValue()).format('YYYY년 MM월 DD일'),
      }),
    ],
    [columnHelper],
  );

  // 선택
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); //manage your own row selection state

  // 정렬
  const [sorting, setSorting] = useState<SortingState>([]);
  // 필터
  const [filter, setFilter] = useState('');

  const table = useReactTable<User>({
    data,
    columns,
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      rowSelection, //pass the row selection state back to the table instance
      sorting,
      globalFilter: filter,
    },
    getCoreRowModel: getCoreRowModel(), //row model
    getPaginationRowModel: getPaginationRowModel(), // 페이지네이션
    getSortedRowModel: getSortedRowModel(), // 정렬
    getFilteredRowModel: getFilteredRowModel(), // 필터
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });

  console.log(table.getSelectedRowModel());

  return (
    <div className="w3-container flex flex-col gap-16 px-0">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-200 border border-gray-400"
      />
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.getIsSorted() === 'desc' ? (
                    <FeatherIcons.ChevronDown className="inline-block" />
                  ) : header.column.getIsSorted() === 'asc' ? (
                    <FeatherIcons.ChevronUp className="inline-block" />
                  ) : (
                    <div className="inline-block w-24 " />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between">
        {/* 페이지 사이즈 */}
        <div>
          <CustomSelect
            options={[
              { label: '10개씩', value: 10 },
              { label: '20개씩', value: 20 },
              { label: '50개씩', value: 50 },
            ]}
            defaultValue={{ label: '10개씩', value: 10 }}
            onChange={(option) =>
              table.setPageSize((value) => {
                if (!option) return value;

                return option.value;
              })
            }
          />
        </div>

        {/* 페이지 네이션 */}
        <div className="flex gap-12">
          <button
            onClick={() => table.setPageIndex(0)}
            className="rounded-4 border border-gray-400 px-8 py-8"
          >
            첫 페이지
          </button>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="rounded-4 border border-gray-400 px-8 py-8 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            이전 페이지
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="rounded-4 border border-gray-400 px-8 py-8 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            다음 페이지
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="rounded-4 border border-gray-400 px-8 py-8"
          >
            마지막 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
