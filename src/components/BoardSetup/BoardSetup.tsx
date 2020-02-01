import React from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import GameEndMessage from '../Modal/GameEndMessage';
import { FullWrapper, BoardHandWrapper, Spacer } from './_BoardSetupStyles';
import useGameContext from '../../context/useGameContext';

const BoardSetup: React.FC = () => {
  const {
    board,
    blueHand,
    clearGameState,
    currentPlayer,
    hasGameFinished,
    nextCard,
    redHand,
    selectedCard,
    setCurrentCard,
    winner,
    winMethod,
  } = useGameContext();
  return (
    <FullWrapper playerColorToRight={currentPlayer}>
      <Card card={nextCard} invert={currentPlayer === 'Red'} />
      <BoardHandWrapper>
        <Hand
          hand={redHand}
          isActiveHand={currentPlayer === 'Red'}
          selectedCard={selectedCard}
          setCurrentCard={setCurrentCard}
          invert
        />
        <Board cells={board.cells} />
        <Hand
          hand={blueHand}
          isActiveHand={currentPlayer === 'Blue'}
          selectedCard={selectedCard}
          setCurrentCard={setCurrentCard}
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
