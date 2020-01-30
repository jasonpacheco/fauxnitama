import React from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import { FullWrapper, BoardHandWrapper, Spacer } from './_BoardSetupStyles';
import useGameContext from '../../context/useGameContext';

const BoardSetup: React.FC = () => {
  const { redHand, blueHand, nextCard, currentPlayer } = useGameContext();
  return (
    <FullWrapper right={currentPlayer}>
      <Card card={nextCard} inverted={currentPlayer === 'Red'} />
      <BoardHandWrapper>
        <Hand
          handFor='Red'
          cards={redHand}
          currentHand={currentPlayer === 'Red'}
        />
        <Board />
        <Hand
          handFor='Blue'
          cards={blueHand}
          currentHand={currentPlayer === 'Blue'}
        />
      </BoardHandWrapper>
      <Spacer />
    </FullWrapper>
  );
};

export default BoardSetup;
