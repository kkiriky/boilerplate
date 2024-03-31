import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { Controller, useForm } from 'react-hook-form';
import { bankOptions } from '@/data/bankListOptions';
import { SingleValue, MultiValue } from 'react-select';
import { SelectOption } from '@/types/select.types';

const isSingleValue = (
  option: MultiValue<SelectOption> | SingleValue<SelectOption>,
): option is SingleValue<SelectOption> => {
  if (option !== null && !('value' in option)) return false;

  return true;
};

const meta = {
  title: 'Boilerplate/CustomSelect/ReactSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: bankOptions,
    onChange: () => {},
    value: null,
    placeholder: '은행을 선택해주세요.',
    isClearable: true,
  },
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | number>();

    return (
      <CustomSelect
        {...args}
        options={bankOptions}
        // options의 타입으로부터 SingleValue<SelectOption> 타입이 추론되어야 하는데, 스토리북에서 타입추론이 안되는 이슈가 있음
        // => 실제 사용시에는 타입가드 불필요
        onChange={(option) => isSingleValue(option) && setValue(option?.value)}
        value={bankOptions.find((option) => option.value === value) ?? null}
        placeholder="은행을 선택해주세요."
      />
    );
  },
};

export const ControllerExample: Story = {
  render: function Render(args) {
    const { control } = useForm<{ bank: string }>({
      defaultValues: { bank: '' },
    });

    return (
      <Controller
        control={control}
        name="bank"
        render={({ field: { value, onChange } }) => (
          <CustomSelect
            {...args}
            options={bankOptions}
            onChange={(option) =>
              isSingleValue(option) && onChange(option?.value)
            }
            value={bankOptions.find((option) => option.value === value) ?? null}
            placeholder="은행을 선택해주세요."
          />
        )}
      />
    );
  },
};
