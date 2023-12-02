import dayjs from 'dayjs';

export const formatDate = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};
