import { LoadingProps } from './Loading.types';
import { twMerge } from 'tailwind-merge';

export default function SpinLoading({ twClassName }: LoadingProps) {
  return (
    <div
      className={twMerge(
        'h-48 w-48 animate-[rotation_1s_linear_infinite] rounded-full border-5 border-gray-200 border-b-[#006ae6]',
        twClassName && twClassName
      )}
    />
  );
}
