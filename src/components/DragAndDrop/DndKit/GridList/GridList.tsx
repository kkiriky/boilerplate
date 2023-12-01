import { useMemo, useState } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import ImageCard from './ImageCard';
import useDrag from '@/components/DragAndDrop/DndKit/_hooks/useDrag';
import Sortable from '../Sortable';
import { faker } from '@faker-js/faker';

const ImageCardList = [...Array(7)].map((_, i) => ({
  id: i + 1,
  image: faker.image.urlPicsumPhotos(),
  text: `Sample ${i + 1}`,
}));

export default function GridList() {
  const [imageCards, setImageCards] = useState(ImageCardList);
  const { activeId, onDragStart, onDragEnd } = useDrag(setImageCards);

  const activeCard = useMemo(
    () => imageCards.find((imageCard) => imageCard.id === activeId),
    [activeId, imageCards]
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-8">
        <SortableContext items={imageCards}>
          {imageCards.map((imageCard) => (
            <Sortable key={imageCard.id} id={imageCard.id}>
              <ImageCard {...imageCard} />
            </Sortable>
          ))}
        </SortableContext>
        {/* 드래그(active) 시 보여주는 컴포넌트 */}
        <DragOverlay>
          {activeId && activeCard && <ImageCard {...activeCard} isDragging />}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
