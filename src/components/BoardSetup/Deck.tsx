import React from 'react';
import Card from '../Card/Card';

interface DeckProps {
  isFor: 'user' | 'opponent';
}

const Deck: React.FC<DeckProps> = ({ isFor }) => {
  return (
    <>
      <Card />
    </>
  );
};

export default Deck;
