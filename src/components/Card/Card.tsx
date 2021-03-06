import React from 'react';

import { CardName } from '../../store/engine/types/cardTypes';
import { cardNameToCard } from '../../utils';
import Gutter from './Gutter';
import MiniBoard from './MiniBoard';
import {
  CardWrapper,
  Character,
  LeftHalf,
  Main,
  Name,
  RightHalf,
} from './styles/Card';

interface CardProps {
  name: CardName;
  invert: boolean;
  isCurrentlyActive: boolean;
  handleClickCard?: (cardName: CardName) => void;
  selectedCardName?: CardName | '';
}

const Card: React.FC<CardProps> = ({
  name,
  invert,
  isCurrentlyActive,
  selectedCardName,
  handleClickCard = (): void => {
    return;
  },
}) => {
  const card = cardNameToCard(name);
  const { image, color, stamp, miniBoard } = card;

  return (
    <CardWrapper
      invert={invert}
      isActive={isCurrentlyActive}
      onClick={(): void => handleClickCard(name)}
      isCurrentCard={card.name === selectedCardName}
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

export default Card;
