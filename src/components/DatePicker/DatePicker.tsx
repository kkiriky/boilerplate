import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { ko } from 'date-fns/locale';

import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import DatePickerCustomInput from './DatePickerCustomInput';

export default function DatePicker<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
>({ value, ...props }: ReactDatePickerProps<CustomModifierNames, WithRange>) {
  console.log(props.startDate);

  return (
    <div className="w-360">
      {/* 팝업이 sibling 형태로 나타나기 때문에 래핑한 형태로 사용 */}
      <ReactDatePicker
        {...props}
        locale={ko}
        dateFormat="yyyy-MM-dd" // 인풋에 나타나는 날짜 형식
        dateFormatCalendar="yyyy.MM" // 팝업 head 날짜 형식 지정
        // calendarStartDay={0} // 일요일부터 시작
        popperPlacement="bottom" // 팝업 위치 설정
        //
        selected={value ? new Date(value) : null} // 팝업 창의 선택 칸 설정
        //
        customInput={<DatePickerCustomInput />}
        previousMonthButtonLabel={<ChevronLeft />}
        nextMonthButtonLabel={<ChevronRight />}
        //
        showYearDropdown
        yearDropdownItemNumber={5}
        scrollableYearDropdown
      />
    </div>
  );
}
