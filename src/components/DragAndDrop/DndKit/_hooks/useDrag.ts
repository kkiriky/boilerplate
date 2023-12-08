import { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';

const useDrag = <T extends { id: number }>(
  setItems: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const onDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id);
  }, []);

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;

      if (over && active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }

      setActiveId(null);
    },
    [setItems]
  );

  return { activeId, onDragStart, onDragEnd };
};

export default useDrag;
