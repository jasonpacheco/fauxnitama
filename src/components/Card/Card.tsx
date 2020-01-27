import React from 'react';
import CardTypes from './CardTypes';
import {
  CardWrapper,
  LeftHalf,
  RightHalf,
  Character,
  Name,
  MiniBoard,
  MiniBox,
} from './_CardStyles';
import { getIDs, coordinateToID, movesToID } from '../../utils';

const Card: React.FC = ({}) => {
  const { character, moves, name, stamp } = CardTypes.Tiger;
  const moveIDs = movesToID(moves);
  return (
    <CardWrapper>
      <LeftHalf>
        <Character>{character}</Character>
        <Name>{name}</Name>
      </LeftHalf>
      <RightHalf id='hello'>
        <MiniBoard>
          {getIDs().map(({ id, x, y }) => {
            if (moveIDs.includes(coordinateToID({ x, y })))
              return <MiniBox key={id} hasColor />;
            return <MiniBox key={id} center={id === 12} />;
          })}
        </MiniBoard>
        {/* {moves}
        {stamp} */}
      </RightHalf>
    </CardWrapper>
  );
};

export default Card;
