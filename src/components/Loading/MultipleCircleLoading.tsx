import { LoadingProps } from './Loading.types';
import { twMerge } from 'tailwind-merge';

export default function MultipleCircleLoading({ twClassName }: LoadingProps) {
  return (
    <div
      className={twMerge(
        'mx-auto h-10 w-10 animate-[multipleCircle_1.1s_ease_infinite] rounded-full text-10',
        twClassName && twClassName
      )}
    />
  );
}
