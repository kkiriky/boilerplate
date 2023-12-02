import { components, DropdownIndicatorProps } from 'react-select';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react';
import { twMerge } from 'tailwind-merge';
import { SelectOption } from '@/types/select.types';

export default function DropdownIndicator<Option extends SelectOption>(
  props: DropdownIndicatorProps<Option>
) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon
        className={twMerge(
          'rotate-0 transition-[transform] duration-300',
          props.selectProps.menuIsOpen && 'rotate-180'
        )}
      />
    </components.DropdownIndicator>
  );
}
