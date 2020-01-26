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
import { getIDs } from '../../utils';

const Card: React.FC = ({}) => {
  const { character, moves, name, stamp } = CardTypes.Mantis;
  return (
    <CardWrapper>
      <LeftHalf>
        <Character>{character}</Character>
        <Name>{name}</Name>
      </LeftHalf>
      <RightHalf id='hello'>
        <MiniBoard>
          {getIDs().map(({ id, x, y }) => (
            <MiniBox key={id} center={id === 12} />
          ))}
        </MiniBoard>
        {/* {moves}
        {stamp} */}
      </RightHalf>
    </CardWrapper>
  );
};

export default Card;
