import React from 'react';
import CardModel from '../../interfaces/card.interface';

import {
  CardWrapper,
  Main,
  Gutter,
  LeftHalf,
  RightHalf,
  Character,
  Name,
  MiniBoard,
  MiniBox,
  Stamp,
  StampTooltip,
} from './_CardStyles';

import { getIDs, coordinateToID, movesToID } from '../../utils';

interface CardProps {
  invert: boolean;
  card: CardModel;
  isActiveCard?: boolean;
  onCardClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ) => void;
}

const Card: React.FC<CardProps> = ({
  invert,
  card,
  onCardClick = (): void => {
    return;
  },
  isActiveCard = false,
}) => {
  const { image, moves, name, color, stamp } = card;
  const moveIDs = movesToID(moves);

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
          <MiniBoard>
            {getIDs().map(({ id, x, y }) =>
              moveIDs.includes(coordinateToID({ x, y })) ? (
                <MiniBox key={id} hasColor={color} />
              ) : (
                <MiniBox key={id} center={id === 12} />
              )
            )}
          </MiniBoard>
        </RightHalf>
      </Main>
      <Gutter>
        <Stamp color={stamp}>
          <StampTooltip invert={invert}>
            <div>
              <span>{stamp}</span> player goes first.
            </div>
          </StampTooltip>
        </Stamp>
      </Gutter>
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
