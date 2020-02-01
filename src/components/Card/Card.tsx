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

interface CardProps {
  card: CardModel;
  invert: boolean;
  isActiveCard?: boolean;
  onCardClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  invert,
  isActiveCard = false,
  onCardClick = (): void => {
    return;
  },
}) => {
  const { image, moves, name, color, stamp } = card;

  // console.log('Card rendered');
  return (
    <CardWrapper
      invert={invert}
      isActive={isActiveCard}
      onClick={(e): void => onCardClick(e, isActiveCard, card)}
    >
      <Main>
        <LeftHalf>
          <Character>
            <img src={image} alt='' />
          </Character>
          <Name>{name}</Name>
        </LeftHalf>
        <RightHalf>
          <MiniBoard color={color} moves={moves} />
        </RightHalf>
      </Main>
      <Gutter invert={invert} stampColor={stamp} />
    </CardWrapper>
  );
};

// export default React.memo(
//   Card,
//   (prevProps, nextProps) =>
//     isEqual(prevProps.card, nextProps.card) &&
//     isEqual(prevProps.isActiveCard, nextProps.isActiveCard)
// );
export default Card;
