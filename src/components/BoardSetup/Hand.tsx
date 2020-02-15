import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './styles/Hand';
import { PlayerHand } from '../../interfaces/context.interface';
import CardModel from '../../interfaces/card.interface';

interface HandProps {
  hand: PlayerHand;
  invert?: boolean;
  isCurrentlyActive: boolean;
  onCardClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ) => void;
}
const Hand: React.FC<HandProps> = ({
  hand,
  invert = false,
  isCurrentlyActive,
  onCardClick = (): void => {
    return;
  },
}) => {
  return (
    <HandWrapper>
      <Card
        card={hand.first}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        onCardClick={onCardClick}
      />

      <Card
        card={hand.second}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        onCardClick={onCardClick}
      />
    </HandWrapper>
  );
};

export default Hand;
