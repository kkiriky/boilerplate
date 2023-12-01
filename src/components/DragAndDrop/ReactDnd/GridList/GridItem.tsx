import { twMerge } from 'tailwind-merge';
import { HoverCallback, ImageCardProps } from '../Card.types';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { throttle } from 'throttle-debounce';

export default function GridItem({
  text,
  image,
  index,
  moveCard,
}: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => ({ index }), // drop에 전달하는 정보
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop({
    accept: 'card',
    hover: throttle<HoverCallback>(300, (dragItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = dragItem.index;
      const hoverIndex = index;

      // 제자리에 놓은 경우 이동 X(드래그 인덱스와 hover 인덱스가 동일할 경우)
      if (dragIndex === hoverIndex) return;

      // hover된 아이템의 크기와 상대적인 위치정보
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // (hover된 아이템의 너비 / 2)
      const hoverItemHalfWidth = hoverBoundingRect.width / 2;
      // (hover된 아이템의 높이 / 2)
      const hoverItemHalfHeight = hoverBoundingRect.height / 2;

      // 마우스의 위치 (x,y)
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // 마우스 포인터와 hover된 아이템간의 가로 간격
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // 마우스 포인터와 hover된 아이템간의 세로 간격
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // hover된 아이템의 너비 절반을 넘어갔을 경우에만 동작
      // 우/하로 드래그할 경우
      if (
        dragIndex < hoverIndex &&
        hoverClientX < hoverItemHalfWidth &&
        hoverClientY < hoverItemHalfHeight
      ) {
        return;
      }

      // 좌/상로 드래그할 경우
      if (
        dragIndex > hoverIndex &&
        hoverClientX > hoverItemHalfWidth &&
        hoverClientY > hoverItemHalfHeight
      ) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    }),
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={twMerge(
        'border shrink-0 rounded-xl overflow-hidden border-gray-300 bg-white cursor-move opacity-100',
        isDragging && 'opacity-0'
      )}
    >
      <img src={image} alt="" className="object-cover" />
      <b className="text-center py-1 block">{text}</b>
    </div>
  );
}
