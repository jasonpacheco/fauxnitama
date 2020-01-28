import React from 'react';
import Card from '../Card/Card';
import { DeckWrapper } from './_BoardSetupStyles';
import { Card as CardType } from '../Card/CardTypes';

interface DeckProps {
  isFor: 'user' | 'opponent';
  cards: CardType[];
}

const Deck: React.FC<DeckProps> = ({ isFor, cards }) => {
  return (
    <DeckWrapper>
      <Card inverted={isFor === 'opponent'} card={cards[0]} />
      <Card inverted={isFor === 'opponent'} card={cards[1]} />
    </DeckWrapper>
  );
};

export default Deck;
