import React from 'react';
import Card from '../Card/CardNew';
import { HandWrapper } from './styles/Hand';
import { CardName } from '../../store/engine/types/cardTypes';

interface HandProps {
  hand: CardName[];
  invert?: boolean;
  isCurrentlyActive: boolean;
  handleClickCard?: (cardName: CardName) => void;
  selectedCardName?: CardName | '';
}
const Hand: React.FC<HandProps> = ({
  hand,
  invert = false,
  isCurrentlyActive,
  selectedCardName,
  handleClickCard = (): void => {
    return;
  },
}) => {
  return (
    <HandWrapper>
      <Card
        name={hand[0]}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        handleClickCard={handleClickCard}
        selectedCardName={selectedCardName}
      />

      <Card
        name={hand[1]}
        invert={invert}
        isCurrentlyActive={isCurrentlyActive}
        handleClickCard={handleClickCard}
        selectedCardName={selectedCardName}
      />
    </HandWrapper>
  );
};

export default Hand;
