import { LoadingProps } from './Loading.types';
import { twMerge } from 'tailwind-merge';

export default function PulseLoading({ twClassName }: LoadingProps) {
  return (
    <div
      className={twMerge(
        'mx-auto h-16 w-16 animate-[shadowPulse_1s_linear_infinite] rounded-full',
        twClassName && twClassName
      )}
    />
  );
}
