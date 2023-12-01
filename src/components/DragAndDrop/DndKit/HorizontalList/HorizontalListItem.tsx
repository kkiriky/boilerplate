import { twJoin } from 'tailwind-merge';

interface HorizontalListItemProps {
  text: string;
  isDragging?: boolean;
}

export default function HorizontalListItem({
  text,
  isDragging,
}: HorizontalListItemProps) {
  return (
    <div
      className={twJoin(
        'border border-dashed border-gray-400 bg-white px-20 py-12',
        isDragging && 'cursor-move'
      )}
    >
      {text}
    </div>
  );
}
