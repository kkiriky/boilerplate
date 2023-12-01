import { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HorizontalCard from './HorizontalCard';
import { produce } from 'immer';

const cardList = [...Array(20)].map((_, i) => ({
  id: i + 1,
  text: `Item ${i + 1}`,
}));

export default function HorizontalList() {
  const [cards, setCards] = useState(cardList);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) =>
      produce(prevCards, (draft) => {
        const deletedItems = draft.splice(dragIndex, 1);
        draft.splice(hoverIndex, 0, ...deletedItems);
      })
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto flex w-fit gap-16">
        {cards.map((card, i) => (
          <HorizontalCard
            key={card.id}
            text={card.text}
            index={i}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}
