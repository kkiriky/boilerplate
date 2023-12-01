import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from 'react';
import { twJoin } from 'tailwind-merge';

export default function Sortable({
  id,
  children,
}: PropsWithChildren<{ id: number }>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: {
      duration: 300, // default: 250
      easing: 'ease', // default: ease
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={twJoin('shrink-0', isDragging && 'opacity-50')}
    >
      {children}
    </div>
  );
}
