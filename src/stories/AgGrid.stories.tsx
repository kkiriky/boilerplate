import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { userHandlers } from '@/mocks/userHandlers';
import AgGrid from '@/components/AgGrid/AgGrid';
import { useDeleteUsers, useEditUsers, useGetUsers } from '@/hooks/useUser';
import useAgGrid from '@/components/AgGrid/hooks/useAgGrid';
import AgGridHeader from '@/components/AgGrid/AgGridHeader';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { ColDef } from 'ag-grid-community';

const meta = {
  title: 'Boilerplate/CustomTable/Example',
  tags: ['autodocs'],
  component: AgGrid,
  args: {
    gridRef: null,
    columnDefnitions: [],
    rowData: [],
    editable: false,
    setSelectedCount: () => {},
    setEditedRows: () => {},
  },
  parameters: {
    msw: { handlers: userHandlers },
  },
  decorators: [
    (Story) => {
      return (
        <ReactQueryProvider>
          <Story />
        </ReactQueryProvider>
      );
    },
  ],
} satisfies Meta<typeof AgGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const columnDefnitions: ColDef[] = useMemo(
      () => [
        { headerName: '이름', field: 'name' },
        { headerName: '연락처', field: 'phone' },
        { headerName: '이메일', field: 'email' },
      ],
      []
    );

    const { data: rowData, refetch } = useGetUsers();
    const { mutate: deleteRows } = useDeleteUsers();
    const { mutate: editRows } = useEditUsers();

    const {
      gridRef,
      editable,
      selectedCount,
      setSelectedCount,
      existSeletedRows,
      setEditedRows,
      onDeleteSelectedRows,
      onEditCancel,
      onEdit,
      onExportCsv,
    } = useAgGrid({ columnDefnitions, refetch, deleteRows, editRows });

    return (
      <>
        <AgGridHeader
          editable={editable}
          selectedCount={selectedCount}
          existSeletedRows={existSeletedRows}
          onDeleteSelectedRows={onDeleteSelectedRows}
          onEditCancel={onEditCancel}
          onEdit={onEdit}
          onExportCsv={onExportCsv}
        />
        <AgGrid
          gridRef={gridRef}
          columnDefnitions={columnDefnitions}
          rowData={rowData}
          editable={editable}
          setSelectedCount={setSelectedCount}
          setEditedRows={setEditedRows}
        />
      </>
    );
  },
};
