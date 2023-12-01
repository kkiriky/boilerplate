import { useState } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import useDrag from '@/components/DragAndDrop/DndKit/_hooks/useDrag';
import Sortable from '../Sortable';
import VerticalListItem from './VerticalListItem';

const cardList = [...Array(20)].map((_, i) => ({
  id: i + 1,
  text: `Item ${i + 1}`,
}));

export default function VerticalList() {
  const [cards, setCards] = useState(cardList);
  const { activeId, onDragStart, onDragEnd } = useDrag(setCards);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex w-[400px] flex-col gap-16">
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <Sortable key={card.id} id={card.id}>
              <VerticalListItem {...card} />
            </Sortable>
          ))}
        </SortableContext>
        {/* 드래그 시 보여주는 컴포넌트 */}
        <DragOverlay>
          {activeId ? (
            <VerticalListItem
              text={cards.find((card) => card.id === activeId)?.text ?? ''}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
