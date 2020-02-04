import React from 'react';
import CardModel from '../../interfaces/card.interface';
import MiniBoard from './MiniBoard';
import Gutter from './Gutter';

import {
  CardWrapper,
  Main,
  LeftHalf,
  RightHalf,
  Character,
  Name,
} from './_CardStyles';
import isEqual from 'lodash.isequal';

interface CardProps {
  card: CardModel;
  clickedCard?: CardModel | undefined;
  invert: boolean;
  isCurrentlyActive: boolean;
  onCardClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  clickedCard,
  invert,
  isCurrentlyActive,
  onCardClick = (): void => {
    return;
  },
}) => {
  const { image, name, color, stamp, miniBoard } = card;

  return (
    <CardWrapper
      invert={invert}
      isActive={isCurrentlyActive}
      onClick={(e): void => onCardClick(e, isCurrentlyActive, card)}
      isCurrentCard={isEqual(card, clickedCard)}
    >
      <Main>
        <LeftHalf>
          <Character>
            <img src={image} alt='' />
          </Character>
          <Name>{name}</Name>
        </LeftHalf>
        <RightHalf>
          <MiniBoard board={miniBoard} color={color} />
        </RightHalf>
      </Main>
      <Gutter invert={invert} stampColor={stamp} />
    </CardWrapper>
  );
};

export default React.memo(Card, (prevProps, nextProps) => {
  return (
    !prevProps.isCurrentlyActive &&
    prevProps.isCurrentlyActive === nextProps.isCurrentlyActive &&
    isEqual(prevProps.card, nextProps.card)
  );
});
