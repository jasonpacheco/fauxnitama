import React, { useState, useEffect } from 'react';
import useGameContext from '../../context/useGameContext';
import useKeyPress from '../../interactive/useKeyPress';

interface ArrowKeyLogicProps {
  hasPieceBeenClicked: boolean;
  setHasBeenPieceBeenClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArrowKeyLogic: React.FC<ArrowKeyLogicProps> = ({
  hasPieceBeenClicked,
  setHasBeenPieceBeenClicked,
}) => {
  const [pieceKeyPressIndex, setPieceKeyPressIndex] = useState(0);
  const [isFirstPress, setIsFirstPress] = useState(false);
  const {
    board,
    clickedPiece,
    currentPlayer,
    piecePositions,
    setClickedPiece,
  } = useGameContext();
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

  return <></>;
};

export default ArrowKeyLogic;
