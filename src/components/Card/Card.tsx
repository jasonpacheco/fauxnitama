import React from 'react';

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

import CardModel from '../../interfaces/card.interface';

import useGameContext from '../../context/useGameContext';
import isEqual from 'lodash.isequal';

interface CardProps {
  inverted?: boolean;
  card: CardModel;
  isTurn?: boolean;
}

const Card: React.FC<CardProps> = ({ inverted, card, isTurn }) => {
  const { image, moves, name, color, stamp } = card;
  const moveIDs = movesToID(moves);
  const { setCurrentCard, selectedCard, hasGameFinished } = useGameContext();

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isTurn: boolean | undefined,
    card: CardModel
  ): void => {
    if (isTurn && !hasGameFinished) {
      if (!isEqual(card, selectedCard)) {
        setCurrentCard(card);
      }
    }
  };
  console.log('Card rendered');

  return (
    <CardWrapper
      inverted={inverted}
      isTurn={isTurn}
      onClick={(e): void => handleCardClick(e, isTurn, card)}
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
          <StampTooltip inverted={inverted}>
            <div>
              <span>{stamp}</span> player goes first.
            </div>
          </StampTooltip>
        </Stamp>
      </Gutter>
    </CardWrapper>
  );
};

// export default React.memo(Card, (prevProps, nextProps) =>
//   isEqual(prevProps.card, nextProps.card)
// );
export default Card;
