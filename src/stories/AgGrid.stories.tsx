import type { Meta, StoryObj } from '@storybook/react';
import AgGrid from '@/components/AgGrid/AgGrid';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

interface IRowData {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: number; // 정렬을 위해 number로 선언
}

const meta = {
  title: 'Boilerplate/Ag Grid/Basic',
  component: AgGrid,
  tags: ['autodocs'],
  args: {
    columnDefnitions: [],
    rowData: [],
  },
} satisfies Meta<typeof AgGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const columnDefnitions = useMemo(
      () => [
        {
          headerName: '이름',
          field: 'name',
          headerCheckboxSelection: true,
          checkboxSelection: true,
          filter: true,
          // rowDrag: true,
        },
        { headerName: '전화번호', field: 'phone', filter: true },
        { headerName: '이메일', field: 'email', filter: true },
      ],
      []
    );

    const [rowData] = useState<IRowData[]>(
      [...Array(50)].map((_, i) => ({
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
      }))
    );

    return <AgGrid columnDefnitions={columnDefnitions} rowData={rowData} />;
  },
};
