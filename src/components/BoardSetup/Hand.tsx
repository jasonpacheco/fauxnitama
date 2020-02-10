import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './styles/Hand';
import { PlayerHand } from '../../interfaces/context.interface';
import CardModel from '../../interfaces/card.interface';

interface HandProps {
  clickedCard?: CardModel | undefined;
  hand: PlayerHand;
  invert?: boolean;
  isCurrentlyActive: boolean;
  onCardClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ) => void;
  reset: boolean;
}
const Hand: React.FC<HandProps> = ({
  clickedCard = undefined,
  hand,
  invert = false,
  isCurrentlyActive,
  onCardClick = (): void => {
    return;
  },
  reset,
}) => {
  return (
    <HandWrapper>
      <Card
        card={hand.first}
        clickedCard={clickedCard}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        onCardClick={onCardClick}
        reset={reset}
      />

      <Card
        card={hand.second}
        clickedCard={clickedCard}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        onCardClick={onCardClick}
        reset={reset}
      />
    </HandWrapper>
  );
};

export default Hand;
