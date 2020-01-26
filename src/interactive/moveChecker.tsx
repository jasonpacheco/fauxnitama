import React from 'react';
import useGameContext from '../context/useGameContext';
import { Coordinates } from '../interfaces/context.interface';
import { BOARD_GAME } from '../utils';

const { ROWS, COLS } = BOARD_GAME;

const validMovesFromCard = [
  [0, 0],
  [0, 0],
  [0, 0],
];

const transposeCardMovement = (validMoves: number[][]): number[][] => {
  return validMoves.map(move => [-move[0], -move[1]]);
};

const checkValidMoves = (
  clickedCoordinates: Coordinates,
  validMovesFromCard: number[][]
): boolean[] => {
  const { x, y } = clickedCoordinates;
  return validMovesFromCard.map(
    ([moveX, moveY]) =>
      !(
        x + moveX >= ROWS ||
        x + moveX < 0 ||
        y + moveY >= COLS ||
        y + moveY < 0
      )
  );
};

const MoveChecker: React.FC = () => {
  const { clickedCoordinates } = useGameContext();
  console.log(clickedCoordinates);
  console.log(validMovesFromCard);
  console.log(transposeCardMovement(validMovesFromCard));
  if (clickedCoordinates) {
    console.log(checkValidMoves(clickedCoordinates, validMovesFromCard));
  }
  return null;
};

export default MoveChecker;