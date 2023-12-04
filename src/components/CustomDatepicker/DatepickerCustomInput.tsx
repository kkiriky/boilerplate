import { forwardRef } from 'react';
import Calendar from '@/assets/icons/calendar.svg?react';
import classNames from 'classnames';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  isReadOnly?: boolean;
}

const DatePickerCustomInput = forwardRef(
  (
    { isReadOnly, ...props }: CustomInputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    console.log(props);
    return (
      <div
        className={classNames('custom-input-container', {
          hasValue: !!props.value,
        })}
        onClick={props.onClick}
      >
        <Calendar />
        <input {...props} ref={ref} readOnly={isReadOnly} />
      </div>
    );
  }
);
export default DatePickerCustomInput;
