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

import {
  getIDs,
  coordinateToID,
  movesToID,
  generateCardSet,
} from '../../utils';

const Card: React.FC = () => {
  const { image, moves, name, color, stamp } = generateCardSet()[0];
  const moveIDs = movesToID(moves);
  return (
    <CardWrapper>
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
          <StampTooltip>
            <span>{stamp}</span> player goes first.
          </StampTooltip>
        </Stamp>
      </Gutter>
    </CardWrapper>
  );
};

export default Card;
