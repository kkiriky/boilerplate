import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from '@/components/DatePicker/DatePicker';
import { useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { Controller, useForm } from 'react-hook-form';

const meta = {
  title: 'Boilerplate/DatePicker/Basic',
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
