import { useCallback, useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AgGrid from '@/components/AgGrid/AgGrid';
import { ColDef } from 'ag-grid-community';
import { MockUser } from '@/api/user/user.types';
import { AgGridReact } from 'ag-grid-react';

import { userHandlers } from '@/mocks/userHandlers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import EditIcon from '@/assets/icons/edit.svg?react';
import DownloadIcon from '@/assets/icons/download.svg?react';
import DeleteIcon from '@/assets/icons/delete.svg?react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useDeleteUsers, useEditUsers, useGetUsers } from '@/hooks/useUser';

const meta = {
  title: 'Boilerplate/Ag Grid/Example',
  component: AgGrid,
  tags: ['autodocs'],
  args: {
    gridRef: null,
    columnDefnitions: [],
    rowData: [],
    editable: false,
    setEditedRows: () => {},
    setSelectedCount: () => {},
  },
  parameters: {
    msw: { handlers: userHandlers },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <Story />

          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof AgGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const gridRef = useRef<AgGridReact>(null);
    const columnDefnitions: ColDef[] = useMemo(
      () => [
        { headerName: '이름', field: 'name' },
        { headerName: '연락처', field: 'phone' },
        { headerName: '이메일', field: 'email' },
      ],
      []
    );

    const [editable, setEditable] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [editedRows, setEditedRows] = useState<MockUser[]>([]);

    const { data: users } = useGetUsers();
    const { mutate: deleteUsers } = useDeleteUsers();

    const onDeleteSelectedRows = useCallback(() => {
      const selectedRows = gridRef.current?.api.getSelectedRows();
      if (!selectedRows?.length) {
        return alert('선택된 항목이 없습니다.');
      }

      const isConfirmed = confirm(
        `선택된 ${gridRef.current?.api.getSelectedRows()
          .length}개의 항목을 삭제하겠습니까?`
      );
      if (!isConfirmed) return;

      const seletedIdList = selectedRows.map((row) => row.id);
      deleteUsers(seletedIdList);
    }, [deleteUsers]);

    const { mutate: editUsers } = useEditUsers();
    const onEdit = useCallback(() => {
      if (editable) {
        if (gridRef.current?.api.getEditingCells().length) {
          return alert('먼저 수정을 완료해주세요.');
        }

        editUsers(editedRows);
        // 선택된 항목이 있을 경우 모두 해제
        gridRef.current?.api.deselectAll();
      }

      setEditable((prev) => !prev);
    }, [editUsers, editable, editedRows]);

    // csv 추출
    const onExportCsv = useCallback(() => {
      gridRef.current?.api.exportDataAsCsv({
        // 메뉴 컬럼 제외
        columnKeys: [
          ...columnDefnitions.map((colDef) => colDef.field),
          'createdAt',
        ] as string[],
        // 편집모드에서는 선택된 행만 추출 가능
        onlySelected: editable,
      });
    }, [columnDefnitions, editable]);

    return (
      <>
        <header className="flex flex-col gap-16">
          {editable ? (
            <p className="flex h-40 items-center rounded-4 bg-blue-400 px-16 text-white">
              <b>{selectedCount}</b>개 선택
            </p>
          ) : (
            <div className="h-40" />
          )}

          <div className="flex h-72 justify-between">
            <div className="flex gap-16">
              <div className="ml-auto flex w-fit flex-col gap-4">
                <button
                  onClick={onExportCsv}
                  className="flex h-40 w-140 items-center justify-center gap-8 rounded-4 bg-blue-400 px-16 text-white"
                >
                  <DownloadIcon className="h-20 w-20 [&_path]:fill-white" /> CSV
                  추출
                </button>
                {editable && (
                  <p className="h-20 text-13 text-blue-400">
                    * 선택된 항목만 추출됩니다.
                  </p>
                )}
              </div>

              {editable && (
                <button
                  onClick={onDeleteSelectedRows}
                  className="flex h-40 items-center gap-8 rounded-4 bg-blue-400 px-16 text-white"
                >
                  <DeleteIcon className="h-20 w-20 [&_path]:fill-white" />
                  선택 항목 삭제
                </button>
              )}
            </div>

            <button
              onClick={onEdit}
              className="flex h-40 items-center justify-center gap-4 rounded-4 bg-blue-400 px-16 text-white"
            >
              <EditIcon className="h-20 w-20 [&_path]:fill-white" />
              {editable ? '편집 완료' : '편집 모드'}
            </button>
          </div>
        </header>

        <AgGrid
          gridRef={gridRef}
          columnDefnitions={columnDefnitions}
          rowData={users}
          editable={editable}
          setSelectedCount={setSelectedCount}
          setEditedRows={setEditedRows}
        />
      </>
    );
  },
};
