import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './_BoardSetupStyles';
import { PlayerHand } from '../../interfaces/context.interface';

interface HandProps {
  handFor: 'Blue' | 'Red';
  hand: PlayerHand;
  currentHand: boolean;
}

const Hand: React.FC<HandProps> = ({ handFor, hand, currentHand }) => {
  return (
    <HandWrapper>
      <Card
        inverted={handFor === 'Red'}
        isTurn={currentHand}
        card={hand.first}
      />
      <Card
        inverted={handFor === 'Red'}
        isTurn={currentHand}
        card={hand.second}
      />
    </HandWrapper>
  );
};

export default Hand;
