import React from 'react';
import Card from '../Card/Card';
import { HandWrapper } from './_BoardSetupStyles';
import CardModel from '../../interfaces/card.interface';
import useGameContext from '../../context/useGameContext';

interface HandProps {
  isFor: 'Blue' | 'Red';
  cards: CardModel[];
}

const Hand: React.FC<HandProps> = ({ isFor, cards }) => {
  const { currentPlayer } = useGameContext();
  let keyID = 0;
  return (
    <HandWrapper>
      {cards.map(card => (
        <Card
          key={keyID++}
          inverted={isFor === 'Red'}
          isTurn={isFor === currentPlayer}
          card={card}
        />
      ))}
    </HandWrapper>
  );
};

export default Hand;
