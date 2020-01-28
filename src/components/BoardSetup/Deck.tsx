import React from 'react';
import Card from '../Card/Card';
import { DeckWrapper } from './_BoardSetupStyles';
import { Card as CardType } from '../Card/CardTypes';

interface DeckProps {
  isFor: 'user' | 'opponent';
  cards: CardType[];
}

const Deck: React.FC<DeckProps> = ({ isFor, cards }) => {
  let keyID = 0;
  return (
    <DeckWrapper>
      {cards.map(card => (
        <Card key={keyID++} inverted={isFor === 'opponent'} card={card} />
      ))}
    </DeckWrapper>
  );
};

export default Deck;
