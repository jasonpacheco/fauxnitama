import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './_BoardSetupStyles';
import { PlayerHand } from '../../interfaces/context.interface';
import isEqual from 'lodash.isequal';
import CardModel from '../../interfaces/card.interface';

interface HandProps {
  hand: PlayerHand;
  hasGameFinished?: boolean;
  invert?: boolean;
  isActiveHand: boolean;
  selectedCard?: CardModel | undefined;
  setCurrentCard: (currentCard: CardModel) => void;
}
const Hand: React.FC<HandProps> = ({
  hand,
  isActiveHand,
  setCurrentCard,
  hasGameFinished = false,
  invert = false,
  selectedCard = undefined,
}) => {
  // console.log('Hand rendered');

  const onCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ): void => {
    if (isActiveCard && !hasGameFinished) {
      if (!isEqual(card, selectedCard)) {
        setCurrentCard(card);
      }
    }
  };

  return (
    <HandWrapper>
      <Card
        invert={invert}
        isActiveCard={isActiveHand}
        card={hand.first}
        onCardClick={onCardClick}
      />

      <Card
        invert={invert}
        isActiveCard={isActiveHand}
        card={hand.second}
        onCardClick={onCardClick}
      />
    </HandWrapper>
  );
};

// export default React.memo(Hand, (prevProps, nextProps) => {
//   return isEqual(prevProps.isActiveHand, nextProps.isActiveHand);
// });

export default React.memo(Hand);

// export default Hand;
