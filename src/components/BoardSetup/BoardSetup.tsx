import React from 'react';
import Board from '../Board/Board';
import Deck from './Deck';
import Card from '../Card/Card';
import { FullWrapper, BoardDeckWrapper, Spacer } from './_BoardSetupStyles';
import { generateCardSet } from '../../utils';

const BoardSetup: React.FC = () => {
  const cards = generateCardSet();
  const firstPlayerColor = cards[4].stamp;
  return (
    <FullWrapper right={firstPlayerColor}>
      <Card card={cards[4]} inverted={firstPlayerColor === 'Red'} />
      <BoardDeckWrapper>
        <Deck isFor='opponent' cards={[cards[0], cards[1]]} />
        <Board />
        <Deck isFor='user' cards={[cards[2], cards[3]]} />
      </BoardDeckWrapper>
      <Spacer />
    </FullWrapper>
  );
};

export default BoardSetup;
