import { useCallback, useState } from 'react';
import GridItem from './GridItem';
import { produce } from 'immer';
import { faker } from '@faker-js/faker';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ImageCardList = [...Array(7)].map((_, i) => ({
  id: i + 1,
  image: faker.image.urlPicsumPhotos(),
  text: `Sample ${i + 1}`,
}));

export default function GridList() {
  const [imageCards, setImageCards] = useState(ImageCardList);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setImageCards((prevCards) =>
      produce(prevCards, (draft) => {
        const deletedItems = draft.splice(dragIndex, 1);
        draft.splice(hoverIndex, 0, ...deletedItems);
      })
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto grid w-[1200px] grid-cols-3 gap-8">
        {imageCards.map((card, i) => (
          <GridItem
            key={card.id}
            image={card.image}
            text={card.text}
            index={i}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}
