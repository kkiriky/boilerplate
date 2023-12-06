import { GetLocaleTextParams } from 'ag-grid-community';
import { useCallback } from 'react';

const useGetLocaleText = () => {
  const getLocaleText = useCallback((params: GetLocaleTextParams) => {
    switch (params.key) {
      case 'thousandSeparator':
        return '.';
      case 'decimalSeparator':
        return ',';
      case 'contains':
        return '포함';
      case 'notContains':
        return '미포함';
      case 'equals':
        return '같음';
      case 'notEqual':
        return '같지않음';
      case 'startsWith':
        return '~로 시작하는';
      case 'endsWith':
        return '~로 끝나는';
      case 'blank':
        return '값이 비어있는';
      case 'notBlank':
        return '값이 비어있지 않은';
      case 'filterOoo':
        return '필터링 할 값을 입력하세요.';
      case 'lessThan':
        return '~보다 작은';
      case 'lessThanOrEqual':
        return '~보다 작거나 같은';
      case 'greaterThan':
        return '~보다 큰';
      case 'greaterThanOrEqual':
        return '~보다 크거나 같은';
      case 'inRange':
        return '범위';
      case 'inRangeStart':
        return '~에서';
      case 'inRangeEnd':
        return '~까지';
      case 'noRowsToShow':
        return '데이터가 존재하지 않습니다.';

      default:
        if (params.defaultValue) {
          // the &lrm; marker should not be made uppercase
          const val = params.defaultValue.split('&lrm;');
          const newVal = val[0].toUpperCase();
          if (val.length > 1) {
            return `${newVal}&lrm;`;
          }
          return newVal;
        }
        return '';
    }
  }, []);

  return { getLocaleText };
};

export default useGetLocaleText;
