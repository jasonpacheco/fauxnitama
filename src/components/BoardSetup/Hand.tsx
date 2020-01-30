import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './_BoardSetupStyles';
import CardModel from '../../interfaces/card.interface';

interface HandProps {
  handFor: 'Blue' | 'Red';
  cards: CardModel[];
  currentHand: boolean;
}

const Hand: React.FC<HandProps> = ({ handFor, cards, currentHand }) => {
  return (
    <HandWrapper>
      <Card inverted={handFor === 'Red'} isTurn={currentHand} card={cards[0]} />
      <Card inverted={handFor === 'Red'} isTurn={currentHand} card={cards[1]} />
    </HandWrapper>
  );
};

export default Hand;
