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
    placeholderText: '날짜를 선택해주세요.',
    isClearable: true,
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
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          selectsRange={false}
        />
        <span>~</span>
        <CustomDatepicker
          {...args}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selectsRange={false}
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
        />
      </div>
    );
  },
};
