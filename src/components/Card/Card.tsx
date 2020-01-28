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

import { Card as CardType } from './CardTypes';

interface CardProps {
  inverted: boolean;
  card: CardType;
}

const Card: React.FC<CardProps> = ({ inverted, card }) => {
  const { image, moves, name, color, stamp } = card;
  // const { image, moves, name, color, stamp } = ;
  const moveIDs = movesToID(moves);
  return (
    <CardWrapper inverted={inverted}>
      <Main>
        <LeftHalf>
          <Character>
            <img src={image} alt='' />
          </Character>
          <Name>{name}</Name>
        </LeftHalf>
        <RightHalf id='right'>
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

export default Card;
