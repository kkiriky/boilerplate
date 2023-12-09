import { atom } from 'recoil';
import { LazyComponent } from '@/types/global.types';

export interface ModalState<T> {
  Component: LazyComponent<T>;
  props: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalState = atom<ModalState<any>[]>({
  key: 'modalState',
  default: [],
});
