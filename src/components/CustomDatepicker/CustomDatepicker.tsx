import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { ko } from 'date-fns/locale';

import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import DatePickerCustomInput from './DatepickerCustomInput';

import '@/styles/react-datepicker.scss';

export default function CustomDatepicker<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
>(props: ReactDatePickerProps<CustomModifierNames, WithRange>) {
  return (
    <div className="datepicker">
      {/* 팝업이 sibling 형태로 나타나기 때문에 래핑한 형태로 사용 */}
      <ReactDatePicker
        {...props}
        locale={ko}
        dateFormat="yyyy-MM-dd" // 인풋에 나타나는 날짜 형식
        dateFormatCalendar="yyyy.MM" // 팝업 head 날짜 형식 지정
        popperPlacement="bottom" // 팝업 위치 설정
        customInput={<DatePickerCustomInput isReadOnly />}
        previousMonthButtonLabel={<ChevronLeft />}
        nextMonthButtonLabel={<ChevronRight />}
      />
    </div>
  );
}
