import dayjs from 'dayjs';
import 'dayjs/locale/ko';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';

// 언어 설정
dayjs.locale('ko');
// // local 시간대 설정
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Seoul');

export const formatDate = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY.MM.DD A hh:mm');
};
