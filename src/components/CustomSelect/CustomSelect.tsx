import Select, { GroupBase, Props } from 'react-select';
import DropdownIndicator from './DropdownIndicator';
import { SelectOption } from '@/types/select.types';
import '@/styles/react-select.scss';

// 예제는 CustomSelect.stories.tsx 참고
export default function CustomSelect<
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      components={{ DropdownIndicator }}
      unstyled={true}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  );
}
