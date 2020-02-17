import React from 'react';
import Card from '../Card/CardNew';
import { HandWrapper } from './styles/Hand';
import CardModel, { CardName } from '../../interfaces/card.interface';

interface HandProps {
  hand: CardName[];
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
        name={hand[0]}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        onCardClick={onCardClick}
      />

      <Card
        name={hand[1]}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        onCardClick={onCardClick}
      />
    </HandWrapper>
  );
};

export default Hand;
