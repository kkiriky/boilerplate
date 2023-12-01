import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import useDrag from '@/components/DragAndDrop/DndKit/_hooks/useDrag';
import Sortable from '../Sortable';
import HorizontalListItem from './HorizontalListItem';

const cardList = [...Array(20)].map((_, i) => ({
  id: i + 1,
  text: `Item ${i + 1}`,
}));

export default function HorizontalList() {
  const [cards, setCards] = useState(cardList);
  const { activeId, onDragStart, onDragEnd } = useDrag(setCards);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="mx-auto flex w-fit gap-16">
        <SortableContext items={cards} strategy={horizontalListSortingStrategy}>
          {cards.map((card) => (
            <Sortable key={card.id} id={card.id}>
              <HorizontalListItem {...card} />
            </Sortable>
          ))}
        </SortableContext>
        {/* 드래그 시 보여주는 컴포넌트 */}
        <DragOverlay>
          {activeId ? (
            <HorizontalListItem
              text={cards.find((card) => card.id === activeId)?.text ?? ''}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
