import React from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import GameEndMessage from '../Modal/GameEndMessage';
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
    movePiece,
    nextCard,
    setClickedCard,
    setClickedPiece,
    validMoves,
    winner,
    winMethod,
  } = useGameContext();

  const onCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isActiveCard: boolean,
    card: CardModel
  ): void => {
    if (isActiveCard && !hasGameFinished) {
      if (!isEqual(card, clickedCard)) {
        setClickedCard(card);
      }
    }
  };

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
          isCurrentlyActive={currentPlayer === 'Red'}
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
        />
        <Hand
          clickedCard={clickedCard}
          hand={handBlue}
          isCurrentlyActive={currentPlayer === 'Blue'}
          onCardClick={onCardClick}
          reset={hasGameFinished}
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
