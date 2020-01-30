import React from 'react';
import Card from '../Card/Card';
import { DeckWrapper } from './_BoardSetupStyles';
import CardModel from '../../interfaces/card.interface';
import useGameContext from '../../context/useGameContext';

interface DeckProps {
  isFor: 'Blue' | 'Red';
  cards: CardModel[];
}

const Deck: React.FC<DeckProps> = ({ isFor, cards }) => {
  const { currentPlayer } = useGameContext();
  let keyID = 0;
  return (
    <DeckWrapper>
      {cards.map(card => (
        <Card
          key={keyID++}
          inverted={isFor === 'Red'}
          isTurn={isFor === currentPlayer}
          card={card}
        />
      ))}
    </DeckWrapper>
  );
};

export default Deck;
