import { PlayerColor } from '../interfaces/context.interface';
import { coordinateToID, idToCoordinate } from '../utils';
import { CellData } from '../interfaces/context.interface';
import { BOARD_ROWS as ROWS, BOARD_COLS as COLS } from '../utils/constants';

const transposeCardMovement = (validMoves: number[][]): number[][] => {
  return validMoves.map(move => [-move[0], -move[1]]);
};

const isValidSpace = (
  positionID: number,
  board: CellData[],
  currentPlayer: PlayerColor
): boolean => {
  if (board[positionID].piece === undefined) {
    return true;
  } else if (board[positionID].piece?.color !== currentPlayer) {
    return true;
  }
  return false;
};

export default (
  clickedPieceID: number,
  validMovesFromCard: number[][],
  board: CellData[],
  color: PlayerColor = 'Blue'
): number[] => {
  const { x, y } = idToCoordinate(clickedPieceID);
  if (color === 'Red')
    validMovesFromCard = transposeCardMovement(validMovesFromCard);
  return validMovesFromCard.reduce((acc, [moveX, moveY]) => {
    const [xDisplacement, yDisplacement] = [x + moveX, y + moveY];
    const positionID = coordinateToID({ x: xDisplacement, y: yDisplacement });
    if (
      xDisplacement < ROWS &&
      xDisplacement >= 0 &&
      yDisplacement < COLS &&
      yDisplacement >= 0 &&
      isValidSpace(positionID, board, color)
    ) {
      acc.push(positionID);
    }
    return acc;
  }, []);
};
