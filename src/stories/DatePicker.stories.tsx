import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CustomDatepicker from '@/components/CustomDatepicker/CustomDatepicker';
import { Controller, useForm } from 'react-hook-form';

const meta = {
  title: 'Boilerplate/CustomDatePicker/CustomDatePicker',
  component: CustomDatepicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    selected: null,
    onChange: (_date: Date) => {},
  },
} satisfies Meta<typeof CustomDatepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div className="w-250">
        <CustomDatepicker
          {...args}
          selected={date}
          onChange={(date) => setDate(date)}
          selectsRange={false}
          placeholderText={'날짜를 선택해주세요.'}
          isClearable
          // showYearDropdown
          // yearDropdownItemNumber={5}
          // scrollableYearDropdown
        />
      </div>
    );
  },
};

export const ControllerExample: Story = {
  render: function Render(args) {
    const { control } = useForm<{ date: Date | null }>({
      defaultValues: { date: null },
    });

    return (
      <div className="w-250">
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <CustomDatepicker
              {...args}
              selected={value}
              onChange={(date) => onChange(date)}
              selectsRange={false}
              placeholderText={'날짜를 선택해주세요.'}
              isClearable
            />
          )}
        />
      </div>
    );
  },
};

export const Range: Story = {
  render: function Render(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div className="grid grid-cols-[250px_auto_250px] items-center gap-8">
        <CustomDatepicker
          {...args}
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          selectsRange={false}
          placeholderText={'시작 날짜를 선택해주세요.'}
          isClearable
        />
        <span>~</span>
        <CustomDatepicker
          {...args}
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selectsRange={false}
          placeholderText={'종료 날짜를 선택해주세요.'}
          isClearable={!!endDate}
        />
      </div>
    );
  },
};

export const RangeForOneDatepicker: Story = {
  render: function Render(args) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [Date, Date]) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    return (
      <div className="w-280">
        <CustomDatepicker
          {...args}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          placeholderText={'기간을 선택해주세요.'}
          isClearable
        />
      </div>
    );
  },
};
