import { useCallback, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AgGrid from '@/components/AgGrid/AgGrid';
import { ColDef } from 'ag-grid-community';
import { useAgGridStore } from '@/store/agGridStore';
import EditIcon from '@/assets/icons/edit.svg?react';

const meta = {
  title: 'Boilerplate/Ag Grid/Example',
  component: AgGrid,
  tags: ['autodocs'],
  args: {
    columnDefnitions: [],
    rowData: [],
    editable: false,
  },
} satisfies Meta<typeof AgGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: function Render() {
    const columnDefnitions: ColDef[] = useMemo(
      () => [
        {
          headerName: '이름',
          field: 'name',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          filter: true,
          // rowDrag: true,
        },
        { headerName: '연락처', field: 'phone', filter: true },
        { headerName: '이메일', field: 'email', filter: true },
      ],
      []
    );

    const rowData = useAgGridStore((state) => state.data);
    const selectedRows = useAgGridStore((state) => state.seletedRows);
    const editable = useAgGridStore((state) => state.editable);
    const deleteRows = useAgGridStore((state) => state.deleteRows);
    const toggleEditMode = useAgGridStore((state) => state.toggleEditMode);
    const editedRows = useAgGridStore((state) => state.editedRows);

    const onDeleteRows = useCallback(() => {
      const isConfirmed = confirm(
        `선택된 ${selectedRows.length}개의 항목을 삭제하겠습니까?`
      );
      if (!isConfirmed) return;

      const seletedIdList = selectedRows.map((row) => row.id);
      deleteRows(seletedIdList);
    }, [deleteRows, selectedRows]);

    const isEditing = useAgGridStore((state) => state.isEditing);
    const onEdit = useCallback(() => {
      if (editable) {
        if (isEditing) {
          return alert('먼저 수정을 완료해주세요.');
        }
        // 편집 완료 시 실행할 로직
        console.log(editedRows);
      }

      toggleEditMode();
    }, [editable, editedRows, isEditing, toggleEditMode]);

    return (
      <>
        <header className="sticky top-0 z-[100] mb-24 flex h-40 items-center justify-between">
          <p className="flex h-full items-center rounded-4 bg-blue-400 px-16 text-white">
            <b>{selectedRows.length}</b>개 선택
          </p>

          <div className=" flex h-full gap-16">
            <button
              onClick={onDeleteRows}
              className="h-full rounded-4 bg-blue-400 px-16 text-white"
            >
              선택 항목 삭제
            </button>
            <button
              onClick={onEdit}
              className="flex h-full items-center justify-center gap-4 rounded-4 bg-blue-400 px-16 text-white"
            >
              {editable ? (
                '편집 완료'
              ) : (
                <>
                  <EditIcon className="h-20 w-20 [&_path]:fill-white" />
                  편집 모드
                </>
              )}
            </button>
          </div>
        </header>

        <AgGrid
          columnDefnitions={columnDefnitions}
          rowData={rowData}
          editable={editable}
        />
      </>
    );
  },
};
