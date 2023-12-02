import { forwardRef } from 'react';
import Calendar from '@/assets/icons/calendar.svg?react';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const DatePickerCustomInput = forwardRef(
  (props: CustomInputProps, ref: React.LegacyRef<HTMLInputElement>) => (
    <>
      <input {...props} ref={ref} readOnly />
      <div onClick={props.onClick}>
        <Calendar />
      </div>
    </>
  )
);
export default DatePickerCustomInput;
