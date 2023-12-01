import { DropTargetMonitor } from 'react-dnd';

export interface CardProps {
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface ImageCardProps extends CardProps {
  image: string;
}

interface DragItem {
  index: number;
}

export type HoverCallback = (
  item: DragItem,
  monitor: DropTargetMonitor<DragItem, void>
) => void;
