/* eslint-disable @typescript-eslint/no-unused-vars */
import type {} from 'react-select/base';

// prop type extend 할 경우 사용
declare module 'react-select/base' {
  export interface Props<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
  > {
    // isError?: boolean;
  }
}
