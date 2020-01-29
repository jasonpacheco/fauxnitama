import { Coordinates } from '../interfaces/context.interface';
import { BOARD_GAME, coordinateToID } from '../utils';
import { Piece } from '../interfaces/context.interface';
const { ROWS, COLS } = BOARD_GAME;

// const transposeCardMovement = (validMoves: number[][]): number[][] => {
//   return validMoves.map(move => [-move[0], -move[1]]);
// };

const isOccupied = (x: number, y: number, board: (Piece | null)[][]): boolean =>
  !!board[x][y];

export default (
  clickedCoordinates: Coordinates,
  validMovesFromCard: number[][],
  board: (Piece | null)[][]
): number[] => {
  const { x, y } = clickedCoordinates;
  return validMovesFromCard.reduce((acc, [moveX, moveY]) => {
    if (
      !(
        x + moveX >= ROWS ||
        x + moveX < 0 ||
        y + moveY >= COLS ||
        y + moveY < 0 ||
        isOccupied(x + moveX, y + moveY, board)
      )
    ) {
      acc.push(coordinateToID({ x: x + moveX, y: y + moveY }));
    }
    return acc;
  }, []);
};
