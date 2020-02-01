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
    clearGameState,
    currentPlayer,
    handBlue,
    handRed,
    hasGameFinished,
    movePiece,
    nextCard,
    selectedCard,
    selectedCell,
    setCurrentCard,
    setSelectedCell,
    validMoves,
    winner,
    winMethod,
  } = useGameContext();
  return (
    <FullWrapper playerColorToRight={currentPlayer}>
      <Card card={nextCard} invert={currentPlayer === 'Red'} />
      <BoardHandWrapper>
        <Hand
          hand={handRed}
          isActiveHand={currentPlayer === 'Red'}
          selectedCard={selectedCard}
          setCurrentCard={setCurrentCard}
          invert
        />
        <Board
          activeCell={selectedCell}
          activePlayer={currentPlayer}
          cells={board}
          hasGameFinished={hasGameFinished}
          movement={movePiece}
          validMoves={validMoves}
          setCell={setSelectedCell}
        />
        <Hand
          hand={handBlue}
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
