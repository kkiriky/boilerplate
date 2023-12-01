import { twJoin } from 'tailwind-merge';

interface ImageCardProps {
  image: string;
  text: string;
  isDragging?: boolean;
}

export default function ImageCard({ image, text, isDragging }: ImageCardProps) {
  return (
    <div
      className={twJoin(
        'overflow-hidden rounded-xl border border-gray-300 bg-white',
        isDragging && 'cursor-move'
      )}
    >
      <img src={image} alt="" className="object-cover" />
      <b className="block py-1 text-center">{text}</b>
    </div>
  );
}
