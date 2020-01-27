import React from 'react';
import CardTypes from './CardTypes';
import {
  CardWrapper,
  TopHalf,
  BottomHalf,
  LeftHalf,
  RightHalf,
  Character,
  Name,
  MiniBoard,
  MiniBox,
  Stamp,
} from './_CardStyles';
import { getIDs, coordinateToID, movesToID } from '../../utils';

const Card: React.FC = () => {
  const { image, moves, name, color, stamp } = CardTypes.Crane;
  const moveIDs = movesToID(moves);
  return (
    <CardWrapper>
      <TopHalf>
        <LeftHalf>
          <Character>
            <img src={image} alt='' />
          </Character>
          <Name>{name}</Name>
        </LeftHalf>
        <RightHalf id='right'>
          <MiniBoard>
            {getIDs().map(({ id, x, y }) => {
              if (moveIDs.includes(coordinateToID({ x, y })))
                return <MiniBox key={id} hasColor={color} />;
              return <MiniBox key={id} center={id === 12} />;
            })}
          </MiniBoard>
        </RightHalf>
      </TopHalf>
      <BottomHalf>
        <Stamp color={stamp} />
      </BottomHalf>
    </CardWrapper>
  );
};

export default Card;
