import { Coordinate, PlayerColor } from '../interfaces/context.interface';
import { coordinateToID } from '../utils';
import { CellData } from '../interfaces/context.interface';
import { BOARD_ROWS as ROWS, BOARD_COLS as COLS } from '../utils/constants';

const transposeCardMovement = (validMoves: number[][]): number[][] => {
  return validMoves.map(move => [-move[0], -move[1]]);
};

const isOccupied = (
  positionID: number,
  board: CellData[],
  color: PlayerColor
): boolean =>
  !board[positionID].piece && board[positionID].piece?.color === color;

export default (
  clickedCoordinates: Coordinate,
  validMovesFromCard: number[][],
  board: CellData[],
  color: PlayerColor = 'Blue'
): number[] => {
  const { x, y } = clickedCoordinates;
  if (color === 'Red')
    validMovesFromCard = transposeCardMovement(validMovesFromCard);
  return validMovesFromCard.reduce((acc, [moveX, moveY]) => {
    const positionID = coordinateToID({ x: x + moveX, y: y + moveY });
    if (
      !(
        x + moveX >= ROWS ||
        x + moveX < 0 ||
        y + moveY >= COLS ||
        y + moveY < 0 ||
        isOccupied(positionID, board, color)
      )
    ) {
      acc.push(positionID);
    }
    return acc;
  }, []);
};
