import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '@/components/DatePicker/DatePicker';
import { useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { Controller, useForm } from 'react-hook-form';

const meta = {
  title: 'Boilerplate/DatePicker/ReactDatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: '',
    onChange: () => {},
    placeholderText: '날짜를 선택해주세요.',
    minDate: new Date(),
    maxDate: new Date(),
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render() {
    const [selectedDate, setSelectedDate] = useState('');

    return (
      <DatePicker
        value={selectedDate}
        onChange={(date) => setSelectedDate(formatDate(date))}
        placeholderText="날짜를 선택해주세요."
      />
    );
  },
};

export const ControllerExample: Story = {
  render: function Render() {
    const { control } = useForm({
      defaultValues: {
        seletedDate: '',
      },
    });

    return (
      <Controller
        control={control}
        name="seletedDate"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            value={value}
            onChange={(date) => onChange(formatDate(date))}
            placeholderText="날짜를 선택해주세요."
          />
        )}
      />
    );
  },
};

export const DateRange: Story = {
  render: function Render() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
      <div className="grid grid-cols-[360px_auto_360px] items-center gap-8">
        <DatePicker
          selectsStart
          value={startDate}
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          onChange={(date) => setStartDate(formatDate(date))}
          placeholderText="시작 날짜를 선택해주세요."
          maxDate={endDate ? new Date(endDate) : null}
        />
        <span>~</span>
        <DatePicker
          selectsEnd
          value={endDate}
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          onChange={(date) => setEndDate(formatDate(date))}
          placeholderText="종료 날짜를 선택해주세요."
          minDate={startDate ? new Date(startDate) : null}
        />
      </div>
    );
  },
};

export const DateRangeForOneDatePicker: Story = {
  render: function Render() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    return (
      <DatePicker
        selectsRange
        value={startDate}
        onChange={([start, end]) => {
          setStartDate(start ? formatDate(start) : '');
          setEndDate(end ? formatDate(end) : '');
        }}
        startDate={startDate ? new Date(startDate) : null}
        endDate={endDate ? new Date(endDate) : null}
        placeholderText="기간을 선택해주세요."
      />
    );
  },
};
