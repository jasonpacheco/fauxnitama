import React from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import GameEndMessage from '../Modal/GameEndMessage';
import { FullWrapper, BoardHandWrapper, Spacer } from './_BoardSetupStyles';
import useGameContext from '../../context/useGameContext';

const BoardSetup: React.FC = () => {
  const {
    redHand,
    blueHand,
    nextCard,
    currentPlayer,
    hasGameFinished,
    winner,
    winMethod,
    clearGameState,
    board,
  } = useGameContext();
  return (
    <FullWrapper right={currentPlayer}>
      <Card card={nextCard} inverted={currentPlayer === 'Red'} />
      <BoardHandWrapper>
        <Hand
          handFor='Red'
          hand={redHand}
          currentHand={currentPlayer === 'Red'}
        />
        <Board cells={board.cells} />
        <Hand
          handFor='Blue'
          hand={blueHand}
          currentHand={currentPlayer === 'Blue'}
        />
      </BoardHandWrapper>
      <Spacer>
        {hasGameFinished && winner && winMethod && (
          <GameEndMessage
            winner={winner}
            winMethod={winMethod}
            clearGameState={clearGameState}
          />
        )}
      </Spacer>
    </FullWrapper>
  );
};

export default BoardSetup;
