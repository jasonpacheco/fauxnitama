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
} from './styles/Card';
import useGameContext from '../../context/useGameContext';
import { CardName } from '../../store/engine/card/types';
import { cardNameToCard } from '../../utils/';

interface CardProps {
  name: CardName;
  invert: boolean;
  isCurrentlyActive: boolean;
  onCardClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ) => void;
}

const Card: React.FC<CardProps> = ({
  name,
  invert,
  isCurrentlyActive,
  onCardClick = (): void => {
    return;
  },
}) => {
  const { clickedCard } = useGameContext();
  const card = cardNameToCard(name);
  const { image, color, stamp, miniBoard } = card;

  return (
    <CardWrapper
      invert={invert}
      isActive={isCurrentlyActive}
      onClick={(e): void => onCardClick(e, isCurrentlyActive, card)}
      isCurrentCard={card.name === clickedCard?.name}
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
