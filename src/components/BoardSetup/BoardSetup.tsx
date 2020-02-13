import React, { useEffect, useState } from 'react';
import Board from '../Board/Board';
import Hand from './Hand';
import Card from '../Card/Card';
import RoundModal from '../Modal/RoundModal';
import { FullWrapper, BoardHandWrapper, Spacer } from './styles/BoardSetup';
import useGameContext from '../../context/useGameContext';
import isEqual from 'lodash.isequal';
import CardModel from '../../interfaces/card.interface';
import useKeyPress from '../../interactive/useKeyPress';

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
    nextCard,
    pauseGame,
    piecePositions,
    setClickedCard,
    setClickedPiece,
    setPassTurn,
    setPauseGame,
    winner,
    winMethod,
  } = useGameContext();

  const [pieceKeyPressIndex, setPieceKeyPressIndex] = useState(0);
  const [hasPieceBeenClicked, setHasBeenPieceBeenClicked] = useState(false);
  const [isFirstPress, setIsFirstPress] = useState(false);
  useEffect(() => {
    setIsFirstPress(true);
  }, [currentPlayer]);

  useEffect(() => {
    if (clickedPiece?.currentPositionID) {
      const currentClickedPieceIndex = piecePositions[currentPlayer].indexOf(
        clickedPiece?.currentPositionID
      );
      setPieceKeyPressIndex(currentClickedPieceIndex);
      setHasBeenPieceBeenClicked(false);
    }
  }, [hasPieceBeenClicked]);

  const onPressUpRight = (): void => {
    const numOfPieces = piecePositions[currentPlayer].length;
    let currentID,
      index = null;
    if (isFirstPress) {
      currentID = piecePositions[currentPlayer][0];
      setIsFirstPress(false);
      index = 0;
    } else {
      index = (pieceKeyPressIndex + 1) % numOfPieces;
      currentID = piecePositions[currentPlayer][index];
    }
    const piece = board[currentID]?.piece;
    if (piece !== undefined) {
      setClickedPiece(piece);
    }
    setPieceKeyPressIndex(index);
  };

  const onPressUpLeft = (): void => {
    const numOfPieces = piecePositions[currentPlayer].length;
    let currentID,
      index = null;
    if (isFirstPress) {
      currentID = piecePositions[currentPlayer][0];
      setIsFirstPress(false);
      index = 0;
    } else {
      index =
        (((pieceKeyPressIndex - 1) % numOfPieces) + numOfPieces) % numOfPieces;
      currentID = piecePositions[currentPlayer][index];
    }

    const piece = board[currentID]?.piece;
    if (piece !== undefined) {
      setClickedPiece(piece);
    }
    setPieceKeyPressIndex(index);
  };

  useKeyPress('ArrowRight', onPressUpRight);
  useKeyPress('ArrowLeft', onPressUpLeft);

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
        <Board setPieceClicked={setHasBeenPieceBeenClicked} />
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
