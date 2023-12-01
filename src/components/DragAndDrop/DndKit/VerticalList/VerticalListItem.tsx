import { twJoin } from 'tailwind-merge';

interface VerticalListItemProps {
  text: string;
  isDragging?: boolean;
}

export default function VerticalListItem({
  text,
  isDragging,
}: VerticalListItemProps) {
  return (
    <div
      className={twJoin(
        'border border-dashed border-gray-400 bg-white p-12',
        isDragging && 'cursor-move'
      )}
    >
      {text}
    </div>
  );
}
