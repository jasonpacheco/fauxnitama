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
    clickedCard,
    clickedPiece,
    currentPlayer,
    handBlue,
    handRed,
    hasGameFinished,
    movePiece,
    nextCard,
    setClickedCard,
    setClickedPiece,
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
          selectedCard={clickedCard}
          setCurrentCard={setClickedCard}
          invert
        />
        <Board
          cells={board}
          clickedPiece={clickedPiece}
          currentPlayer={currentPlayer}
          hasGameFinished={hasGameFinished}
          movePiece={movePiece}
          validMoves={validMoves}
          setPiece={setClickedPiece}
        />
        <Hand
          hand={handBlue}
          isActiveHand={currentPlayer === 'Blue'}
          selectedCard={clickedCard}
          setCurrentCard={setClickedCard}
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
