import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './_BoardSetupStyles';
import { PlayerHand } from '../../interfaces/context.interface';
import isEqual from 'lodash.isequal';

interface HandProps {
  handFor: 'Blue' | 'Red';
  hand: PlayerHand;
  currentHand: boolean;
}
const Hand: React.FC<HandProps> = ({ handFor, hand, currentHand }) => {
  console.log('Hand rendered');
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
// returns false => render
export default React.memo(Hand, (prevProps, nextProps) => {
  return isEqual(prevProps.currentHand, nextProps.currentHand);
});

// export default Hand;
