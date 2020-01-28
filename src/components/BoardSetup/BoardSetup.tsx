import React from 'react';
import Board from '../Board/Board';
import Deck from './Deck';
import { BoardDeckWrapper } from './_BoardSetupStyles';
import { generateCardSet } from '../../utils';

const BoardSetup: React.FC = () => {
  const cards = generateCardSet();
  return (
    <>
      <BoardDeckWrapper>
        <Deck isFor='opponent' cards={[cards[0], cards[1]]} />
        <Board />
        <Deck isFor='user' cards={[cards[2], cards[3]]} />
      </BoardDeckWrapper>
    </>
  );
};

export default BoardSetup;
