import React from 'react';
import Board from '../Board/Board';
import Deck from './Deck';
import { BoardDeckWrapper } from './_BoardSetupStyles';

const BoardSetup: React.FC = () => {
  return (
    <>
      <BoardDeckWrapper>
        <Deck isFor='opponent' />
        <Board />
        <Deck isFor='user' />
      </BoardDeckWrapper>
    </>
  );
};

export default BoardSetup;
