import React from 'react';
import Card from '../Card/Card';
import { DeckWrapper } from './_BoardSetupStyles';
import CardModel from '../../interfaces/card.interface';

interface DeckProps {
  isFor: 'user' | 'opponent';
  cards: CardModel[];
}

const Deck: React.FC<DeckProps> = ({ isFor, cards }) => {
  let keyID = 0;
  return (
    <DeckWrapper>
      {cards.map(card => (
        <Card
          key={keyID++}
          inverted={isFor === 'opponent'}
          isTurn={isFor === 'opponent'}
          card={card}
        />
      ))}
    </DeckWrapper>
  );
};

export default Deck;
