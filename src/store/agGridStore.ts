import { create } from 'zustand';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

const mockData = [...Array(10)].map((_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  phone: `010-${faker.number.int({
    min: 1000,
    max: 9999,
  })}-${faker.number.int({ min: 1000, max: 9999 })}`,
  email: faker.internet.email(),
  createdAt: dayjs(faker.date.recent({ days: 365 }))
    .toDate()
    .getTime(),
}));

export interface IRowData {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: number; // 정렬을 위해 number로 선언
}

interface AgGridState {
  data: IRowData[];
  seletedRows: IRowData[];
  editedRows: IRowData[];
  editable: boolean;
  isEditing: boolean;
}

interface AgGridActions {
  setSelectedRows: (rows: IRowData[]) => void;
  toggleEditMode: () => void;
  addEditedRows: (row: IRowData) => void;
  setIsEditing: (isEditing: boolean) => void;
  //
  deleteRow: (id: number) => void; // 실사용에서는 react-query 사용
  deleteRows: (idList: number[]) => void; // 실사용에서는 react-query 사용
}

export const useAgGridStore = create<AgGridState & AgGridActions>((set) => ({
  data: mockData,
  seletedRows: [],
  editable: false,
  editedRows: [],
  isEditing: false,
  //
  setSelectedRows: (rows) => set(() => ({ seletedRows: rows })),
  toggleEditMode: () => set((state) => ({ editable: !state.editable })),
  addEditedRows: (row) =>
    set((state) => ({ editedRows: [...state.editedRows, row] })),
  setIsEditing: (isEditing) => set(() => ({ isEditing })),
  //
  deleteRow: (id) =>
    set((state) => ({ data: state.data.filter((row) => row.id !== id) })),
  deleteRows: (idList) =>
    set((state) => {
      return {
        data: state.data.filter((row) => !idList.includes(row.id)),
      };
    }),
}));
