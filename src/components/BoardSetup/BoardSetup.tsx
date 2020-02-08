import React from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import RoundModal from '../Modal/RoundModal';
import { FullWrapper, BoardHandWrapper, Spacer } from './_BoardSetupStyles';
import useGameContext from '../../context/useGameContext';
import isEqual from 'lodash.isequal';
import CardModel from '../../interfaces/card.interface';

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
    moveHistory,
    movePiece,
    nextCard,
    pauseGame,
    setClickedCard,
    setClickedPiece,
    setPassTurn,
    setPauseGame,
    validMoves,
    winner,
    winMethod,
  } = useGameContext();

  const onCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ): void => {
    if (isActiveCard && !hasGameFinished && !pauseGame) {
      if (!isEqual(card, clickedCard)) {
        setClickedCard(card);
      }
    }
  };
  console.log('Game');

  return (
    <FullWrapper playerColorToRight={currentPlayer}>
      <Card
        card={nextCard}
        clickedCard={clickedCard}
        isCurrentlyActive={false}
        invert={currentPlayer === 'Red'}
        reset={hasGameFinished}
      />
      <BoardHandWrapper>
        <Hand
          clickedCard={clickedCard}
          hand={handRed}
          invert
          isCurrentlyActive={!pauseGame && currentPlayer === 'Red'}
          onCardClick={onCardClick}
          reset={hasGameFinished}
        />
        <Board
          cells={board}
          clickedPiece={clickedPiece}
          currentPlayer={currentPlayer}
          hasGameFinished={hasGameFinished}
          movePiece={movePiece}
          validMoves={validMoves}
          setPiece={setClickedPiece}
          pauseGame={pauseGame}
        />
        <Hand
          clickedCard={clickedCard}
          hand={handBlue}
          isCurrentlyActive={!pauseGame && currentPlayer === 'Blue'}
          onCardClick={onCardClick}
          reset={hasGameFinished}
        />
      </BoardHandWrapper>

      <Spacer>
        <RoundModal
          clearGameState={clearGameState}
          clickedCard={clickedCard}
          hasGameFinished={hasGameFinished}
          moveHistory={moveHistory}
          pauseGame={pauseGame}
          setPassTurn={setPassTurn}
          setPauseGame={setPauseGame}
          winMethod={winMethod}
          winner={winner}
        />
      </Spacer>
    </FullWrapper>
  );
};

export default BoardSetup;
